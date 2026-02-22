import { getCachedGlobal } from "@/utilities/getGlobals"
import Link from "next/link"
import React from "react"

import type { Footer } from "@/payload-types"

import { CMSLink } from "@/components/Link"

export async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto bg-linear-to-br bg-background/95  to-background border-t border-border">
      {/* ── Main row ── */}
      <div className="container py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Logo */}
        <Link className="flex items-center shrink-0" href="/">
          <svg
            width="200"
            height="36"
            viewBox="0 0 200 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="AdCraftors"
          >
            {/* Left wedge — orange */}
            <path d="M2 31 L11.5 5 L16 12.5 L8 31 Z" fill="#ea580c" />
            {/* Right wedge — dark */}
            <path d="M30 31 L20.5 5 L16 12.5 L24 31 Z" fill="#18181b" />
            {/* Bolt crossbar — white knockout */}
            <path
              d="M19.5 16.5 L13.5 16.5 L12.5 20.5 L16.5 20.5 L14.5 26.5 L22 19.5 L18 19.5 Z"
              fill="white"
            />
            {/* Ad — bold orange */}
            <text
              x="42"
              y="26"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              fontWeight="800"
              fontSize="21"
              letterSpacing="-1"
              fill="#ea580c"
            >
              Ad
            </text>
            {/* Craftors — light weight dark */}
            <text
              x="70"
              y="26"
              fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
              fontWeight="300"
              fontSize="21"
              letterSpacing="-0.5"
              fill="#18181b"
            >
              Craftors
            </text>
          </svg>
        </Link>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          {navItems.map(({ link }, i) => (
            <CMSLink
              key={i}
              {...link}
              className="text-sm font-medium text-neutral-500 hover:text-primary transition-colors duration-200"
            />
          ))}
        </nav>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: "1px solid rgba(234,88,12,0.08)" }}>
        <div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-neutral-400">
            © {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">AdCraftors</span>. All rights reserved.
          </p>
          <p className="text-xs tracking-widest uppercase text-neutral-300 font-medium">
            Digital Growth Agency
          </p>
        </div>
      </div>
    </footer>
  )
}
