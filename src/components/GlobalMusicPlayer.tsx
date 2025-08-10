"use client";
import React, { useEffect, useRef, useState } from "react";

export default function GlobalMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [songName, setSongName] = useState<string>("");
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  // 处理文件选择：revokes 上一个 object URL，创建新的
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 释放旧的 object URL
    if (objectUrlRef.current) {
      try {
        URL.revokeObjectURL(objectUrlRef.current);
      } catch {
        // ignore
      }
      objectUrlRef.current = null;
    }
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setAudioUrl(url);
    setSongName(file.name);
    setPlaying(false);
    setCurrentTime(0);
  };

  // 在组件卸载时释放 object URL
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        try {
          URL.revokeObjectURL(objectUrlRef.current);
        } catch {
          // ignore
        }
        objectUrlRef.current = null;
      }
    };
  }, []);

  // 同步 duration / time
  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(Number.isFinite(audioRef.current.duration) ? audioRef.current.duration : 0);
    }
  };
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };
  const onEnded = () => {
    setPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  // 使用音频事件确保状态与真实播放状态一致
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // 播放/暂停：处理 play() Promise，避免自动播放受限导致状态不一致
  const togglePlay = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      // onPause 事件会更新 playing
    } else {
      try {
        const p = audio.play();
        if (p instanceof Promise) {
          await p;
        }
        // onPlay 事件会更新 playing
      } catch (err) {
        console.warn("Playback failed or was blocked by browser autoplay policy.", err);
      }
    }
  };

  // 进度与音量控制
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  };
  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setVolume(v);
    if (audioRef.current) {
      audioRef.current.volume = v;
    }
  };

  // 打开/关闭面板时阻止页面滚动（避免移动端误触）
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* 右下角悬浮迷你条（使用明确按钮打开） */}
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2"
        style={{ minWidth: 56, minHeight: 56, justifyContent: "center" }}
      >
        <button
          aria-label={open ? "关闭音乐播放器" : "打开音乐播放器"}
          title={open ? "关闭音乐播放器" : "打开音乐播放器"}
          className="flex items-center justify-center w-14 h-14 rounded-full btn-primary shadow-lg"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="text-xl" aria-hidden>
            🎵
          </span>
        </button>
      </div>

      {/* 展开完整播放器（浮动卡片） */}
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 w-full max-w-md"
          role="dialog"
          aria-label="音乐播放器"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="floating-card">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-white">🎵 音乐播放器</h2>
              <button
                aria-label="关闭"
                className="px-2 py-1 rounded-md text-sm"
                onClick={() => setOpen(false)}
              >
                关闭
              </button>
            </div>

            <label className="block mb-2">
              <span className="sr-only">选择音频文件</span>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary-color file:text-white file:font-semibold file:cursor-pointer"
                aria-label="选择音频文件"
              />
            </label>

            {songName && <div className="mb-2 text-sm text-white/90 truncate">{songName}</div>}

            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={togglePlay}
                className="px-3 py-2 rounded-full btn-primary text-white shadow"
                aria-pressed={playing}
              >
                {playing ? "⏸" : "▶️"}
              </button>

              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.01}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 accent-primary-color h-2 rounded"
                aria-label="播放进度"
              />

              <span className="text-xs text-white/70 w-16 text-right">
                {Math.floor(currentTime)}/{Math.floor(duration)}s
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-white/70">音量</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={handleVolume}
                className="accent-primary-color h-2 rounded"
                aria-label="音量"
              />
            </div>

            {audioUrl && (
              <audio
                ref={audioRef}
                src={audioUrl}
                preload="metadata"
                style={{ display: "none" }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}