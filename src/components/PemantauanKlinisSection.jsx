import React from "react";
import { Stethoscope, ShieldAlert } from "lucide-react";

export default function PemantauanKlinisSection() {
  return (
    <section className="relative py-20 text-white overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/bg.webp')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Pemantauan Klinis Akurat untuk Keselamatan Pasien Dewasa
          </h2>
          <p className="text-slate-200 text-sm md:text-base max-w-xl leading-relaxed">
            Deteksi dini perburukan kondisi klinis melalui Early Warning Score
            (EWS), keseimbangan cairan elektrolit, serta pencegahan infeksi
            nosokomial di ruang rawat inap dan bedah.
          </p>
          <div className="pt-2">
            <a
              href="#faq"
              className="inline-block px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-wider transition"
            >
              Pelajari Protokol KMB
            </a>
          </div>
        </div>

        <div className="md:col-span-5 grid grid-cols-2 gap-4">
          <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Stethoscope className="w-7 h-7 text-emerald-400 mb-3" />
            <div className="text-2xl font-bold">B1 – B6</div>
            <p className="text-xs text-slate-300 mt-1">
              Pengkajian Fisik Sistemik Terstandar
            </p>
          </div>
          <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <ShieldAlert className="w-7 h-7 text-emerald-400 mb-3" />
            <div className="text-2xl font-bold">EWS</div>
            <p className="text-xs text-slate-300 mt-1">
              Deteksi Dini Kegawatan Ruang Rawat
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}