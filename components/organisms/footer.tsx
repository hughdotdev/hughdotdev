"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useMemo } from "react";

export const Footer = memo(function Footer() {
  const pathname = usePathname();
  const isNotHomePage = pathname !== "/";

  const parentPath = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "/";
    segments.pop();
    return segments.length === 0 ? "/" : `/${segments.join("/")}`;
  }, [pathname]);

  return (
    <footer className="max-w-2xl mx-auto px-4 py-6">
      {isNotHomePage && (
        <p className="mb-4 text-sm font-mono footer-text">
          <Link href="/" className="footer-link">
            $ cd ~
          </Link>{" "}
          |{" "}
          <Link href={parentPath} className="footer-link">
            $ cd ..
          </Link>
        </p>
      )}
      <p className="text-sm footer-text">
        <a
          href="https://github.com/hughdotdev/hugh.dev/blob/main/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          MIT License
        </a>{" "}
        | 2025-PRESENT © Hugh Fabre
      </p>
    </footer>
  );
});
