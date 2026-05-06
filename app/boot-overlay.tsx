"use client";

import { useEffect, useState } from "react";

export default function BootOverlay() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsFadingOut(true);
    }, 1550);

    const hideTimer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2050);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#020606] transition-opacity duration-500 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 boot-grid opacity-40" />
      <div className="pointer-events-none absolute inset-0 scanline-overlay opacity-30" />
      <div className="w-full max-w-2xl border border-emerald-300/35 bg-[#040808] px-5 py-4 text-xs text-emerald-200 shadow-[0_0_30px_rgba(111,255,184,0.15)]">
        <p className="boot-line">[BOOT] event_console initializing...</p>
        <p className="boot-line-delay">[SYS] mounting visual protocol...</p>
        <p className="boot-line-delay-2">[NET] secure channel: ONLINE</p>
        <p className="boot-line-delay-3">[OK] press enter to continue</p>
      </div>
    </div>
  );
}
