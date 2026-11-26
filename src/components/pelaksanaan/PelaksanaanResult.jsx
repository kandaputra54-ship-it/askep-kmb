"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Home, Printer, MessageCircle, FileWarning } from "lucide-react";
import WhatsAppModal from "@/components/shared/WhatsAppModal";

const STORAGE_KEY = "askep_kmb_pelaksanaan";

export default function PelaksanaanResult() {
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
      console.error("Gagal membaca data:", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Memuat lembar Pelaksanaan Keperawatan...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center space-y-4">
        <FileWarning className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-lg font-bold text-slate-900">Belum Ada Catatan Keperawatan Tersimpan</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Silakan isi formulir Pelaksanaan Keperawatan terlebih dahulu untuk mencetak atau mengirim laporan via WhatsApp.
        </p>
        <Link
          href="/pelaksanaan"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Isi Form Pelaksanaan
        </Link>
      </div>
    );
  }

  const { mahasiswa, pasien, rows = [] } = data;

  const buildWhatsAppText = () => {
    let text = `*PELAKSANAAN KEPERAWATAN (CATATAN KEPERAWATAN)*\n\n`;
    text += `*Identitas Klien:*\n`;
    text += `• Nama: ${pasien?.namaKlien || "-"}\n`;
    text += `• Usia: ${pasien?.usia || "-"}\n`;
    text += `• No. Register: ${pasien?.noRegister || "-"}\n`;
    text += `• Ruang/Kelas: ${pasien?.ruangKelas || "-"}\n`;
    text += `• Diagnosa Medis: ${pasien?.diagnosaMedis || "-"}\n\n`;

    text += `*CATATAN TINDAKAN & HASIL:*\n`;
    rows.forEach((row) => {
      text += `\n*[${row.tgl || "-"} | ${row.waktu || "-"} | No. DK: ${row.noDk || "-"}]*\n`;
      text += `${row.tindakanHasil || "-"}\n`;
      text += `• Paraf/Nama: ${row.parafNama || mahasiswa?.namaMhs || "-"}\n`;
    });

    if (mahasiswa?.isMahasiswa) {
      text += `\n*Mahasiswa Praktikan:*\n`;
      text += `• Nama: ${mahasiswa.namaMhs || "-"}\n`;
      text += `• NIM: ${mahasiswa.nim || "-"}\n`;
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
            href="/pelaksanaan"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Edit Form
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
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 sm:p-10 print:border-none print:shadow-none print:p-0 text-slate-900">
        {/* Kop Judul */}
        <div className="border-b-2 border-slate-800 pb-4 mb-6 text-center">
          <h1 className="text-lg font-bold uppercase tracking-wide">
            ASUHAN KEPERAWATAN MEDIKAL BEDAH
          </h1>
          <h2 className="text-base font-bold uppercase mt-1">
            D. PELAKSANAAN KEPERAWATAN (CATATAN KEPERAWATAN)
          </h2>
        </div>

        {/* Grid Identitas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 text-xs">
          <div className="space-y-1.5">
            <div className="flex">
              <span className="w-32 font-semibold">Nama Klien</span>
              <span>: {pasien?.namaKlien || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">Usia</span>
              <span>: {pasien?.usia || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">Nomor Register</span>
              <span>: {pasien?.noRegister || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">Ruang / Kelas</span>
              <span>: {pasien?.ruangKelas || "-"}</span>
            </div>
            <div className="flex">
              <span className="w-32 font-semibold">Diagnosa Medis</span>
              <span>: {pasien?.diagnosaMedis || "-"}</span>
            </div>
          </div>

          {mahasiswa?.isMahasiswa && (
            <div className="space-y-1.5 sm:border-l sm:border-slate-300 sm:pl-6">
              <div className="flex">
                <span className="w-28 font-semibold">Nama Mhs</span>
                <span>: {mahasiswa.namaMhs || "-"}</span>
              </div>
              <div className="flex">
                <span className="w-28 font-semibold">NIM</span>
                <span>: {mahasiswa.nim || "-"}</span>
              </div>
              <div className="flex">
                <span className="w-28 font-semibold">Ruang Praktik</span>
                <span>: {mahasiswa.ruang || "-"}</span>
              </div>
              <div className="flex">
                <span className="w-28 font-semibold">Tanggal</span>
                <span>: {mahasiswa.tgl || "-"}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tabel Pelaksanaan Keperawatan (4 Kolom sesuai PDF) */}
        <table className="w-full border-collapse border border-slate-800 text-xs">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-800 p-2.5 text-center font-bold w-28">
                Tgl. / Waktu
              </th>
              <th className="border border-slate-800 p-2.5 text-center font-bold w-16">
                No. DK.
              </th>
              <th className="border border-slate-800 p-2.5 text-center font-bold">
                Tindakan Keperawatan dan Hasil
              </th>
              <th className="border border-slate-800 p-2.5 text-center font-bold w-32">
                Paraf dan Nama Jelas
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td className="border border-slate-800 p-2.5 text-center align-top">
                  <div className="font-semibold">{row.tgl || "-"}</div>
                  <div className="text-slate-600 mt-0.5">{row.waktu ? `${row.waktu} WIB` : ""}</div>
                </td>
                <td className="border border-slate-800 p-2.5 text-center align-top font-semibold">
                  {row.noDk || "-"}
                </td>
                <td className="border border-slate-800 p-2.5 align-top whitespace-pre-line leading-relaxed">
                  {row.tindakanHasil || "-"}
                </td>
                <td className="border border-slate-800 p-2.5 text-center align-top">
                  <div className="h-8" />
                  <span className="font-medium">
                    {row.parafNama || mahasiswa?.namaMhs || "-"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
        title="Kirim Catatan Keperawatan ke WhatsApp"
      />
    </div>
  );
}