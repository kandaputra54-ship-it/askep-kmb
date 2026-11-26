import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const alurDokumentasi = [
  {
    step: "01",
    title: "Pengkajian",
    desc: "Identitas, resume, riwayat keperawatan, pola kebiasaan, pengkajian fisik 12 sistem tubuh, dan data penunjang.",
    href: "/pengkajian",
  },
  {
    step: "02",
    title: "Data Fokus",
    desc: "Pemisahan data subyektif dan data obyektif yang relevan dengan masalah pasien.",
    href: "/data-fokus",
  },
  {
    step: "03",
    title: "Analisa Data",
    desc: "Menghubungkan data fokus (DS & DO) dengan masalah keperawatan dan etiologi penyebab.",
    href: "/analisa-data",
  },
  {
    step: "04",
    title: "Diagnosa Keperawatan",
    desc: "Penentuan diagnosa keperawatan (Problem & Etiologi) sesuai prioritas.",
    href: "/diagnosa",
  },
  {
    step: "05",
    title: "Perencanaan",
    desc: "Tujuan, kriteria hasil (SLKI), dan rencana tindakan keperawatan independen maupun interdependen (SIKI).",
    href: "/perencanaan",
  },
  {
    step: "06",
    title: "Pelaksanaan Keperawatan",
    desc: "Catatan tindakan keperawatan yang telah dilakukan beserta respon/hasil klien secara kronologis.",
    href: "/pelaksanaan",
  },
  {
    step: "07",
    title: "Evaluasi Hasil (SOAP)",
    desc: "Evaluasi perkembangan kondisi klien mengacu pada tujuan menggunakan format SOAP.",
    href: "/evaluasi",
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
          Pilih tahapan dokumentasi sesuai format pengkajian resmi: dari
          pengkajian komprehensif hingga evaluasi SOAP.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {alurDokumentasi.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col justify-between border border-slate-200 rounded-2xl p-6 bg-white hover:border-emerald-400 hover:shadow-md transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  Langkah {item.step}
                </span>
                <span className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-emerald-50 text-slate-400 group-hover:text-emerald-600 flex items-center justify-center transition">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 mt-3 transition">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mt-2">
                {item.desc}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <span>Isi Formulir {item.title}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/pengkajian"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition shadow-sm"
        >
          <span>Mulai Pengkajian KMB</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}