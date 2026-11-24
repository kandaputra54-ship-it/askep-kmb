import React from "react";
import {
  HeartPulse,
  Wind,
  Brain,
  Droplets,
  Bone,
  Scissors,
  ArrowRight,
} from "lucide-react";

const sistemTubuh = [
  {
    title: "Sistem Kardiovaskular",
    subtitle: "Gangguan perfusi & curah jantung",
    desc: "Pengkajian nyeri dada, pemantauan EKG, keseimbangan cairan pada gagal jantung, hipertensi, dan sindrom koroner akut.",
    icon: HeartPulse,
  },
  {
    title: "Sistem Respirasi",
    subtitle: "Oksigenasi & bersihan jalan napas",
    desc: "Manajemen pola napas tidak efektif, pemantauan saturasi O2, fisioterapi dada pada PPOK, pneumonia, dan efusi pleura.",
    icon: Wind,
  },
  {
    title: "Sistem Persarafan",
    subtitle: "Perfusi serebral & mobilitas",
    desc: "Penilaian GCS berkala, pencegahan peningkatan TIK, dan rehabilitasi dini pada pasien stroke iskemik/hemoragik.",
    icon: Brain,
  },
  {
    title: "Sistem Endokrin & Metabolik",
    subtitle: "Regulasi glukosa & nutrisi",
    desc: "Pemantauan kadar glukosa darah, pencegahan komplikasi ketoasidosis diabetikum, dan perawatan luka ulkus diabetikum.",
    icon: Droplets,
  },
  {
    title: "Sistem Muskuloskeletal",
    subtitle: "Nyeri akut & integritas jaringan",
    desc: "Perawatan pasien fraktur, traksi, latihan rentang gerak (ROM), serta manajemen nyeri pasca bedah ortopedi.",
    icon: Bone,
  },
  {
    title: "Keperawatan Perioperatif",
    subtitle: "Pra, intra, dan pasca operasi",
    desc: "Persiapan informed consent & puasa pra-bedah, pencegahan infeksi daerah operasi (IDO), serta pemantauan tanda vital.",
    icon: Scissors,
  },
];

export default function SistemTubuhSection() {
  return (
    <section id="sistem" className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-emerald-600 font-semibold text-xs uppercase tracking-widest">
          Fokus Klinis Utama
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
          Asuhan Keperawatan Berdasarkan Sistem Tubuh
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sistemTubuh.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition p-7 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start gap-4 mb-5">
                  <Icon className="w-6 h-6 text-emerald-600 shrink-0 mt-1 group-hover:text-emerald-700 transition" />
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div>
                <a
                  href="#alur"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition"
                >
                  <span>Lihat Alur Askep</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}