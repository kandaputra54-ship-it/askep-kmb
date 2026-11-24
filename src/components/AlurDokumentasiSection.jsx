import React from "react";
import { ArrowRight } from "lucide-react";

const alurDokumentasi = [
  {
    step: "01",
    title: "Pengkajian",
    desc: "Identitas, resume, riwayat keperawatan, pola kebiasaan, pengkajian fisik B1–B6, data penunjang.",
  },
  {
    step: "02",
    title: "Data Fokus",
    desc: "Pemisahan data subjektif dan objektif yang relevan dengan masalah pasien.",
  },
  {
    step: "03",
    title: "Analisa Data",
    desc: "Menghubungkan data dengan masalah dan etiologi penyebab.",
  },
  {
    step: "04",
    title: "Diagnosa Keperawatan",
    desc: "Penentuan diagnosa sesuai prioritas berdasarkan SDKI.",
  },
  {
    step: "05",
    title: "Perencanaan",
    desc: "Tujuan, kriteria hasil (SLKI), dan rencana tindakan (SIKI).",
  },
  {
    step: "06",
    title: "Implementasi & Evaluasi",
    desc: "Catatan keperawatan dan evaluasi hasil dengan format SOAP.",
  },
];

export default function AlurDokumentasiSection() {
  return (
    <section
      id="alur"
      className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100"
    >
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-emerald-600 font-semibold text-xs uppercase tracking-widest">
          Standar Dokumentasi
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
          Alur Dokumentasi Askep KMB
        </h2>
        <p className="text-slate-600 mt-3 text-sm md:text-base">
          Mengikuti format pengkajian resmi: dari pengkajian hingga evaluasi
          SOAP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alurDokumentasi.map((item, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-emerald-300 transition"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Langkah {item.step}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-2">
              {item.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <a
          href="#faq"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition"
        >
          <span>Unduh Format Pengkajian</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}