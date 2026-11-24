import React from "react";
import { CheckCircle2 } from "lucide-react";

const poinKeunggulan = [
  "Dokumentasi terstruktur berbasis SDKI, SLKI, dan SIKI",
  "Manajemen cairan, elektrolit, dan nutrisi klinis akurat",
  "Pencegahan komplikasi tirah baring dan infeksi luka operasi",
];

export default function PerioperatifSection() {
  return (
    <section id="perioperatif" className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-bold uppercase text-emerald-700">
              Fase 01
            </span>
            <h4 className="font-bold text-slate-900">Pra-Operatif</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Edukasi prosedur, manajemen ansietas, verifikasi area operasi, dan
              kesiapan fisik pasien.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 space-y-3 mt-6">
            <span className="text-xs font-bold uppercase text-emerald-700">
              Fase 02
            </span>
            <h4 className="font-bold text-slate-900">Intra-Operatif</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Surgical Safety Checklist, pemantauan hemodinamik, dan pencegahan
              hipotermia/cedera posisi.
            </p>
          </div>
          <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 space-y-3">
            <span className="text-xs font-bold uppercase text-emerald-700">
              Fase 03
            </span>
            <h4 className="font-bold text-slate-900">Pasca-Operatif</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Penilaian Aldrete Score, manajemen nyeri akut, perawatan luka
              steril, dan mobilisasi bertahap.
            </p>
          </div>
          <div className="bg-emerald-600 text-white rounded-2xl p-6 space-y-3 mt-6">
            <span className="text-xs font-bold uppercase text-emerald-200">
              Fase 04
            </span>
            <h4 className="font-bold">Discharge Planning</h4>
            <p className="text-xs text-emerald-50 leading-relaxed">
              Edukasi perawatan luka di rumah, kepatuhan terapi obat, dan jadwal
              kontrol poliklinik.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <span className="text-emerald-600 font-semibold text-xs uppercase tracking-widest">
            Pendekatan Komprehensif
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Perawatan Terukur di Setiap Tahap Pemulihan Pasien
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Keperawatan Medikal Bedah mengintegrasikan pemantauan fungsi
            fisiologis dengan dukungan psikologis agar pasien mencapai
            kemandirian optimal pasca perawatan akut maupun pembedahan.
          </p>
          <ul className="space-y-3 pt-2">
            {poinKeunggulan.map((point, i) => (
              <li
                key={i}
                className="flex items-center gap-3 text-sm font-medium text-slate-700"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}