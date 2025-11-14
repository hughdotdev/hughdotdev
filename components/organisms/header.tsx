"use client";

import {
  Check,
  Github,
  Hammer,
  Link as LinkIcon,
  Moon,
  Newspaper,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const [showCheck, setShowCheck] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  const isPostsPage = pathname.startsWith("/posts");
  const isCraftsPage = pathname.startsWith("/crafts");

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowCheck(true);
      setTimeout(() => {
        setShowCheck(false);
      }, 1000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="mb-8 max-w-2xl mx-auto px-4">
      <header className="flex items-center justify-between py-6 mt-4">
        <Link href="/" aria-label="Home" className="flex items-center gap-3">
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <rect
              x="1"
              y="1"
              width="22"
              height="22"
              fill="transparent"
              stroke="oklch(0.3512 0.1287 27.41)"
              strokeWidth="2"
            />
          </svg>
          <span className="text-base font-medium">Hugh Fabre</span>
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            href="/posts"
            aria-label="Posts"
            className={`transition-opacity ${
              isPostsPage ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Newspaper size={19.2} strokeWidth={1.5} />
          </Link>

          <Link
            href="/crafts"
            aria-label="Crafts"
            className={`transition-opacity ${
              isCraftsPage ? "opacity-100" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Hammer size={19.2} strokeWidth={1.5} />
          </Link>

          <a
            href="https://github.com/hughfabre"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="opacity-60 hover:opacity-100 transition-opacity"
          >
            <Github size={19.2} strokeWidth={1.5} />
          </a>

          <div className="h-5 w-px bg-foreground opacity-20" />

          <button
            onClick={copyLink}
            aria-label="Copy link"
            className="opacity-60 hover:opacity-100 transition-opacity relative w-[19.2px] h-[19.2px]"
          >
            <LinkIcon
              size={19.2}
              strokeWidth={1.5}
              className={`absolute inset-0 transition-opacity duration-300 ${
                showCheck ? "opacity-0" : "opacity-100"
              }`}
            />
            <Check
              size={19.2}
              strokeWidth={1.5}
              className={`absolute inset-0 transition-opacity duration-300 ${
                showCheck ? "opacity-100" : "opacity-0"
              }`}
            />
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="opacity-60 hover:opacity-100 transition-opacity relative w-[19.2px] h-[19.2px]"
            suppressHydrationWarning
          >
            <Sun
              size={19.2}
              strokeWidth={1.5}
              className={`absolute inset-0 ${
                resolvedTheme === "light" ? "opacity-100" : "opacity-0"
              }`}
              suppressHydrationWarning
            />
            <Moon
              size={19.2}
              strokeWidth={1.5}
              className={`absolute inset-0 ${
                resolvedTheme === "light" ? "opacity-0" : "opacity-100"
              }`}
              suppressHydrationWarning
            />
          </button>
        </nav>
      </header>
    </div>
  );
}
