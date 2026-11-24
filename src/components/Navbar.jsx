import React from "react";

export default function Navbar() {
  return (
    <>
      <div className="bg-emerald-700 text-emerald-50 text-xs py-2 px-6 text-center font-medium tracking-wide">
        Format Baku Pengkajian & Dokumentasi Asuhan Keperawatan Medikal Bedah
        (B1–B6)
      </div>

      <header className="bg-white sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src="/logo.webp"
              alt="Logo AskepKMB"
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
              Askep<span className="text-emerald-600">KMB</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#" className="text-emerald-600 font-semibold">
              Beranda
            </a>
            <a href="#sistem" className="hover:text-emerald-600 transition">
              Sistem Tubuh
            </a>
            <a href="#alur" className="hover:text-emerald-600 transition">
              Alur Dokumentasi
            </a>
            <a
              href="#perioperatif"
              className="hover:text-emerald-600 transition"
            >
              Perioperatif
            </a>
            <a href="#faq" className="hover:text-emerald-600 transition">
              Panduan Klinis
            </a>
          </nav>

          <a
            href="#sistem"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-sm transition"
          >
            Mulai Askep
          </a>
        </div>
      </header>
    </>
  );
}