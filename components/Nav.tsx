"use client";

import { useEffect, useState } from "react";
import BookCall from "@/components/BookCall";
import { siteConfig } from "@/lib/siteConfig";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[120] transition-colors duration-300 ${
        scrolled
          ? "border-b border-border bg-void/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#top"
          data-cursor="hover"
          className="font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
        >
          {siteConfig.name}
        </a>
        <BookCall label="Start a project" variant="ghost" />
      </nav>
    </header>
  );
}
