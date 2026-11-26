"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Save,
  Eye,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  History,
  Clock,
  Activity,
  HeartPulse,
  FilePlus2,
  Check,
} from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_kmb_pengkajian";

const STEPS = [
  { id: 1, title: "Identitas & Resume", icon: UserCheck },
  { id: 2, title: "Riwayat & Psikososial", icon: History },
  { id: 3, title: "Pola Kebiasaan", icon: Clock },
  { id: 4, title: "Fisik (Umum–Hemato)", icon: Activity },
  { id: 5, title: "Fisik (Syaraf–Muskulo)", icon: HeartPulse },
  { id: 6, title: "Penunjang & Terapi", icon: FilePlus2 },
];

const INITIAL_DATA = {
  // Administrasi & 1. Identitas Klien (Hal 1)
  tglPengkajian: "",
  tglMasuk: "",
  ruangKelas: "",
  noRegister: "",
  diagnosaMedis: "",
  namaKlien: "",
  jenisKelamin: "Laki-laki",
  usia: "",
  statusPerkawinan: "",
  agama: "",
  sukuBangsa: "",
  pendidikan: "",
  bahasa: "",
  pekerjaan: "",
  alamat: "",
  sumberBiaya: "Pribadi",
  sumberInformasi: "Klien dan Keluarga",

  // 2. Resume (Hal 2)
  resume: "",

  // 3. Riwayat Keperawatan (Hal 3-4)
  keluhanUtama: "",
  faktorPencetus: "",
  timbulnyaKeluhan: "Bertahap",
  lamanyaKeluhan: "",
  upayaMengatasi: "",
  riwayatAlergi: "",
  riwayatKecelakaan: "",
  riwayatDirawat: "",
  riwayatPemakaianObat: "",
  genogramKeterangan: "",
  penyakitKeluargaFaktorRisiko: "",
  orangTerdekat: "",
  polaKomunikasi: "",
  pembuatanKeputusan: "",
  kegiatanKemasyarakatan: "",
  dampakPenyakitKeluarga: "",
  masalahMempengaruhiKlien: "",
  mekanismeKoping: [],
  mekanismeKopingLain: "",
  halDipikirkan: "",
  harapanPerawatan: "",
  perubahanSetelahSakit: "",
  nilaiBertentangan: "",
  aktivitasAgama: "",
  kondisiLingkunganRumah: "",

  // 9) Pola Kebiasaan: Sebelum Sakit vs Di Rumah Sakit (Hal 5-6)
  pola: {
    nutrisiFrekSebelum: "",
    nutrisiFrekRs: "",
    nutrisiNafsuSebelum: "",
    nutrisiNafsuRs: "",
    nutrisiPorsiSebelum: "",
    nutrisiPorsiRs: "",
    nutrisiTidakDisukaiSebelum: "",
    nutrisiTidakDisukaiRs: "",
    nutrisiAlergiSebelum: "",
    nutrisiAlergiRs: "",
    nutrisiPantanganSebelum: "",
    nutrisiPantanganRs: "",
    nutrisiDietSebelum: "",
    nutrisiDietRs: "",
    nutrisiObatSebelum: "",
    nutrisiObatRs: "",
    nutrisiAlatSebelum: "",
    nutrisiAlatRs: "",

    bakFrekSebelum: "",
    bakFrekRs: "",
    bakWarnaSebelum: "",
    bakWarnaRs: "",
    bakKeluhanSebelum: "",
    bakKeluhanRs: "",
    bakAlatSebelum: "",
    bakAlatRs: "",

    babFrekSebelum: "",
    babFrekRs: "",
    babWaktuSebelum: "",
    babWaktuRs: "",
    babWarnaSebelum: "",
    babWarnaRs: "",
    babKonsistensiSebelum: "",
    babKonsistensiRs: "",
    babKeluhanSebelum: "",
    babKeluhanRs: "",
    babLaxatifSebelum: "",
    babLaxatifRs: "",

    mandiFrekSebelum: "",
    mandiFrekRs: "",
    mandiWaktuSebelum: "",
    mandiWaktuRs: "",
    oralFrekSebelum: "",
    oralFrekRs: "",
    oralWaktuSebelum: "",
    oralWaktuRs: "",
    rambutFrekSebelum: "",
    rambutFrekRs: "",

    tidurSiangSebelum: "",
    tidurSiangRs: "",
    tidurMalamSebelum: "",
    tidurMalamRs: "",
    kebiasaanTidurSebelum: "",
    kebiasaanTidurRs: "",

    waktuBekerjaSebelum: "",
    waktuBekerjaRs: "",
    olahragaStatusSebelum: "Tidak",
    olahragaStatusRs: "Tidak",
    olahragaJenisSebelum: "",
    olahragaJenisRs: "",
    olahragaFrekSebelum: "",
    olahragaFrekRs: "",
    keluhanAktivitasSebelum: "",
    keluhanAktivitasRs: "",

    merokokStatusSebelum: "Tidak",
    merokokStatusRs: "Tidak",
    merokokFrekSebelum: "",
    merokokFrekRs: "",
    merokokJumlahSebelum: "",
    merokokJumlahRs: "",
    merokokLamaSebelum: "",
    merokokLamaRs: "",
    napzaStatusSebelum: "Tidak",
    napzaStatusRs: "Tidak",
    napzaFrekSebelum: "",
    napzaFrekRs: "",
    napzaJumlahSebelum: "",
    napzaJumlahRs: "",
    napzaLamaSebelum: "",
    napzaLamaRs: "",
  },

  // 4. Pengkajian Fisik (Hal 7-11)
  fisik: {
    // a. Pemeriksaan Fisik Umum
    bbSekarang: "",
    bbSebelumSakit: "",
    tb: "",
    td: "",
    nadi: "",
    rr: "",
    suhu: "",
    keadaanUmum: "Sedang",
    pembesaranKgb: "Tidak",
    lokasiKgb: "",

    // b. Sistem Penglihatan
    sisiMata: "Simetris",
    kelopakMata: "Normal",
    pergerakanBolaMata: "Normal",
    konjungtiva: "Merah muda",
    kornea: "Normal",
    sklera: "Anikterik",
    pupil: "Isokor",
    ototMata: "Tidak ada kelainan",
    fungsiPenglihatan: "Baik",
    tandaRadangMata: "Tidak ada",
    pemakaianKacamata: "Tidak",
    jenisKacamata: "",
    pemakaianLensaKontak: "Tidak",
    reaksiCahaya: "Positif (+/+)",

    // c. Sistem Pendengaran
    daunTelinga: "Normal",
    ketDaunTelinga: "",
    serumen: "",
    telingaTengah: "Normal",
    cairanTelinga: "Tidak",
    ketCairanTelinga: "",
    perasaanPenuhTelinga: "Tidak",
    tinitus: "Tidak",
    fungsiPendengaran: "Normal",
    ketPendengaran: "",
    gangguanKeseimbangan: "Tidak",
    ketKeseimbangan: "",
    alatBantuDengar: "Tidak",

    // d. Sistem Wicara
    sistemWicara: "Normal",
    ketWicara: "",

    // e. Sistem Pernafasan
    jalanNafas: "Bersih",
    ketJalanNafas: "",
    pernafasan: "Tidak Sesak",
    ketSesak: "",
    ototBantuNafas: "Tidak",
    frekuensiNafas: "",
    iramaNafas: "Teratur",
    jenisPernafasan: "Spontan",
    kedalamanNafas: "Dalam",
    batuk: "Tidak",
    ketBatuk: "",
    sputum: "Tidak",
    warnaSputum: "",
    konsistensiSputum: "",
    sputumDarah: "Tidak",
    palpasiDada: "Simetris, vokal fremitus kanan-kiri sama",
    perkusiDada: "Sonor",
    suaraNafas: "Vesikuler",
    nyeriBernafas: "Tidak",
    alatBantuNafas: "Tidak",

    // f. Sistem Kardiovaskuler
    nadiPerifer: "",
    iramaNadi: "Teratur",
    denyutNadi: "Kuat",
    tdKardio: "",
    distensiJvpKanan: "Tidak",
    distensiJvpKiri: "Tidak",
    temperaturKulitKardio: "Hangat",
    warnaKulitKardio: "Normal / Kemerahan",
    crt: "< 2",
    edema: "Tidak",
    lokasiEdema: "",
    denyutApikal: "",
    iramaApikal: "Teratur",
    kelainanBunyiJantung: "Tidak ada",
    sakitDada: "Tidak",
    timbulSakitDada: "",
    karakteristikSakitDada: "",
    skalaNyeriDada: "",

    // g. Sistem Hematologi
    hematoPucat: "Tidak",
    hematoPerdarahan: "Tidak",
    jenisPerdarahan: "",

    // h. Sistem Syaraf Pusat
    keluhanSakitKepala: "Tidak ada",
    tingkatKesadaran: "Compos mentis",
    gcsE: "4",
    gcsM: "6",
    gcsV: "5",
    tandaTik: "Tidak",
    ketTik: "",
    gangguanPersyarafan: "Tidak ada",
    reflekFisiologis: "Normal",
    reflekPatologis: "Tidak",

    // i. Sistem Pencernaan
    gigi: "Tidak caries",
    gigiPalsu: "Tidak",
    stomatitis: "Tidak",
    lidahKotor: "Tidak",
    saliva: "Normal",
    muntah: "Tidak",
    isiMuntah: "",
    warnaMuntah: "",
    frekMuntah: "",
    jumlahMuntah: "",
    nyeriPerut: "Tidak",
    skalaNyeriPerut: "",
    lokasiKarakterNyeriPerut: "",
    bisingUsus: "",
    diare: "Tidak",
    lamaDiare: "",
    frekDiare: "",
    warnaFaeces: "Kuning",
    konsistensiFaeces: "Setengah padat",
    konstipasi: "Tidak",
    lamaKonstipasi: "",
    hepar: "Tak teraba",
    abdomen: "Lembek",

    // j. Sistem Endokrin
    pembesaranTiroid: "Tidak",
    gejalaTiroid: "",
    nafasKeton: "Tidak",
    triasDm: "",
    lukaGangren: "Tidak",
    lokasiGangren: "",
    kondisiGangren: "",

    // k. Sistem Urogenital
    intakeCairan: "",
    outputCairan: "",
    perubahanPolaKemih: "Tidak ada kelainan",
    warnaBak: "Kuning jernih",
    distensiKandungKemih: "Tidak",
    sakitPinggang: "Tidak",
    skalaNyeriPinggang: "",

    // l. Sistem Integumen
    turgorKulit: "Baik",
    temperaturKulitIntegumen: "Hangat",
    warnaKulitIntegumen: "Normal / Kemerahan",
    keadaanKulit: "Baik",
    detailKeadaanKulit: "",
    kelainanKulit: "Tidak",
    jenisKelainanKulit: "",
    kondisiAreaInfus: "Baik, tidak ada tanda flebitis",
    teksturRambut: "Baik",
    kebersihanRambut: "Bersih",

    // m. Sistem Muskuloskeletal
    kesulitanPergerakan: "Tidak",
    sakitTulangSendi: "Tidak",
    fraktur: "Tidak",
    lokasiKondisiFraktur: "",
    kelainanBentukSendi: "Tidak ada",
    kelainanTulangBelakang: "Normal",
    tonusOtot: "Baik",
    kekuatanOtot: "5555 | 5555\n5555 | 5555",
  },

  // Data Tambahan, 5. Data Penunjang, 6. Penatalaksanaan (Hal 12)
  pemahamanPenyakit: "",
  dataPenunjang: "",
  penatalaksanaan: "",
};

