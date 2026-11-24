import React from "react";

export default function Hero() {
  return (
    <section className="relative py-20 md:py-24 border-b border-slate-100 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('bg-kmb.webp')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/75" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
          Asuhan Keperawatan Medikal Bedah
        </h1>
        <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed drop-shadow">
          Panduan pengkajian sistemik B1–B6, penegakan diagnosa prioritas,
          serta manajemen perawatan pasien penyakit dalam dan pembedahan
          secara komprehensif.
        </p>
        <div className="pt-3 flex flex-wrap justify-center gap-4">
          <a
            href="#sistem"
            className="px-7 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-emerald-900/30 transition"
          >
            Eksplorasi Askep Sistem
          </a>
          <a
            href="#alur"
            className="px-7 py-3 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white text-sm font-semibold rounded-full transition"
          >
            Lihat Alur Dokumentasi
          </a>
        </div>
      </div>
    </section>
  );
}