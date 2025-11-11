"use client";

import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import Navigation from "./Navigation";

const Header = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [logoColor, setLogoColor] = useState<string>("#1f6e3a");
  // Working on the Hyration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/presco_logo.png";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const w = 64, h = 64;
        canvas.width = w; canvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 20) {
          const rr = data[i], gg = data[i + 1], bb = data[i + 2], aa = data[i + 3];
          if (aa < 10) continue;
          if (rr > 240 && gg > 240 && bb > 240) continue;
          r += rr; g += gg; b += bb; count++;
        }
        if (count > 0) {
          r = Math.round(r / count);
          g = Math.round(g / count);
          b = Math.round(b / count);
          const toHex = (n: number) => n.toString(16).padStart(2, "0");
          setLogoColor(`#${toHex(r)}${toHex(g)}${toHex(b)}`);
        }
      } catch {}
    };
  }, []);

  const gradient = useMemo(() => {
    const hexToRgb = (hex: string) => {
      const v = hex.replace('#','');
      const r = parseInt(v.slice(0,2),16);
      const g = parseInt(v.slice(2,4),16);
      const b = parseInt(v.slice(4,6),16);
      return { r, g, b };
    };
    const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
    const darken = (hex: string, amt: number) => {
      const { r, g, b } = hexToRgb(hex);
      const f = 1 - amt; // amt 0..1
      const rd = clamp(r * f), gd = clamp(g * f), bd = clamp(b * f);
      const toHex = (n: number) => n.toString(16).padStart(2, '0');
      return `#${toHex(rd)}${toHex(gd)}${toHex(bd)}`;
    };
    const c1 = darken(logoColor, 0.35);
    const c2 = darken(logoColor, 0.1);
    return `linear-gradient(to bottom, ${c1}, ${c2})`;
  }, [logoColor]);

  // Keep hooks order consistent; show minimal shell before mount
  if (!isMounted) {
    return <div className="px-4 py-8 lg:px-14 pb-32" style={{ background: gradient }} />;
  }

  return (
    <div className="px-4 py-8 lg:px-14 pb-32" style={{ background: gradient }}>
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <Link href="/">
              <div className="items-center hidden lg:flex"></div>
            </Link>
            <Navigation />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