const KOPING_OPTIONS = [
  "Pemecahan masalah",
  "Makan",
  "Minum obat",
  "Cari pertolongan",
  "Tidur",
  "Lain-lain",
];

export default function PengkajianForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  const [formData, setFormData] = useState(INITIAL_DATA);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMahasiswa((prev) => ({ ...prev, tgl: prev.tgl || today }));
    setFormData((prev) => ({
      ...prev,
      tglPengkajian: prev.tglPengkajian || today,
      tglMasuk: prev.tglMasuk || today,
    }));

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.mahasiswa) {
          setMahasiswa({
            ...parsed.mahasiswa,
            tgl: parsed.mahasiswa.tgl || today,
          });
        }
        if (parsed.formData) {
          setFormData((prev) => ({
            ...prev,
            ...parsed.formData,
            pola: { ...prev.pola, ...(parsed.formData.pola || {}) },
            fisik: { ...prev.fisik, ...(parsed.formData.fisik || {}) },
          }));
        }
      }
    } catch (err) {
      console.error("Gagal memuat pengkajian:", err);
    }
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePola = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      pola: { ...prev.pola, [field]: value },
    }));
  };

  const updateFisik = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      fisik: { ...prev.fisik, [field]: value },
    }));
  };

  const toggleKoping = (item) => {
    setFormData((prev) => {
      const exists = prev.mekanismeKoping.includes(item);
      return {
        ...prev,
        mekanismeKoping: exists
          ? prev.mekanismeKoping.filter((k) => k !== item)
          : [...prev.mekanismeKoping, item],
      };
    });
  };

  const totalGcs =
    (parseInt(formData.fisik.gcsE, 10) || 0) +
    (parseInt(formData.fisik.gcsM, 10) || 0) +
    (parseInt(formData.fisik.gcsV, 10) || 0);

  const handleSaveDraft = () => {
    const payload = {
      mahasiswa,
      formData,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveDraft();
    router.push("/pengkajian/hasil");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              A. Format Pengkajian Keperawatan Medikal Bedah
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Pengkajian komprehensif 6 tahap meliputi identitas, riwayat keperawatan, pola kebiasaan, dan 12 sistem tubuh.
            </p>
          </div>
          <Link
            href="/pengkajian/hasil"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Eye className="w-4 h-4" />
            Lihat Hasil Tersimpan
          </Link>
        </div>

        {/* Stepper Navigation */}
        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isPassed = currentStep > step.id;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  handleSaveDraft();
                  setCurrentStep(step.id);
                }}
                className={`flex items-center gap-2 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : isPassed
                    ? "bg-blue-50/70 text-blue-800 border-blue-200 hover:bg-blue-100/70"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? "bg-white text-blue-600"
                      : isPassed
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {isPassed ? <Check className="w-3.5 h-3.5" /> : step.id}
                </span>
                <span className="text-xs font-semibold leading-tight">{step.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Identitas Mahasiswa */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* ==================================================================== */}
      {/* STEP 1: ADMINISTRASI, IDENTITAS KLIEN & RESUME                       */}
      {/* ==================================================================== */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              Data Administrasi &amp; 1. Identitas Klien
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Pengkajian *
                </label>
                <input
                  type="date"
                  required
                  value={formData.tglPengkajian}
                  onChange={(e) => updateField("tglPengkajian", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tanggal Masuk RS *
                </label>
                <input
                  type="date"
                  required
                  value={formData.tglMasuk}
                  onChange={(e) => updateField("tglMasuk", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ruang / Kelas
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Melati / Kelas II"
                  value={formData.ruangKelas}
                  onChange={(e) => updateField("ruangKelas", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Register / RM
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 00-12-34-56"
                  value={formData.noRegister}
                  onChange={(e) => updateField("noRegister", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diagnosa Medis *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Diabetes Melitus Tipe II + Ulkus Pedis Dextra"
                  value={formData.diagnosaMedis}
                  onChange={(e) => updateField("diagnosaMedis", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Klien (Inisial / Lengkap) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Tn. A"
                  value={formData.namaKlien}
                  onChange={(e) => updateField("namaKlien", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={formData.jenisKelamin}
                  onChange={(e) => updateField("jenisKelamin", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Usia
                </label>
                <input
                  type="text"
                  placeholder="Contoh: 54 Tahun"
                  value={formData.usia}
                  onChange={(e) => updateField("usia", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Status Perkawinan
                </label>
                <select
                  value={formData.statusPerkawinan}
                  onChange={(e) => updateField("statusPerkawinan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- Pilih Status --</option>
                  <option value="Menikah">Menikah</option>
                  <option value="Belum Menikah">Belum Menikah</option>
                  <option value="Cerai Hidup">Cerai Hidup</option>
                  <option value="Cerai Mati">Cerai Mati</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Agama
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Islam"
                  value={formData.agama}
                  onChange={(e) => updateField("agama", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Suku Bangsa
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jawa / Betawi"
                  value={formData.sukuBangsa}
                  onChange={(e) => updateField("sukuBangsa", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pendidikan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: SMA / S1"
                  value={formData.pendidikan}
                  onChange={(e) => updateField("pendidikan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bahasa yang Digunakan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bahasa Indonesia"
                  value={formData.bahasa}
                  onChange={(e) => updateField("bahasa", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pekerjaan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Wiraswasta / Karyawan"
                  value={formData.pekerjaan}
                  onChange={(e) => updateField("pekerjaan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alamat Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Jl. Merdeka No. 10, Jakarta Timur"
                  value={formData.alamat}
                  onChange={(e) => updateField("alamat", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sumber Biaya (Pribadi / Perusahaan / BPJS / Lain-lain)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: BPJS Kesehatan / Pribadi"
                  value={formData.sumberBiaya}
                  onChange={(e) => updateField("sumberBiaya", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Sumber Informasi (Klien / Keluarga)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Klien, Istri klien, dan Rekam Medis"
                  value={formData.sumberInformasi}
                  onChange={(e) => updateField("sumberInformasi", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Resume */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-3">
            <h2 className="text-base font-bold text-slate-900">
              2. Resume (Perjalanan Klinis Sebelum Pengkajian)
            </h2>
            <p className="text-xs text-slate-500">
              Ditulis sejak klien masuk rumah sakit (IGD/Poli) sampai dengan sebelum pengkajian dilakukan (dari data status pasien), meliputi: data fokus, masalah keperawatan, tindakan keperawatan mandiri serta kolaborasi, dan evaluasi secara umum.
            </p>
            <textarea
              rows={6}
              placeholder="Tuliskan ringkasan kronologis sejak klien masuk RS hingga saat pengkajian dilakukan..."
              value={formData.resume}
              onChange={(e) => updateField("resume", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STEP 2: 3. RIWAYAT KEPERAWATAN (SEKARANG, MASA LALU, PSIKOSOSIAL)    */}
      {/* ==================================================================== */}
      {currentStep === 2 && (
        <div className="space-y-6">
          {/* a. Riwayat Kesehatan Sekarang */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              3.a. Riwayat Kesehatan Sekarang
            </h2>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                1) Keluhan Utama
              </label>
              <textarea
                rows={2}
                placeholder="Keluhan yang paling dirasakan klien saat pengkajian..."
                value={formData.keluhanUtama}
                onChange={(e) => updateField("keluhanUtama", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2a) Faktor Pencetus
                </label>
                <input
                  type="text"
                  placeholder="Penyebab awal munculnya keluhan"
                  value={formData.faktorPencetus}
                  onChange={(e) => updateField("faktorPencetus", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2b) Timbulnya Keluhan
                </label>
                <select
                  value={formData.timbulnyaKeluhan}
                  onChange={(e) => updateField("timbulnyaKeluhan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                >
                  <option value="Mendadak">Mendadak</option>
                  <option value="Bertahap">Bertahap</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2c) Lamanya Keluhan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sejak 3 hari SMRS"
                  value={formData.lamanyaKeluhan}
                  onChange={(e) => updateField("lamanyaKeluhan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                2d) Kronologis &amp; Upaya Mengatasi Keluhan
              </label>
              <textarea
                rows={3}
                placeholder="Ceritakan kronologis keluhan hingga upaya berobat/tindakan sebelum masuk RS..."
                value={formData.upayaMengatasi}
                onChange={(e) => updateField("upayaMengatasi", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* b, c, d. Riwayat Masa Lalu & Keluarga */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              3.b – 3.d. Riwayat Kesehatan Masa Lalu &amp; Keluarga
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  b.1) Riwayat Alergi (Obat, Makanan, Binatang, Lingkungan)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tidak ada alergi / Alergi obat golongan penisilin"
                  value={formData.riwayatAlergi}
                  onChange={(e) => updateField("riwayatAlergi", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  b.2) Riwayat Kecelakaan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tidak pernah mengalami kecelakaan berat"
                  value={formData.riwayatKecelakaan}
                  onChange={(e) => updateField("riwayatKecelakaan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  b.3) Riwayat Dirawat di RS (Kapan, Alasan, Berapa Lama)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tahun 2024 karena hipertensi selama 4 hari"
                  value={formData.riwayatDirawat}
                  onChange={(e) => updateField("riwayatDirawat", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  b.4) Riwayat Pemakaian Obat Rutin
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Metformin 500 mg 2x1, Amlodipin 5 mg 1x1"
                  value={formData.riwayatPemakaianObat}
                  onChange={(e) => updateField("riwayatPemakaianObat", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                c) Riwayat Kesehatan Keluarga (Keterangan Genogram 3 Generasi)
              </label>
              <textarea
                rows={3}
                placeholder="Jelaskan susunan 3 generasi keluarga klien, anggota keluarga yang tinggal serumah, serta riwayat penyakit keturunan/menular..."
                value={formData.genogramKeterangan}
                onChange={(e) => updateField("genogramKeterangan", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                d) Penyakit yang Pernah Diderita Anggota Keluarga (Faktor Risiko)
              </label>
              <input
                type="text"
                placeholder="Contoh: Ibu kandung memiliki riwayat Diabetes Melitus dan Hipertensi"
                value={formData.penyakitKeluargaFaktorRisiko}
                onChange={(e) => updateField("penyakitKeluargaFaktorRisiko", e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* e. Riwayat Psikososial dan Spiritual */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              3.e. Riwayat Psikososial, Spiritual &amp; Lingkungan
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  1) Orang Terdekat dengan Klien
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Istri dan anak pertama"
                  value={formData.orangTerdekat}
                  onChange={(e) => updateField("orangTerdekat", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2a) Pola Komunikasi dalam Keluarga
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Terbuka dan musyawarah"
                  value={formData.polaKomunikasi}
                  onChange={(e) => updateField("polaKomunikasi", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2b) Pembuatan Keputusan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kepala keluarga bersama pasangan"
                  value={formData.pembuatanKeputusan}
                  onChange={(e) => updateField("pembuatanKeputusan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  2c) Kegiatan Kemasyarakatan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Aktif mengikuti pengajian/kerja bakti RT"
                  value={formData.kegiatanKemasyarakatan}
                  onChange={(e) => updateField("kegiatanKemasyarakatan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  3) Dampak Penyakit Klien terhadap Keluarga
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Keluarga bergantian menjaga di RS, penghasilan berkurang sementara"
                  value={formData.dampakPenyakitKeluarga}
                  onChange={(e) => updateField("dampakPenyakitKeluarga", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  4) Masalah yang Mempengaruhi Klien
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Cemas memikirkan proses penyembuhan luka"
                  value={formData.masalahMempengaruhiKlien}
                  onChange={(e) => updateField("masalahMempengaruhiKlien", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* 5) Mekanisme Koping */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                5) Mekanisme Koping terhadap Stres (Bisa pilih lebih dari satu)
              </label>
              <div className="flex flex-wrap gap-2">
                {KOPING_OPTIONS.map((item) => {
                  const checked = formData.mekanismeKoping.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleKoping(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                        checked
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {checked ? "✓ " : ""}{item}
                    </button>
                  );
                })}
              </div>
              {formData.mekanismeKoping.includes("Lain-lain") && (
                <input
                  type="text"
                  placeholder="Sebutkan mekanisme koping lain-lain (misal: marah, diam, berdoa)..."
                  value={formData.mekanismeKopingLain}
                  onChange={(e) => updateField("mekanismeKopingLain", e.target.value)}
                  className="mt-2 w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              )}
            </div>

            {/* 6) Persepsi, 7) Nilai Kepercayaan, 8) Lingkungan */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  6a) Hal yang Sangat Dipikirkan Saat Ini
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Ingin segera sembuh dan bekerja kembali"
                  value={formData.halDipikirkan}
                  onChange={(e) => updateField("halDipikirkan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  6b) Harapan Setelah Menjalani Perawatan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Kondisi stabil, gula darah terkontrol"
                  value={formData.harapanPerawatan}
                  onChange={(e) => updateField("harapanPerawatan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  6c) Perubahan yang Dirasakan Setelah Jatuh Sakit
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Aktivitas fisik terbatas, cepat lelah"
                  value={formData.perubahanSetelahSakit}
                  onChange={(e) => updateField("perubahanSetelahSakit", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  7a) Nilai-nilai yang Bertentangan dengan Kesehatan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Tidak ada"
                  value={formData.nilaiBertentangan}
                  onChange={(e) => updateField("nilaiBertentangan", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  7b) Aktivitas Agama / Kepercayaan yang Dilakukan
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sholat 5 waktu di tempat tidur dan berdoa"
                  value={formData.aktivitasAgama}
                  onChange={(e) => updateField("aktivitasAgama", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  8) Kondisi Lingkungan Rumah
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Rumah permanen, ventilasi & pencahayaan cukup"
                  value={formData.kondisiLingkunganRumah}
                  onChange={(e) => updateField("kondisiLingkunganRumah", e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STEP 3: 9) POLA KEBIASAAN (SEBELUM SAKIT VS DI RUMAH SAKIT)          */}
      {/* ==================================================================== */}
      {currentStep === 3 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              3.e.9) Pola Kebiasaan Sehari-hari (Sebelum Sakit vs Di Rumah Sakit)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Bandingkan pemenuhan kebutuhan dasar klien sebelum dirawat dan selama dirawat di rumah sakit.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-800">
                  <th className="border border-slate-200 p-3 text-left font-bold w-4/12">
                    Hal yang Dikaji
                  </th>
                  <th className="border border-slate-200 p-3 text-left font-bold w-4/12">
                    Sebelum Sakit
                  </th>
                  <th className="border border-slate-200 p-3 text-left font-bold w-4/12">
                    Di Rumah Sakit
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { section: "1. POLA NUTRISI" },
                  { label: "a. Frekuensi makan (X/hari)", k1: "nutrisiFrekSebelum", k2: "nutrisiFrekRs", ph: "3x/hari" },
                  { label: "b. Nafsu makan & Alasan (mual, muntah, sariawan)", k1: "nutrisiNafsuSebelum", k2: "nutrisiNafsuRs", ph: "Baik / Menurun karena mual" },
                  { label: "c. Porsi makanan yang dihabiskan", k1: "nutrisiPorsiSebelum", k2: "nutrisiPorsiRs", ph: "1 porsi / 1/2 porsi" },
                  { label: "d. Makanan yang tidak disukai", k1: "nutrisiTidakDisukaiSebelum", k2: "nutrisiTidakDisukaiRs", ph: "Tidak ada" },
                  { label: "e. Makanan yang membuat alergi", k1: "nutrisiAlergiSebelum", k2: "nutrisiAlergiRs", ph: "Tidak ada" },
                  { label: "f. Makanan pantangan", k1: "nutrisiPantanganSebelum", k2: "nutrisiPantanganRs", ph: "Makanan manis/tinggi garam" },
                  { label: "g. Makanan diet", k1: "nutrisiDietSebelum", k2: "nutrisiDietRs", ph: "Diet DM 1700 kkal" },
                  { label: "h. Penggunaan obat-obatan sebelum makan", k1: "nutrisiObatSebelum", k2: "nutrisiObatRs", ph: "Tidak ada / Antasida" },
                  { label: "i. Penggunaan alat bantu (NGT, dll)", k1: "nutrisiAlatSebelum", k2: "nutrisiAlatRs", ph: "Mandiri / NGT" },

                  { section: "2. POLA ELIMINASI — a. B.A.K" },
                  { label: "1) Frekuensi B.A.K (X/hari)", k1: "bakFrekSebelum", k2: "bakFrekRs", ph: "5-6x/hari" },
                  { label: "2) Warna urine", k1: "bakWarnaSebelum", k2: "bakWarnaRs", ph: "Kuning jernih" },
                  { label: "3) Keluhan B.A.K", k1: "bakKeluhanSebelum", k2: "bakKeluhanRs", ph: "Tidak ada" },
                  { label: "4) Penggunaan alat bantu (Kateter, dll)", k1: "bakAlatSebelum", k2: "bakAlatRs", ph: "Tidak ada / DC" },

                  { section: "2. POLA ELIMINASI — b. B.A.B" },
                  { label: "1) Frekuensi B.A.B (X/hari)", k1: "babFrekSebelum", k2: "babFrekRs", ph: "1x/hari" },
                  { label: "2) Waktu (Pagi / Siang / Malam / Tidak tentu)", k1: "babWaktuSebelum", k2: "babWaktuRs", ph: "Pagi" },
                  { label: "3) Warna feses", k1: "babWarnaSebelum", k2: "babWarnaRs", ph: "Kuning kecokelatan" },
                  { label: "4) Konsistensi feses", k1: "babKonsistensiSebelum", k2: "babKonsistensiRs", ph: "Lembek / Padat" },
                  { label: "5) Keluhan B.A.B", k1: "babKeluhanSebelum", k2: "babKeluhanRs", ph: "Tidak ada" },
                  { label: "6) Penggunaan Laxatif", k1: "babLaxatifSebelum", k2: "babLaxatifRs", ph: "Tidak ada" },

                  { section: "3. POLA PERSONAL HYGIENE" },
                  { label: "a. Mandi: Frekuensi (X/hari) & Waktu (Pagi/Sore/Malam)", k1: "mandiFrekSebelum", k2: "mandiFrekRs", ph: "2x/hari (Pagi & Sore) / Diseka" },
                  { label: "b. Oral Hygiene: Frekuensi (X/hari) & Waktu", k1: "oralFrekSebelum", k2: "oralFrekRs", ph: "2x/hari (Pagi & Malam)" },
                  { label: "c. Cuci rambut: Frekuensi (X/minggu)", k1: "rambutFrekSebelum", k2: "rambutFrekRs", ph: "3x/minggu / Belum keramas" },

                  { section: "4. POLA ISTIRAHAT DAN TIDUR" },
                  { label: "a. Lama tidur siang (Jam/hari)", k1: "tidurSiangSebelum", k2: "tidurSiangRs", ph: "1 jam/hari" },
                  { label: "b. Lama tidur malam (Jam/hari)", k1: "tidurMalamSebelum", k2: "tidurMalamRs", ph: "7 jam/hari" },
                  { label: "c. Kebiasaan sebelum tidur", k1: "kebiasaanTidurSebelum", k2: "kebiasaanTidurRs", ph: "Berdoa / Minum air putih" },

                  { section: "5. POLA AKTIVITAS DAN LATIHAN" },
                  { label: "a. Waktu bekerja (Pagi/Siang/Malam)", k1: "waktuBekerjaSebelum", k2: "waktuBekerjaRs", ph: "Pagi - Sore / Tirah baring" },
                  { label: "b-d. Olahraga (Ya/Tidak, Jenis, Frekuensi X/minggu)", k1: "olahragaJenisSebelum", k2: "olahragaJenisRs", ph: "Ya, jalan santai 2x/minggu / Tidak" },
                  { label: "e. Keluhan beraktivitas (gerak/mandi/pakaian/sesak)", k1: "keluhanAktivitasSebelum", k2: "keluhanAktivitasRs", ph: "Mandiri / Dibantu sebagian" },

                  { section: "6. KEBIASAAN YANG MEMPENGARUHI KESEHATAN" },
                  { label: "a. Merokok (Ya/Tidak, Frekuensi, Jumlah, Lama)", k1: "merokokFrekSebelum", k2: "merokokFrekRs", ph: "Tidak / Berhenti" },
                  { label: "b. Minuman keras / NAPZA (Ya/Tidak, Frekuensi, Jumlah, Lama)", k1: "napzaFrekSebelum", k2: "napzaFrekRs", ph: "Tidak" },
                ].map((item, idx) =>
                  item.section ? (
                    <tr key={idx} className="bg-blue-50/70">
                      <td colSpan={3} className="border border-slate-200 px-3 py-2 font-bold text-blue-900">
                        {item.section}
                      </td>
                    </tr>
                  ) : (
                    <tr key={item.k1}>
                      <td className="border border-slate-200 p-2.5 font-medium text-slate-700">
                        {item.label}
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          placeholder={item.ph}
                          value={formData.pola[item.k1]}
                          onChange={(e) => updatePola(item.k1, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="border border-slate-200 p-1.5">
                        <input
                          type="text"
                          placeholder={item.ph}
                          value={formData.pola[item.k2]}
                          onChange={(e) => updatePola(item.k2, e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded focus:outline-none focus:border-blue-500"
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STEP 4: 4. PENGKAJIAN FISIK BAGIAN 1 (UMUM, MATA, THT, NAFAS, JANTUNG)*/}
      {/* ==================================================================== */}
      {currentStep === 4 && (
        <div className="space-y-6">
          {/* a. Pemeriksaan Fisik Umum */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              4.a. Pemeriksaan Fisik Umum &amp; Tanda-Tanda Vital
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">1) BB Sekarang (Kg)</label>
                <input type="text" placeholder="62" value={formData.fisik.bbSekarang} onChange={(e) => updateFisik("bbSekarang", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">BB Sebelum Sakit (Kg)</label>
                <input type="text" placeholder="65" value={formData.fisik.bbSebelumSakit} onChange={(e) => updateFisik("bbSebelumSakit", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">2) Tinggi Badan (cm)</label>
                <input type="text" placeholder="168" value={formData.fisik.tb} onChange={(e) => updateFisik("tb", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">3) Tekanan Darah (mmHg)</label>
                <input type="text" placeholder="120/80" value={formData.fisik.td} onChange={(e) => updateFisik("td", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">4) Nadi (x/menit)</label>
                <input type="text" placeholder="84" value={formData.fisik.nadi} onChange={(e) => updateFisik("nadi", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">5) Frekuensi Nafas (x/menit)</label>
                <input type="text" placeholder="20" value={formData.fisik.rr} onChange={(e) => updateFisik("rr", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">6) Suhu Tubuh (°C)</label>
                <input type="text" placeholder="36.7" value={formData.fisik.suhu} onChange={(e) => updateFisik("suhu", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">7) Keadaan Umum</label>
                <select value={formData.fisik.keadaanUmum} onChange={(e) => updateFisik("keadaanUmum", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="Ringan">Sakit Ringan</option>
                  <option value="Sedang">Sakit Sedang</option>
                  <option value="Berat">Sakit Berat</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">8) Pembesaran KGB</label>
                <select value={formData.fisik.pembesaranKgb} onChange={(e) => updateFisik("pembesaranKgb", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg">
                  <option value="Tidak">Tidak</option>
                  <option value="Ya">Ya</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Lokasi Pembesaran KGB (jika Ya)</label>
                <input type="text" placeholder="Contoh: Tidak ada pembesaran" value={formData.fisik.lokasiKgb} onChange={(e) => updateFisik("lokasiKgb", e.target.value)} className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          {/* b, c, d. Penglihatan, Pendengaran, Wicara */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              4.b – 4.d. Sistem Penglihatan, Pendengaran &amp; Wicara
            </h2>

            {/* Penglihatan */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sisi Mata</label>
                <select value={formData.fisik.sisiMata} onChange={(e) => updateFisik("sisiMata", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Simetris">Simetris</option>
                  <option value="Asimetris">Asimetris</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kelopak Mata</label>
                <select value={formData.fisik.kelopakMata} onChange={(e) => updateFisik("kelopakMata", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Normal">Normal</option>
                  <option value="Ptosis">Ptosis</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pergerakan Bola Mata</label>
                <select value={formData.fisik.pergerakanBolaMata} onChange={(e) => updateFisik("pergerakanBolaMata", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Normal">Normal</option>
                  <option value="Abnormal">Abnormal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Konjungtiva</label>
                <select value={formData.fisik.konjungtiva} onChange={(e) => updateFisik("konjungtiva", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Merah muda">Merah muda</option>
                  <option value="Anemis">Anemis</option>
                  <option value="Sangat Merah">Sangat Merah</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kornea</label>
                <select value={formData.fisik.kornea} onChange={(e) => updateFisik("kornea", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Normal">Normal</option>
                  <option value="Keruh/berkabut">Keruh/berkabut</option>
                  <option value="Terdapat Perdarahan">Terdapat Perdarahan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sklera</label>
                <select value={formData.fisik.sklera} onChange={(e) => updateFisik("sklera", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Anikterik">Anikterik</option>
                  <option value="Ikterik">Ikterik</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pupil</label>
                <select value={formData.fisik.pupil} onChange={(e) => updateFisik("pupil", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Isokor">Isokor</option>
                  <option value="Anisokor">Anisokor</option>
                  <option value="Midriasis">Midriasis</option>
                  <option value="Miosis">Miosis</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Otot-otot Mata</label>
                <select value={formData.fisik.ototMata} onChange={(e) => updateFisik("ototMata", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Tidak ada kelainan">Tidak ada kelainan</option>
                  <option value="Juling ke dalam">Juling ke dalam</option>
                  <option value="Juling keluar">Juling keluar</option>
                  <option value="Berada di atas">Berada di atas</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fungsi Penglihatan</label>
                <select value={formData.fisik.fungsiPenglihatan} onChange={(e) => updateFisik("fungsiPenglihatan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Baik">Baik</option>
                  <option value="Kabur">Kabur</option>
                  <option value="Dua bentuk / diplopia">Dua bentuk / diplopia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tanda Radang &amp; Reaksi Cahaya</label>
                <input type="text" value={formData.fisik.reaksiCahaya} onChange={(e) => updateFisik("reaksiCahaya", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kaca Mata / Lensa Kontak</label>
                <input type="text" placeholder="Tidak / Ya, jenis..." value={formData.fisik.pemakaianKacamata} onChange={(e) => updateFisik("pemakaianKacamata", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sistem Wicara</label>
                <select value={formData.fisik.sistemWicara} onChange={(e) => updateFisik("sistemWicara", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Normal">Normal</option>
                  <option value="Aphasia">Tidak: Aphasia</option>
                  <option value="Aphonia">Tidak: Aphonia</option>
                  <option value="Dysartria">Tidak: Dysartria</option>
                  <option value="Dysphasia">Tidak: Dysphasia</option>
                  <option value="Anarthia">Tidak: Anarthia</option>
                </select>
              </div>
            </div>

            {/* Pendengaran */}
            <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Daun Telinga</label>
                <input type="text" value={formData.fisik.daunTelinga} onChange={(e) => updateFisik("daunTelinga", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Karakteristik Serumen</label>
                <input type="text" placeholder="Bersih / sedikit lunak" value={formData.fisik.serumen} onChange={(e) => updateFisik("serumen", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kondisi Telinga Tengah</label>
                <select value={formData.fisik.telingaTengah} onChange={(e) => updateFisik("telingaTengah", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Normal">Normal</option>
                  <option value="Kemerahan">Kemerahan</option>
                  <option value="Bengkak">Bengkak</option>
                  <option value="Terdapat lesi">Terdapat lesi</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Cairan dari Telinga</label>
                <input type="text" value={formData.fisik.cairanTelinga} onChange={(e) => updateFisik("cairanTelinga", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Perasaan Penuh / Tinitus</label>
                <input type="text" placeholder="Tidak ada" value={formData.fisik.tinitus} onChange={(e) => updateFisik("tinitus", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fungsi Pendengaran</label>
                <select value={formData.fisik.fungsiPendengaran} onChange={(e) => updateFisik("fungsiPendengaran", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Normal">Normal</option>
                  <option value="Kurang">Kurang</option>
                  <option value="Tuli">Tuli (kanan/kiri)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gangguan Keseimbangan</label>
                <input type="text" value={formData.fisik.gangguanKeseimbangan} onChange={(e) => updateFisik("gangguanKeseimbangan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pemakaian Alat Bantu Dengar</label>
                <select value={formData.fisik.alatBantuDengar} onChange={(e) => updateFisik("alatBantuDengar", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Tidak">Tidak</option>
                  <option value="Ya">Ya</option>
                </select>
              </div>
            </div>
          </div>

          {/* e. Sistem Pernafasan */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              4.e. Sistem Pernafasan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">1) Jalan Nafas</label>
                <select value={formData.fisik.jalanNafas} onChange={(e) => updateFisik("jalanNafas", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Bersih">Bersih</option>
                  <option value="Ada sumbatan">Ada sumbatan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">2) Pernafasan (Sesak)</label>
                <select value={formData.fisik.pernafasan} onChange={(e) => updateFisik("pernafasan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Tidak Sesak">Tidak Sesak</option>
                  <option value="Sesak">Sesak</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">3) Otot Bantu Nafas</label>
                <select value={formData.fisik.ototBantuNafas} onChange={(e) => updateFisik("ototBantuNafas", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Tidak">Tidak</option>
                  <option value="Ya">Ya</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">4-5) Frekuensi &amp; Irama</label>
                <select value={formData.fisik.iramaNafas} onChange={(e) => updateFisik("iramaNafas", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Teratur">Teratur</option>
                  <option value="Tidak teratur">Tidak teratur</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">6) Jenis Pernafasan</label>
                <input type="text" placeholder="Spontan / Kussmaul / Cheyne-Stokes" value={formData.fisik.jenisPernafasan} onChange={(e) => updateFisik("jenisPernafasan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">7) Kedalaman</label>
                <select value={formData.fisik.kedalamanNafas} onChange={(e) => updateFisik("kedalamanNafas", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Dalam">Dalam</option>
                  <option value="Dangkal">Dangkal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">8) Batuk</label>
                <select value={formData.fisik.batuk} onChange={(e) => updateFisik("batuk", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Tidak">Tidak</option>
                  <option value="Ya (Produktif)">Ya (Produktif)</option>
                  <option value="Ya (Tidak Produktif)">Ya (Tidak Produktif)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">9-11) Sputum, Konsistensi &amp; Darah</label>
                <input type="text" placeholder="Tidak ada / Putih kental / Hemoptisis" value={formData.fisik.sputum} onChange={(e) => updateFisik("sputum", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">12) Palpasi Dada</label>
                <input type="text" value={formData.fisik.palpasiDada} onChange={(e) => updateFisik("palpasiDada", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">13) Perkusi Dada</label>
                <input type="text" value={formData.fisik.perkusiDada} onChange={(e) => updateFisik("perkusiDada", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">14) Suara Nafas</label>
                <select value={formData.fisik.suaraNafas} onChange={(e) => updateFisik("suaraNafas", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Vesikuler">Vesikuler</option>
                  <option value="Ronkhi">Ronkhi</option>
                  <option value="Wheezing">Wheezing</option>
                  <option value="Rales">Rales</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">15-16) Nyeri Bernafas &amp; Alat Bantu</label>
                <input type="text" placeholder="Tidak nyeri, tanpa alat bantu / Nasal kanul 3 lpm" value={formData.fisik.alatBantuNafas} onChange={(e) => updateFisik("alatBantuNafas", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          {/* f & g. Kardiovaskuler & Hematologi */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              4.f – 4.g. Sistem Kardiovaskuler &amp; Hematologi
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Irama &amp; Denyut Nadi Perifer</label>
                <select value={formData.fisik.denyutNadi} onChange={(e) => updateFisik("denyutNadi", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Kuat">Teratur &amp; Kuat</option>
                  <option value="Lemah">Lemah</option>
                  <option value="Tidak teratur">Tidak teratur</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Distensi Vena Jugularis (Ka/Ki)</label>
                <select value={formData.fisik.distensiJvpKanan} onChange={(e) => updateFisik("distensiJvpKanan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Tidak">Tidak ada distensi</option>
                  <option value="Ya (Kanan)">Ya (Kanan)</option>
                  <option value="Ya (Kiri)">Ya (Kiri)</option>
                  <option value="Ya (Kanan & Kiri)">Ya (Kanan &amp; Kiri)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Temperatur &amp; Warna Kulit</label>
                <input type="text" value={formData.fisik.temperaturKulitKardio} onChange={(e) => updateFisik("temperaturKulitKardio", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pengisian Kapiler / CRT (detik)</label>
                <input type="text" placeholder="< 2 detik" value={formData.fisik.crt} onChange={(e) => updateFisik("crt", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Edema &amp; Lokasi</label>
                <input type="text" placeholder="Tidak / Ya, tungkai bawah" value={formData.fisik.edema} onChange={(e) => updateFisik("edema", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Denyut Apikal &amp; Bunyi Jantung</label>
                <input type="text" placeholder="S1 S2 tunggal reguler / Murmur / Gallop" value={formData.fisik.kelainanBunyiJantung} onChange={(e) => updateFisik("kelainanBunyiJantung", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Sakit Dada (Timbul, Karakter, Skala)</label>
                <input type="text" placeholder="Tidak / Ya, skala..." value={formData.fisik.sakitDada} onChange={(e) => updateFisik("sakitDada", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Hematologi (Pucat / Perdarahan)</label>
                <input type="text" placeholder="Tidak pucat, tidak ada perdarahan" value={formData.fisik.hematoPerdarahan} onChange={(e) => updateFisik("hematoPerdarahan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STEP 5: 4. PENGKAJIAN FISIK BAGIAN 2 (SYARAF, CERNA, ENDO, URO, DLL)  */}
      {/* ==================================================================== */}
      {currentStep === 5 && (
        <div className="space-y-6">
          {/* h. Sistem Syaraf Pusat */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                4.h. Sistem Syaraf Pusat &amp; Glasgow Coma Scale (GCS)
              </h2>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Total Skor GCS: E{formData.fisik.gcsE} M{formData.fisik.gcsM} V{formData.fisik.gcsV} = {totalGcs}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">1) Keluhan Sakit Kepala</label>
                <input type="text" placeholder="Tidak ada / Vertigo / Migrain" value={formData.fisik.keluhanSakitKepala} onChange={(e) => updateFisik("keluhanSakitKepala", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">2) Tingkat Kesadaran</label>
                <select value={formData.fisik.tingkatKesadaran} onChange={(e) => updateFisik("tingkatKesadaran", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Compos mentis">Compos mentis</option>
                  <option value="Apatis">Apatis</option>
                  <option value="Somnolent">Somnolent</option>
                  <option value="Soporokoma">Soporokoma</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">3) GCS — Eye (E: 1-4)</label>
                <select value={formData.fisik.gcsE} onChange={(e) => updateFisik("gcsE", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="4">4 - Spontan</option>
                  <option value="3">3 - Dengan perintah suara</option>
                  <option value="2">2 - Dengan rangsang nyeri</option>
                  <option value="1">1 - Tidak membuka mata</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GCS — Motorik (M: 1-6)</label>
                <select value={formData.fisik.gcsM} onChange={(e) => updateFisik("gcsM", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="6">6 - Mengikuti perintah</option>
                  <option value="5">5 - Melokalisir nyeri</option>
                  <option value="4">4 - Menghindari nyeri</option>
                  <option value="3">3 - Fleksi abnormal</option>
                  <option value="2">2 - Ekstensi abnormal</option>
                  <option value="1">1 - Tidak ada gerakan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GCS — Verbal (V: 1-5)</label>
                <select value={formData.fisik.gcsV} onChange={(e) => updateFisik("gcsV", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="5">5 - Orientasi baik</option>
                  <option value="4">4 - Bingung / disorientasi</option>
                  <option value="3">3 - Kata-kata tidak tepat</option>
                  <option value="2">2 - Mengerang</option>
                  <option value="1">1 - Tidak ada suara</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">4) Tanda Peningkatan TIK</label>
                <input type="text" placeholder="Tidak / Muntah proyektil / Papil edema" value={formData.fisik.tandaTik} onChange={(e) => updateFisik("tandaTik", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">5) Gangguan Persyarafan</label>
                <input type="text" placeholder="Tidak ada / Kejang / Pelo / Hemiparesis" value={formData.fisik.gangguanPersyarafan} onChange={(e) => updateFisik("gangguanPersyarafan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">6) Reflek Fisiologis &amp; Patologis</label>
                <input type="text" placeholder="Fisiologis normal, Patologis (-)" value={formData.fisik.reflekFisiologis} onChange={(e) => updateFisik("reflekFisiologis", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          {/* i. Sistem Pencernaan */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              4.i. Sistem Pencernaan
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">1-5) Mulut (Gigi, Stomatitis, Lidah, Saliva)</label>
                <input type="text" placeholder="Bersih, mukosa lembab, tidak caries" value={formData.fisik.gigi} onChange={(e) => updateFisik("gigi", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">6) Muntah (Isi, Warna, Frek, Jumlah)</label>
                <input type="text" placeholder="Tidak / Ya, cairan 2x @100ml" value={formData.fisik.muntah} onChange={(e) => updateFisik("muntah", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">7-9) Nyeri Perut (Skala, Lokasi, Karakter)</label>
                <input type="text" placeholder="Tidak / Ya, epigastrium skala 4" value={formData.fisik.nyeriPerut} onChange={(e) => updateFisik("nyeriPerut", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">10) Bising Usus (x/menit)</label>
                <input type="text" placeholder="12 x/menit" value={formData.fisik.bisingUsus} onChange={(e) => updateFisik("bisingUsus", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">11) Diare (Lama, Frek, Warna, Konsistensi)</label>
                <input type="text" placeholder="Tidak / Ya..." value={formData.fisik.diare} onChange={(e) => updateFisik("diare", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">12) Konstipasi (Ya/Tidak, Lamanya)</label>
                <input type="text" placeholder="Tidak / Ya, 3 hari" value={formData.fisik.konstipasi} onChange={(e) => updateFisik("konstipasi", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">13) Hepar</label>
                <select value={formData.fisik.hepar} onChange={(e) => updateFisik("hepar", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Tak teraba">Tak teraba</option>
                  <option value="Teraba">Teraba</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">14) Abdomen</label>
                <select value={formData.fisik.abdomen} onChange={(e) => updateFisik("abdomen", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Lembek">Lembek (Supel)</option>
                  <option value="Kembung">Kembung</option>
                  <option value="Acites">Acites</option>
                  <option value="Distensi">Distensi</option>
                </select>
              </div>
            </div>
          </div>

          {/* j & k. Endokrin & Urogenital */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              4.j – 4.k. Sistem Endokrin &amp; Urogenital
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Pembesaran Kelenjar Tiroid</label>
                <input type="text" placeholder="Tidak / Ya (Exoptalmus/Tremor)" value={formData.fisik.pembesaranTiroid} onChange={(e) => updateFisik("pembesaranTiroid", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nafas Keton &amp; Trias DM (3P)</label>
                <input type="text" placeholder="Tidak bau keton, Poliuri/Polidipsi" value={formData.fisik.nafasKeton} onChange={(e) => updateFisik("nafasKeton", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Luka Gangren (Ya/Tidak, Lokasi &amp; Kondisi)</label>
                <input type="text" placeholder="Tidak / Ya, di plantar pedis dextra 4x3 cm, pus (+)" value={formData.fisik.lukaGangren} onChange={(e) => updateFisik("lukaGangren", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Balance Cairan: Intake (ml)</label>
                <input type="text" placeholder="1800 ml/24 jam" value={formData.fisik.intakeCairan} onChange={(e) => updateFisik("intakeCairan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Balance Cairan: Output (ml)</label>
                <input type="text" placeholder="1500 ml/24 jam" value={formData.fisik.outputCairan} onChange={(e) => updateFisik("outputCairan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Perubahan Pola Kemih &amp; Warna BAK</label>
                <input type="text" placeholder="Normal, kuning jernih" value={formData.fisik.warnaBak} onChange={(e) => updateFisik("warnaBak", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Distensi Kandung Kemih &amp; Sakit Pinggang</label>
                <input type="text" placeholder="Tidak ada distensi, tidak nyeri" value={formData.fisik.distensiKandungKemih} onChange={(e) => updateFisik("distensiKandungKemih", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
            </div>
          </div>

          {/* l & m. Integumen & Muskuloskeletal */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              4.l – 4.m. Sistem Integumen &amp; Muskuloskeletal
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Turgor Kulit</label>
                <select value={formData.fisik.turgorKulit} onChange={(e) => updateFisik("turgorKulit", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Baik">Baik (&lt; 2 detik)</option>
                  <option value="Buruk">Buruk / Menurun</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keadaan Kulit (Lesi/Ulkus/Insisi/Dekubitus)</label>
                <input type="text" placeholder="Baik / Luka insisi abdomen..." value={formData.fisik.keadaanKulit} onChange={(e) => updateFisik("keadaanKulit", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kondisi Daerah Pemasangan Infus</label>
                <input type="text" value={formData.fisik.kondisiAreaInfus} onChange={(e) => updateFisik("kondisiAreaInfus", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keadaan Rambut (Tekstur &amp; Kebersihan)</label>
                <input type="text" placeholder="Baik, bersih, tidak alopesia" value={formData.fisik.kebersihanRambut} onChange={(e) => updateFisik("kebersihanRambut", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kesulitan Pergerakan &amp; Sakit Sendi</label>
                <input type="text" placeholder="Tidak / Terbatas pada ekstremitas..." value={formData.fisik.kesulitanPergerakan} onChange={(e) => updateFisik("kesulitanPergerakan", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Fraktur (Ya/Tidak, Lokasi &amp; Kondisi)</label>
                <input type="text" placeholder="Tidak" value={formData.fisik.fraktur} onChange={(e) => updateFisik("fraktur", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Kelainan Sendi &amp; Tulang Belakang</label>
                <input type="text" placeholder="Normal, tidak ada kontraktur" value={formData.fisik.kelainanTulangBelakang} onChange={(e) => updateFisik("kelainanTulangBelakang", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Keadaan Tonus Otot</label>
                <select value={formData.fisik.tonusOtot} onChange={(e) => updateFisik("tonusOtot", e.target.value)} className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-lg">
                  <option value="Baik">Baik (Normotoni)</option>
                  <option value="Hipertoni">Hipertoni</option>
                  <option value="Hipotoni">Hipotoni</option>
                  <option value="Atoni">Atoni</option>
                </select>
              </div>
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Derajat Kekuatan Otot (Skala 0–5: Ekstremitas Atas Kanan/Kiri &amp; Bawah Kanan/Kiri)
                </label>
                <textarea
                  rows={2}
                  value={formData.fisik.kekuatanOtot}
                  onChange={(e) => updateFisik("kekuatanOtot", e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STEP 6: DATA TAMBAHAN, DATA PENUNJANG & PENATALAKSANAAN              */}
      {/* ==================================================================== */}
      {currentStep === 6 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              Data Tambahan (Pemahaman Klien &amp; Keluarga tentang Penyakit)
            </label>
            <textarea
              rows={3}
              placeholder="Contoh: Klien mengetahui bahwa dirinya menderita diabetes namun belum memahami cara perawatan luka dan pengaturan diet yang tepat..."
              value={formData.pemahamanPenyakit}
              onChange={(e) => updateField("pemahamanPenyakit", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              5. Data Penunjang (Pemeriksaan Diagnostik: Laboratorium, Radiologi, EKG, Endoskopi, dll)
            </label>
            <textarea
              rows={5}
              placeholder={"Contoh:\n- Laboratorium (26/11/2026): Hb 11,2 g/dL, Leukosit 14.500 /uL, Trombosit 290.000 /uL, GDS 285 mg/dL, HbA1c 9,2%\n- Rontgen Pedis Dextra: Tidak tampak osteomielitis\n- EKG: Sinus ritme, HR 84 x/menit"}
              value={formData.dataPenunjang}
              onChange={(e) => updateField("dataPenunjang", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-1">
              6. Penatalaksanaan (Terapi / Pengobatan Medis termasuk Diet &amp; Cairan IV)
            </label>
            <textarea
              rows={5}
              placeholder={"Contoh:\n- IVFD NaCl 0,9% 20 tpm\n- Ceftriaxone 2 x 1 gr IV\n- Ketorolac 3 x 30 mg IV\n- Novorapid 3 x 8 unit SC sebelum makan\n- Diet DM 1700 kkal rendah gula, perawatan luka modern dressing setiap hari"}
              value={formData.penatalaksanaan}
              onChange={(e) => updateField("penatalaksanaan", e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          disabled={currentStep === 1}
          onClick={() => {
            handleSaveDraft();
            setCurrentStep((prev) => Math.max(1, prev - 1));
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 rounded-xl transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        <span className="text-xs font-semibold text-slate-500">
          Langkah {currentStep} dari {STEPS.length}
        </span>

        {currentStep < STEPS.length ? (
          <button
            type="button"
            onClick={() => {
              handleSaveDraft();
              setCurrentStep((prev) => Math.min(STEPS.length, prev + 1));
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            Selanjutnya
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan &amp; Lihat Lembar Pengkajian
          </button>
        )}
      </div>
    </form>
  );
}