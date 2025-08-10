import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "text-dark": "var(--text-dark)",
        "text-light": "var(--text-light)",
        "background-light": "var(--background-light)",
        "background-semi": "var(--background-semi)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme("colors.text-dark"),
            a: {
              color: theme("colors.primary-color"),
              '&:hover': {
                color: theme("colors.secondary-color"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // 启用 typography 插件
  ],
} satisfies Config;
