"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Printer, MessageCircle, FileWarning } from "lucide-react";
import WhatsAppModal from "@/components/shared/WhatsAppModal";

const STORAGE_KEY = "askep_kmb_pengkajian";

export default function PengkajianResult() {
  const [data, setData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isWaModalOpen, setIsWaModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setData(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Gagal membaca data pengkajian:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Memuat lembar Pengkajian Keperawatan Medikal Bedah...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-4">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Belum Ada Data Pengkajian Tersimpan</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Silakan lengkapi formulir Pengkajian KMB terlebih dahulu untuk mencetak PDF atau mengirim ringkasan ke WhatsApp.
        </p>
        <Link
          href="/pengkajian"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Isi Form Pengkajian
        </Link>
      </div>
    );
  }

  const { mahasiswa, formData } = data;
  const { pola = {}, fisik = {} } = formData;
  const totalGcs =
    (parseInt(fisik.gcsE, 10) || 0) +
    (parseInt(fisik.gcsM, 10) || 0) +
    (parseInt(fisik.gcsV, 10) || 0);

  const kopingGabungan = [
    ...(formData.mekanismeKoping || []).filter((k) => k !== "Lain-lain"),
    ...(formData.mekanismeKopingLain ? [formData.mekanismeKopingLain] : []),
  ].join(", ");

  const buildWhatsAppText = () => {
    let text = `*PENGKAJIAN KEPERAWATAN MEDIKAL BEDAH*\n\n`;
    text += `*1. Identitas Klien:*\n`;
    text += `• Nama: ${formData.namaKlien || "-"} (${formData.jenisKelamin || "-"}, ${formData.usia || "-"})\n`;
    text += `• No. Register: ${formData.noRegister || "-"}\n`;
    text += `• Ruang/Kelas: ${formData.ruangKelas || "-"}\n`;
    text += `• Tgl Masuk / Kaji: ${formData.tglMasuk || "-"} / ${formData.tglPengkajian || "-"}\n`;
    text += `• Diagnosa Medis: ${formData.diagnosaMedis || "-"}\n\n`;

    text += `*2. Keluhan Utama & Riwayat:*\n`;
    text += `• Keluhan Utama: ${formData.keluhanUtama || "-"}\n`;
    text += `• Pencetus / Sifat / Lama: ${formData.faktorPencetus || "-"} (${formData.timbulnyaKeluhan || "-"}, ${formData.lamanyaKeluhan || "-"})\n`;
    text += `• Riwayat Alergi: ${formData.riwayatAlergi || "-"}\n\n`;

    text += `*3. Pemeriksaan Fisik & TTV:*\n`;
    text += `• KU / Kesadaran: ${fisik.keadaanUmum || "-"} / ${fisik.tingkatKesadaran || "-"} (GCS: E${fisik.gcsE}M${fisik.gcsM}V${fisik.gcsV} = ${totalGcs})\n`;
    text += `• TD: ${fisik.td || "-"} mmHg | Nadi: ${fisik.nadi || "-"}x/mnt | RR: ${fisik.rr || "-"}x/mnt | Suhu: ${fisik.suhu || "-"}°C\n`;
    text += `• BB/TB: ${fisik.bbSekarang || "-"} Kg (Sblm: ${fisik.bbSebelumSakit || "-"} Kg) / ${fisik.tb || "-"} cm\n\n`;

    text += `*4. Penunjang & Terapi:*\n`;
    text += `• Data Penunjang: ${formData.dataPenunjang || "-"}\n`;
    text += `• Penatalaksanaan: ${formData.penatalaksanaan || "-"}\n`;

    if (mahasiswa?.isMahasiswa) {
      text += `\n*Mahasiswa Praktikan:*\n`;
      text += `• Nama: ${mahasiswa.namaMhs || "-"} (NIM: ${mahasiswa.nim || "-"})\n`;
      text += `• Ruang/Tgl: ${mahasiswa.ruang || "-"} / ${mahasiswa.tgl || "-"}`;
    }
    return text;
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <Link
            href="/pengkajian"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Pengkajian
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <Home className="w-4 h-4" />
            Alur Askep
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIsWaModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Kirim ke WhatsApp
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            Print / Simpan PDF
          </button>
        </div>
      </div>

      {/* Lembar Dokumen Resmi */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0 text-slate-900 text-xs space-y-6">
        {/* Kop Judul */}
        <div className="border-b-2 border-slate-800 pb-4 text-center">
          <h1 className="text-lg font-bold uppercase tracking-wide">
            FORMAT PENGKAJIAN ASUHAN KEPERAWATAN MEDIKAL BEDAH
          </h1>
          <h2 className="text-sm font-bold uppercase mt-1">
            A. PENGKAJIAN KEPERAWATAN
          </h2>
        </div>

        {/* Info Mahasiswa & Administrasi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-slate-300 pb-4">
          <div className="space-y-1">
            <div className="flex"><span className="w-36 font-semibold">Tanggal Pengkajian</span><span>: {formData.tglPengkajian || "-"}</span></div>
            <div className="flex"><span className="w-36 font-semibold">Tanggal Masuk</span><span>: {formData.tglMasuk || "-"}</span></div>
            <div className="flex"><span className="w-36 font-semibold">Ruang / Kelas</span><span>: {formData.ruangKelas || "-"}</span></div>
            <div className="flex"><span className="w-36 font-semibold">Nomor Register</span><span>: {formData.noRegister || "-"}</span></div>
            <div className="flex"><span className="w-36 font-semibold">Diagnosa Medis</span><span>: {formData.diagnosaMedis || "-"}</span></div>
          </div>

          {mahasiswa?.isMahasiswa && (
            <div className="space-y-1 sm:border-l sm:border-slate-300 sm:pl-6">
              <div className="flex"><span className="w-28 font-semibold">Nama Mhs</span><span>: {mahasiswa.namaMhs || "-"}</span></div>
              <div className="flex"><span className="w-28 font-semibold">NIM</span><span>: {mahasiswa.nim || "-"}</span></div>
              <div className="flex"><span className="w-28 font-semibold">Ruang Praktik</span><span>: {mahasiswa.ruang || "-"}</span></div>
              <div className="flex"><span className="w-28 font-semibold">Tanggal</span><span>: {mahasiswa.tgl || "-"}</span></div>
            </div>
          )}
        </div>

        {/* 1. Identitas Klien */}
        <div>
          <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
            1. Identitas Klien
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5 border-x border-b border-slate-800 p-3">
            <div className="flex"><span className="w-40 font-semibold">Nama Klien</span><span>: {formData.namaKlien || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Pendidikan</span><span>: {formData.pendidikan || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Jenis Kelamin</span><span>: {formData.jenisKelamin || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Bahasa Digunakan</span><span>: {formData.bahasa || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Usia</span><span>: {formData.usia || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Pekerjaan</span><span>: {formData.pekerjaan || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Status Perkawinan</span><span>: {formData.statusPerkawinan || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Sumber Biaya</span><span>: {formData.sumberBiaya || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Agama / Suku</span><span>: {formData.agama || "-"} / {formData.sukuBangsa || "-"}</span></div>
            <div className="flex"><span className="w-40 font-semibold">Sumber Informasi</span><span>: {formData.sumberInformasi || "-"}</span></div>
            <div className="flex sm:col-span-2"><span className="w-40 font-semibold shrink-0">Alamat</span><span>: {formData.alamat || "-"}</span></div>
          </div>
        </div>

        {/* 2. Resume */}
        <div>
          <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
            2. Resume
          </h3>
          <div className="border-x border-b border-slate-800 p-3 whitespace-pre-line leading-relaxed">
            {formData.resume || "-"}
          </div>
        </div>

        {/* 3. Riwayat Keperawatan */}
        <div>
          <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
            3. Riwayat Keperawatan
          </h3>
          <div className="border-x border-b border-slate-800 p-3 space-y-3 leading-relaxed">
            <div>
              <p className="font-bold underline">a. Riwayat Kesehatan Sekarang</p>
              <p><span className="font-semibold">1) Keluhan Utama:</span> {formData.keluhanUtama || "-"}</p>
              <p><span className="font-semibold">2) Kronologis Keluhan:</span> Pencetus: {formData.faktorPencetus || "-"} | Timbulnya: {formData.timbulnyaKeluhan || "-"} | Lamanya: {formData.lamanyaKeluhan || "-"}</p>
              <p><span className="font-semibold">Upaya Mengatasi:</span> {formData.upayaMengatasi || "-"}</p>
            </div>

            <div>
              <p className="font-bold underline">b. Riwayat Kesehatan Masa Lalu</p>
              <p><span className="font-semibold">1) Riwayat Alergi:</span> {formData.riwayatAlergi || "-"}</p>
              <p><span className="font-semibold">2) Riwayat Kecelakaan:</span> {formData.riwayatKecelakaan || "-"}</p>
              <p><span className="font-semibold">3) Riwayat Dirawat di RS:</span> {formData.riwayatDirawat || "-"}</p>
              <p><span className="font-semibold">4) Riwayat Pemakaian Obat:</span> {formData.riwayatPemakaianObat || "-"}</p>
            </div>

            <div>
              <p className="font-bold underline">c &amp; d. Riwayat Kesehatan Keluarga (Genogram 3 Generasi &amp; Faktor Risiko)</p>
              <p>{formData.genogramKeterangan || "-"}</p>
              <p><span className="font-semibold">Penyakit Keluarga (Faktor Risiko):</span> {formData.penyakitKeluargaFaktorRisiko || "-"}</p>
            </div>

            <div>
              <p className="font-bold underline">e. Riwayat Psikososial, Spiritual &amp; Lingkungan</p>
              <p><span className="font-semibold">1) Orang Terdekat:</span> {formData.orangTerdekat || "-"}</p>
              <p><span className="font-semibold">2) Interaksi Keluarga:</span> Komunikasi: {formData.polaKomunikasi || "-"} | Keputusan: {formData.pembuatanKeputusan || "-"} | Kemasyarakatan: {formData.kegiatanKemasyarakatan || "-"}</p>
              <p><span className="font-semibold">3) Dampak Penyakit pada Keluarga:</span> {formData.dampakPenyakitKeluarga || "-"}</p>
              <p><span className="font-semibold">4) Masalah Mempengaruhi Klien:</span> {formData.masalahMempengaruhiKlien || "-"}</p>
              <p><span className="font-semibold">5) Mekanisme Koping:</span> {kopingGabungan || "-"}</p>
              <p><span className="font-semibold">6) Persepsi Penyakit:</span> Dipikirkan: {formData.halDipikirkan || "-"} | Harapan: {formData.harapanPerawatan || "-"} | Perubahan: {formData.perubahanSetelahSakit || "-"}</p>
              <p><span className="font-semibold">7) Sistem Nilai Kepercayaan:</span> Nilai bertentangan: {formData.nilaiBertentangan || "-"} | Aktivitas Agama: {formData.aktivitasAgama || "-"}</p>
              <p><span className="font-semibold">8) Kondisi Lingkungan Rumah:</span> {formData.kondisiLingkunganRumah || "-"}</p>
            </div>
          </div>
        </div>

        {/* 9) Tabel Pola Kebiasaan */}
        <div>
          <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
            9) Pola Kebiasaan Sehari-hari
          </h3>
          <table className="w-full border-collapse border border-slate-800 text-[11px]">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-800 p-2 text-left w-4/12">HAL YANG DIKAJI</th>
                <th className="border border-slate-800 p-2 text-left w-4/12">Sebelum Sakit</th>
                <th className="border border-slate-800 p-2 text-left w-4/12">Di Rumah Sakit</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1. Pola Nutrisi — Frekuensi makan", pola.nutrisiFrekSebelum, pola.nutrisiFrekRs],
                ["Nafsu makan & Alasan", pola.nutrisiNafsuSebelum, pola.nutrisiNafsuRs],
                ["Porsi makanan dihabiskan", pola.nutrisiPorsiSebelum, pola.nutrisiPorsiRs],
                ["Makanan tidak disukai / Alergi", `${pola.nutrisiTidakDisukaiSebelum || "-"} / ${pola.nutrisiAlergiSebelum || "-"}`, `${pola.nutrisiTidakDisukaiRs || "-"} / ${pola.nutrisiAlergiRs || "-"}`],
                ["Pantangan / Diet / Obat sblm makan / Alat bantu", `${pola.nutrisiPantanganSebelum || "-"} / ${pola.nutrisiDietSebelum || "-"} / ${pola.nutrisiAlatSebelum || "-"}`, `${pola.nutrisiPantanganRs || "-"} / ${pola.nutrisiDietRs || "-"} / ${pola.nutrisiAlatRs || "-"}`],
                ["2.a. B.A.K (Frekuensi / Warna / Keluhan / Alat bantu)", `${pola.bakFrekSebelum || "-"} | ${pola.bakWarnaSebelum || "-"} | ${pola.bakKeluhanSebelum || "-"} | ${pola.bakAlatSebelum || "-"}`, `${pola.bakFrekRs || "-"} | ${pola.bakWarnaRs || "-"} | ${pola.bakKeluhanRs || "-"} | ${pola.bakAlatRs || "-"}`],
                ["2.b. B.A.B (Frek / Waktu / Warna / Konsistensi / Keluhan / Laxatif)", `${pola.babFrekSebelum || "-"} | ${pola.babWaktuSebelum || "-"} | ${pola.babWarnaSebelum || "-"} | ${pola.babKonsistensiSebelum || "-"}`, `${pola.babFrekRs || "-"} | ${pola.babWaktuRs || "-"} | ${pola.babWarnaRs || "-"} | ${pola.babKonsistensiRs || "-"}`],
                ["3. Personal Hygiene (Mandi / Oral Hygiene / Cuci Rambut)", `${pola.mandiFrekSebelum || "-"} | ${pola.oralFrekSebelum || "-"} | ${pola.rambutFrekSebelum || "-"}`, `${pola.mandiFrekRs || "-"} | ${pola.oralFrekRs || "-"} | ${pola.rambutFrekRs || "-"}`],
                ["4. Istirahat & Tidur (Siang / Malam / Kebiasaan)", `Siang: ${pola.tidurSiangSebelum || "-"}, Malam: ${pola.tidurMalamSebelum || "-"} (${pola.kebiasaanTidurSebelum || "-"})`, `Siang: ${pola.tidurSiangRs || "-"}, Malam: ${pola.tidurMalamRs || "-"} (${pola.kebiasaanTidurRs || "-"})`],
                ["5. Aktivitas & Latihan (Kerja / Olahraga / Keluhan)", `${pola.waktuBekerjaSebelum || "-"} | ${pola.olahragaJenisSebelum || "-"} | ${pola.keluhanAktivitasSebelum || "-"}`, `${pola.waktuBekerjaRs || "-"} | ${pola.olahragaJenisRs || "-"} | ${pola.keluhanAktivitasRs || "-"}`],
                ["6. Kebiasaan Kesehatan (Merokok / NAPZA)", `Rokok: ${pola.merokokFrekSebelum || "-"} | NAPZA: ${pola.napzaFrekSebelum || "-"}`, `Rokok: ${pola.merokokFrekRs || "-"} | NAPZA: ${pola.napzaFrekRs || "-"}`],
              ].map(([label, v1, v2], idx) => (
                <tr key={idx}>
                  <td className="border border-slate-800 p-1.5 font-semibold">{label}</td>
                  <td className="border border-slate-800 p-1.5">{v1 || "-"}</td>
                  <td className="border border-slate-800 p-1.5">{v2 || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. Pengkajian Fisik */}
        <div>
          <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
            4. Pengkajian Fisik (12 Sistem Tubuh)
          </h3>
          <div className="border-x border-b border-slate-800 p-3 space-y-2.5 leading-relaxed">
            <p><span className="font-bold">a. Pemeriksaan Fisik Umum:</span> BB: {fisik.bbSekarang || "-"} Kg (Sblm sakit: {fisik.bbSebelumSakit || "-"} Kg), TB: {fisik.tb || "-"} cm, TD: {fisik.td || "-"} mmHg, Nadi: {fisik.nadi || "-"} x/mnt, RR: {fisik.rr || "-"} x/mnt, Suhu: {fisik.suhu || "-"} °C, KU: {fisik.keadaanUmum || "-"}, Pembesaran KGB: {fisik.pembesaranKgb || "-"} ({fisik.lokasiKgb || "-"}).</p>
            <p><span className="font-bold">b. Sistem Penglihatan:</span> Sisi mata {fisik.sisiMata}, kelopak {fisik.kelopakMata}, pergerakan {fisik.pergerakanBolaMata}, konjungtiva {fisik.konjungtiva}, kornea {fisik.kornea}, sklera {fisik.sklera}, pupil {fisik.pupil}, otot mata {fisik.ototMata}, fungsi {fisik.fungsiPenglihatan}, reaksi cahaya {fisik.reaksiCahaya}, kacamata/lensa: {fisik.pemakaianKacamata}.</p>
            <p><span className="font-bold">c. Sistem Pendengaran:</span> Daun telinga {fisik.daunTelinga}, serumen {fisik.serumen || "-"}, telinga tengah {fisik.telingaTengah}, cairan {fisik.cairanTelinga}, tinitus {fisik.tinitus}, fungsi {fisik.fungsiPendengaran}, keseimbangan {fisik.gangguanKeseimbangan}, alat bantu: {fisik.alatBantuDengar}.</p>
            <p><span className="font-bold">d. Sistem Wicara:</span> {fisik.sistemWicara}.</p>
            <p><span className="font-bold">e. Sistem Pernafasan:</span> Jalan nafas {fisik.jalanNafas}, {fisik.pernafasan}, otot bantu {fisik.ototBantuNafas}, irama {fisik.iramaNafas}, jenis {fisik.jenisPernafasan}, kedalaman {fisik.kedalamanNafas}, batuk {fisik.batuk}, sputum {fisik.sputum}, palpasi {fisik.palpasiDada}, perkusi {fisik.perkusiDada}, suara nafas {fisik.suaraNafas}, alat bantu: {fisik.alatBantuNafas}.</p>
            <p><span className="font-bold">f. Sistem Kardiovaskuler:</span> Denyut nadi {fisik.denyutNadi}, distensi JVP {fisik.distensiJvpKanan}, kulit {fisik.temperaturKulitKardio}, CRT {fisik.crt} detik, edema {fisik.edema}, bunyi jantung {fisik.kelainanBunyiJantung}, sakit dada {fisik.sakitDada}.</p>
            <p><span className="font-bold">g. Sistem Hematologi:</span> {fisik.hematoPerdarahan}.</p>
            <p><span className="font-bold">h. Sistem Syaraf Pusat:</span> Sakit kepala: {fisik.keluhanSakitKepala}, Kesadaran: {fisik.tingkatKesadaran}, GCS: E{fisik.gcsE} M{fisik.gcsM} V{fisik.gcsV} (Total {totalGcs}), tanda TIK: {fisik.tandaTik}, gangguan syaraf: {fisik.gangguanPersyarafan}, reflek: {fisik.reflekFisiologis}.</p>
            <p><span className="font-bold">i. Sistem Pencernaan:</span> Mulut/gigi: {fisik.gigi}, muntah: {fisik.muntah}, nyeri perut: {fisik.nyeriPerut}, bising usus: {fisik.bisingUsus || "-"}, diare: {fisik.diare}, konstipasi: {fisik.konstipasi}, hepar: {fisik.hepar}, abdomen: {fisik.abdomen}.</p>
            <p><span className="font-bold">j. Sistem Endokrin:</span> Tiroid: {fisik.pembesaranTiroid}, keton/trias DM: {fisik.nafasKeton}, luka gangren: {fisik.lukaGangren}.</p>
            <p><span className="font-bold">k. Sistem Urogenital:</span> Balance cairan Intake {fisik.intakeCairan || "-"} / Output {fisik.outputCairan || "-"}, pola kemih &amp; warna: {fisik.warnaBak}, distensi/nyeri pinggang: {fisik.distensiKandungKemih}.</p>
            <p><span className="font-bold">l. Sistem Integumen:</span> Turgor {fisik.turgorKulit}, keadaan kulit: {fisik.keadaanKulit}, area infus: {fisik.kondisiAreaInfus}, rambut: {fisik.kebersihanRambut}.</p>
            <p><span className="font-bold">m. Sistem Muskuloskeletal:</span> Pergerakan: {fisik.kesulitanPergerakan}, fraktur: {fisik.fraktur}, tulang belakang: {fisik.kelainanTulangBelakang}, tonus otot: {fisik.tonusOtot}, kekuatan otot: <span className="font-mono whitespace-pre-line">{fisik.kekuatanOtot}</span>.</p>
          </div>
        </div>

        {/* Data Tambahan, Penunjang, Penatalaksanaan */}
        <div className="space-y-4">
          <div>
            <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
              Data Tambahan (Pemahaman tentang Penyakit)
            </h3>
            <div className="border-x border-b border-slate-800 p-3 whitespace-pre-line leading-relaxed">
              {formData.pemahamanPenyakit || "-"}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
              5. Data Penunjang (Lab, Radiologi, Endoskopi, dll)
            </h3>
            <div className="border-x border-b border-slate-800 p-3 whitespace-pre-line leading-relaxed">
              {formData.dataPenunjang || "-"}
            </div>
          </div>

          <div>
            <h3 className="font-bold uppercase bg-slate-100 px-3 py-1.5 border border-slate-800">
              6. Penatalaksanaan (Terapi / Pengobatan termasuk Diet)
            </h3>
            <div className="border-x border-b border-slate-800 p-3 whitespace-pre-line leading-relaxed">
              {formData.penatalaksanaan || "-"}
            </div>
          </div>
        </div>

        {/* Blok Tanda Tangan Mahasiswa */}
        {mahasiswa?.isMahasiswa && (
          <div className="mt-10 flex justify-end text-xs">
            <div className="w-64 text-center">
              <p>
                {mahasiswa.ruang || "Ruang Praktik"}, {mahasiswa.tgl || "-"}
              </p>
              <p className="mt-1">Mahasiswa Praktikan,</p>
              <div className="h-16" />
              <p className="font-bold underline">{mahasiswa.namaMhs || "_____________________"}</p>
              <p className="mt-0.5">NIM. {mahasiswa.nim || "_____________"}</p>
            </div>
          </div>
        )}
      </div>

      <WhatsAppModal
        isOpen={isWaModalOpen}
        onClose={() => setIsWaModalOpen(false)}
        messageText={buildWhatsAppText()}
        title="Kirim Pengkajian KMB ke WhatsApp"
      />
    </div>
  );
}