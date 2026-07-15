"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang", href: "/tentang" },
  { label: "Bidang Praktik", href: "/bidang-praktik" },
  { label: "Tim", href: "/tim" },
  { label: "Artikel", href: "/artikel" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-950/95 backdrop-blur-sm border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-ivory font-semibold text-lg leading-tight tracking-tight"
        >
          ATA Law Firm
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ label, href }) => {
            const active =
              href === "/" ? pathname === "/" : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-1.5 rounded text-sm font-body transition-colors ${
                    active
                      ? "text-terracotta"
                      : "text-blue-pale hover:text-ivory"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <a
          href="https://wa.me/6281223840395"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-terracotta text-white text-sm font-body font-medium px-4 py-2 rounded hover:bg-terracotta/90 transition-colors"
        >
          Konsultasi
        </a>

        <button
          className="md:hidden text-ivory p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-navy-950 border-t border-white/5 px-4 pb-4">
          <ul className="flex flex-col gap-1 pt-2">
            {navLinks.map(({ label, href }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded text-sm font-body transition-colors ${
                      active
                        ? "text-terracotta"
                        : "text-blue-pale hover:text-ivory"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href="https://wa.me/6281223840395"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center bg-terracotta text-white text-sm font-body font-medium px-4 py-2 rounded hover:bg-terracotta/90 transition-colors"
          >
            Konsultasi via WhatsApp
          </a>
        </div>
      )}
    </header>
  );
}
