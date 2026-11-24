import React from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Apa fokus utama pengkajian dalam Keperawatan Medikal Bedah (KMB)?",
    a: "Fokus utama meliputi pengkajian 11 pola fungsional Gordon, pemeriksaan fisik per sistem tubuh (B1–B6), hasil pemeriksaan penunjang laboratorium/radiologi, serta status perioperatif pasien dewasa.",
  },
  {
    q: "Bagaimana penentuan prioritas diagnosa KMB menggunakan SDKI?",
    a: "Prioritas disusun berdasarkan ancaman terhadap kehidupan (Airway, Breathing, Circulation), keluhan utama aktual pasien (seperti Nyeri Akut atau Hipertermia), diikuti diagnosa risiko.",
  },
  {
    q: "Apa saja indikator evaluasi pasca tindakan bedah?",
    a: "Evaluasi mencakup stabilitas hemodinamik, skala nyeri (NRS/VAS), kondisi balutan luka operasi, produksi drain, kembalinya bising usus, serta kemampuan mobilisasi dini.",
  },
  {
    q: "Bagaimana integrasi SLKI dan SIKI dalam dokumentasi SOAP?",
    a: "Kriteria hasil dari SLKI dijadikan target terukur pada bagian Objective/Planning, sedangkan tindakan observasi, terapeutik, edukasi, dan kolaborasi dari SIKI dicatat pada implementasi.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-emerald-600 font-semibold text-xs uppercase tracking-widest">
          Referensi Praktik Klinik
        </span>
        <h2 className="text-3xl font-bold text-slate-900 mt-2">
          Pertanyaan Umum Asuhan Keperawatan KMB
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            open={idx === 0}
            className="group bg-slate-50 rounded-xl border border-slate-200/70 overflow-hidden"
          >
            <summary className="list-none cursor-pointer p-5 font-semibold text-sm flex items-center justify-between gap-4 bg-white group-open:bg-emerald-600 group-open:text-white transition">
              <span>{faq.q}</span>
              <ChevronDown className="w-4 h-4 shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="p-5 text-sm text-slate-600 leading-relaxed bg-slate-50">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}