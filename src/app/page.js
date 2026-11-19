import React from "react";
import {
  Activity,
  HeartPulse,
  Wind,
  Brain,
  Droplets,
  Bone,
  Scissors,
  Phone,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Stethoscope,
  ClipboardList,
  ShieldAlert,
} from "lucide-react";

export default function Home() {
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

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <div className="bg-emerald-700 text-emerald-50 text-xs py-2 px-6 text-center font-medium tracking-wide">
        Format Baku Pengkajian & Dokumentasi Asuhan Keperawatan Medikal Bedah
        (B1–B6)
      </div>

      <header className="bg-white sticky top-0 z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo & Teks */}
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src="/android-chrome-192x192.png"
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

      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/bg.webp')",
          }}
        />

        {/* Overlay gelap (kiri pekat, kanan transparan agar gambar terlihat) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-900/40" />

        {/* Konten */}
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

          {/* Card B1-B6 dan EWS (diberi efek backdrop-blur agar menyatu dengan bg) */}
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

      <section id="perioperatif" className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 space-y-3">
              <span className="text-xs font-bold uppercase text-emerald-700">
                Fase 01
              </span>
              <h4 className="font-bold text-slate-900">Pra-Operatif</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Edukasi prosedur, manajemen ansietas, verifikasi area operasi,
                dan kesiapan fisik pasien.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-6 space-y-3 mt-6">
              <span className="text-xs font-bold uppercase text-emerald-700">
                Fase 02
              </span>
              <h4 className="font-bold text-slate-900">Intra-Operatif</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Surgical Safety Checklist, pemantauan hemodinamik, dan
                pencegahan hipotermia/cedera posisi.
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
                Edukasi perawatan luka di rumah, kepatuhan terapi obat, dan
                jadwal kontrol poliklinik.
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
              {[
                "Dokumentasi terstruktur berbasis SDKI, SLKI, dan SIKI",
                "Manajemen cairan, elektrolit, dan nutrisi klinis akurat",
                "Pencegahan komplikasi tirah baring dan infeksi luka operasi",
              ].map((point, i) => (
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

      <section id="kontak" className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg">
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold">
              Konsultasi Kasus & Rujukan Rawat Inap KMB
            </h2>
            <p className="text-emerald-50 text-sm max-w-lg">
              Hubungi nurse station ruang rawat medikal bedah untuk koordinasi
              tim multidisiplin dan serah terima pasien (SBAR).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <Phone className="w-5 h-5" />
              <div>
                <p className="text-xs text-emerald-100">Nurse Station KMB</p>
                <p className="text-lg font-bold tracking-wide">
                  (021) 500-882 • Ext. Bedah & Penyakit Dalam
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm space-y-2 w-full md:w-auto">
            <p className="font-semibold text-emerald-100 uppercase text-xs tracking-wider">
              Standar Operasional
            </p>
            <p className="font-medium">• Timbang Terima Metode SBAR</p>
            <p className="font-medium">
              • Pemantauan TTV & Balance Cairan 24 Jam
            </p>
            <p className="font-medium">• Evaluasi Perkembangan SOAP Harian</p>
          </div>
        </div>
      </section>

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

      <footer className="bg-emerald-50/70 border-t border-emerald-100 text-slate-600 text-xs mt-10">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <a
              href="#"
              className="flex items-center space-x-2 text-lg font-bold text-slate-900 w-fit"
            >
              <img
                src="/android-chrome-192x192.png"
                alt="Logo AskepKMB"
                className="w-6 h-6 object-contain"
              />
              <span>
                Askep<span className="text-emerald-600">KMB</span>
              </span>
            </a>
            <p className="text-slate-500 leading-relaxed">
              Sistem informasi dokumentasi dan panduan klinis Asuhan Keperawatan
              Medikal Bedah terstandar.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3">Sistem Tubuh</h4>
            <ul className="space-y-2 text-slate-500">
              <li>Kardiovaskular & Respirasi</li>
              <li>Persarafan & Endokrin</li>
              <li>Muskuloskeletal & Pencernaan</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3">Standar Klinis</h4>
            <ul className="space-y-2 text-slate-500">
              <li>Pengkajian B1–B6</li>
              <li>Diagnosa SDKI</li>
              <li>Luaran SLKI & Intervensi SIKI</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-3">Unit Pelayanan</h4>
            <p className="text-slate-500 leading-relaxed">
              Instalasi Rawat Inap Penyakit Dalam, Ruang Bedah Sentral, dan
              Poliklinik Spesialis.
            </p>
          </div>
        </div>

        <div className="bg-emerald-700 text-emerald-50 py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© 2026 . Hak Cipta Dilindungi.</span>
            <span>Keperawatan Medikal Bedah Terpadu</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
