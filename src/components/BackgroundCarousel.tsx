"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const IMAGE_API = "https://t.alcy.cc/ycy";
const INTERVAL = 60000;
const FADE_DURATION = 3000;
const CACHE_LIMIT = 5;
const FALLBACK_IMAGE = "/default.jpg";

export default function BackgroundCarousel() {

  const [bg1Url, setBg1Url] = useState<string>("");
  const [bg2Url, setBg2Url] = useState<string>("");
  const [activeLayer, setActiveLayer] = useState<"bg1" | "bg2">("bg1");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const timerRef = useRef<number | null>(null);
  const switchCountRef = useRef<number>(0);
  const activeLayerRef = useRef<"bg1" | "bg2">("bg1");
  const isTransitioningRef = useRef<boolean>(false);
  const cacheRef = useRef<string[]>([]);
  const visibleRef = useRef<boolean>(true);

  const preloadImage = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new window.Image();
      img.onload = () => resolve(url);
      img.onerror = () => resolve(FALLBACK_IMAGE);
      img.src = url;
    });
  };

  const generateImageUrl = (): string => {
    switchCountRef.current += 1;
    return `${IMAGE_API}?_=${switchCountRef.current}`;
  };

  const cacheImageUrl = (url: string) => {
    if (!cacheRef.current.includes(url)) {
      cacheRef.current.push(url);
      if (cacheRef.current.length > CACHE_LIMIT) {
        cacheRef.current.shift();
      }
    }
  };

  const switchToNextImage = async () => {
    if (isTransitioningRef.current || isLoading) return;
    isTransitioningRef.current = true;
    setIsLoading(true);
    try {
      const nextUrl = generateImageUrl();
      const loadedUrl = await preloadImage(nextUrl);
      cacheImageUrl(loadedUrl);
      const currentActiveLayer = activeLayerRef.current;
      const inactiveLayer = currentActiveLayer === "bg1" ? "bg2" : "bg1";
      if (inactiveLayer === "bg1") {
        setBg1Url(loadedUrl);
      } else {
        setBg2Url(loadedUrl);
      }
      setActiveLayer(inactiveLayer);
      activeLayerRef.current = inactiveLayer;
      window.setTimeout(() => {
        isTransitioningRef.current = false;
        setIsLoading(false);
      }, FADE_DURATION);
    } catch {
      isTransitioningRef.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleVisibility = () => {
      visibleRef.current = document.visibilityState === "visible";
      if (visibleRef.current && timerRef.current === null) {
        timerRef.current = window.setInterval(switchToNextImage, INTERVAL) as unknown as number;
      } else if (!visibleRef.current && timerRef.current !== null) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    handleVisibility();
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    setIsClient(true);
    const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const initialUrl = generateImageUrl();
    preloadImage(initialUrl).then((loadedUrl) => {
      setBg1Url(loadedUrl);
      cacheImageUrl(loadedUrl);
    });

    if (!prefersReduced) {
      timerRef.current = window.setInterval(switchToNextImage, INTERVAL) as unknown as number;
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isClient) return null;

  const isMobile = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(max-width: 768px)").matches;
  const bgAttachment = isMobile ? "scroll" : "fixed";

  return (
    <>
      {isLoading && (
        <div
          className="fixed inset-0 -z-30"
          style={{
            pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 100%)",
            transition: "opacity 600ms cubic-bezier(.4,0,.2,1)",
            opacity: 0.18,
          }}
        />
      )}

      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          pointerEvents: "none",
          background: bg1Url ? `url('${bg1Url}') center center / cover no-repeat ${bgAttachment}` : undefined,
          opacity: activeLayer === "bg1" ? 0.72 : 0,
          filter: "blur(0px) brightness(0.78)",
          transition: `opacity ${FADE_DURATION}ms cubic-bezier(.4,0,.2,1)`,
        }}
      />

      <div
        aria-hidden
        className="fixed inset-0 -z-20"
        style={{
          pointerEvents: "none",
          background: bg2Url ? `url('${bg2Url}') center center / cover no-repeat ${bgAttachment}` : undefined,
          opacity: activeLayer === "bg2" ? 0.72 : 0,
          filter: "blur(0px) brightness(0.78)",
          transition: `opacity ${FADE_DURATION}ms cubic-bezier(.4,0,.2,1)`,
        }}
      />
    </>
  );
}