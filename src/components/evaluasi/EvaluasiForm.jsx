"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Save, Eye, UserCheck, CheckCircle2 } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_kmb_evaluasi";

export default function EvaluasiForm() {
  const router = useRouter();

  const [mahasiswa, setMahasiswa] = useState({
    isMahasiswa: true,
    namaMhs: "",
    nim: "",
    ruang: "",
    tgl: "",
  });

  const [pasien, setPasien] = useState({
    namaKlien: "",
    usia: "",
    noRegister: "",
    ruangKelas: "",
    diagnosaMedis: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      noDk: "1",
      hari: "",
      tgl: "",
      jam: "14:00",
      s: "",
      o: "",
      a: "",
      p: "",
      parafNama: "",
    },
  ]);

  useEffect(() => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const todayName = days[now.getDay()];

    setMahasiswa((prev) => ({ ...prev, tgl: prev.tgl || today }));
    setRows((prev) =>
      prev.map((row) => ({
        ...row,
        hari: row.hari || todayName,
        tgl: row.tgl || today,
      }))
    );

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
        if (parsed.pasien) setPasien(parsed.pasien);
        if (Array.isArray(parsed.rows) && parsed.rows.length > 0) {
          setRows(parsed.rows);
        }
      }
    } catch (err) {
      console.error("Gagal memuat data tersimpan:", err);
    }
  }, []);

  const addRow = () => {
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const currentTime = now.toTimeString().slice(0, 5);
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const todayName = days[now.getDay()];

    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        noDk: String(prev.length + 1),
        hari: todayName,
        tgl: today,
        jam: currentTime,
        s: "",
        o: "",
        a: "",
        p: "",
        parafNama: mahasiswa.namaMhs || "",
      },
    ]);
  };

  const removeRow = (id) => {
    if (rows.length <= 1) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      pasien,
      rows,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/evaluasi/hasil");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              E. Evaluasi Hasil Keperawatan (SOAP)
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Evaluasi perkembangan kondisi klien mengacu pada tujuan dan kriteria hasil menggunakan format SOAP.
            </p>
          </div>
          <Link
            href="/evaluasi/hasil"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
          >
            <Eye className="w-4 h-4" />
            Lihat Hasil Tersimpan
          </Link>
        </div>
      </div>

      {/* Identitas Mahasiswa */}
      <IdentitasMahasiswa data={mahasiswa} onChange={setMahasiswa} />

      {/* Identitas Ringkas Klien */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Identitas Singkat Klien</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Klien (Inisial / Lengkap) *
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Tn. A"
              value={pasien.namaKlien}
              onChange={(e) => setPasien({ ...pasien, namaKlien: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Usia
            </label>
            <input
              type="text"
              placeholder="Contoh: 54 Tahun"
              value={pasien.usia}
              onChange={(e) => setPasien({ ...pasien, usia: e.target.value })}
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
              value={pasien.noRegister}
              onChange={(e) => setPasien({ ...pasien, noRegister: e.target.value })}
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
              value={pasien.ruangKelas}
              onChange={(e) => setPasien({ ...pasien, ruangKelas: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Diagnosa Medis
            </label>
            <input
              type="text"
              placeholder="Contoh: Diabetes Melitus Tipe II + Ulkus Pedis"
              value={pasien.diagnosaMedis}
              onChange={(e) => setPasien({ ...pasien, diagnosaMedis: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Daftar Evaluasi SOAP */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900">
              Catatan Evaluasi SOAP ({rows.length} Evaluasi)
            </h2>
          </div>
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Evaluasi SOAP
          </button>
        </div>

        <div className="space-y-6">
          {rows.map((row, index) => (
            <div
              key={row.id}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:border-blue-200 transition space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-800">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center">
                    {index + 1}
                  </span>
                  Evaluasi Perkembangan #{index + 1}
                </span>
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Hapus
                  </button>
                )}
              </div>

              {/* Meta: No DK, Hari, Tanggal, Jam, Paraf */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    No. DK. *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: 1"
                    value={row.noDk}
                    onChange={(e) => updateRow(row.id, "noDk", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hari *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kamis"
                    value={row.hari}
                    onChange={(e) => updateRow(row.id, "hari", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tanggal *
                  </label>
                  <input
                    type="date"
                    required
                    value={row.tgl}
                    onChange={(e) => updateRow(row.id, "tgl", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jam (WIB) *
                  </label>
                  <input
                    type="time"
                    required
                    value={row.jam}
                    onChange={(e) => updateRow(row.id, "jam", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Paraf &amp; Nama Jelas
                  </label>
                  <input
                    type="text"
                    placeholder={mahasiswa.namaMhs || "Nama terang"}
                    value={row.parafNama}
                    onChange={(e) => updateRow(row.id, "parafNama", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Grid SOAP */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    S (Subyektif) — Keluhan / Respon Verbal Klien *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Contoh: Klien mengatakan nyeri pada kaki kanan sudah berkurang menjadi skala 3 (0-10) dan dapat tidur nyenyak semalam."
                    value={row.s}
                    onChange={(e) => updateRow(row.id, "s", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    O (Obyektif) — Hasil Observasi &amp; Pengukuran *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Contoh: Klien tampak lebih rileks, meringis berkurang, TD: 120/80 mmHg, Nadi: 82x/menit, RR: 20x/menit, Suhu: 36,6°C."
                    value={row.o}
                    onChange={(e) => updateRow(row.id, "o", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    A (Analisa / Assessment) — Status Masalah Keperawatan *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Contoh: Masalah Nyeri Akut teratasi sebagian."
                    value={row.a}
                    onChange={(e) => updateRow(row.id, "a", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    P (Planning) — Rencana Tindak Lanjut *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Contoh: Intervensi Manajemen Nyeri dilanjutkan (monitor skala nyeri, anjurkan relaksasi napas dalam, kolaborasi analgetik)."
                    value={row.p}
                    onChange={(e) => updateRow(row.id, "p", e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tombol Tambah & Simpan */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={addRow}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Baris Evaluasi SOAP
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition cursor-pointer"
          >
            <Save className="w-4 h-4" />
            Simpan & Lihat Lembar Cetak
          </button>
        </div>
      </div>
    </form>
  );
}