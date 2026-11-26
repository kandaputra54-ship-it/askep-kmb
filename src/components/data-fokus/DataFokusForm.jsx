"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, Save, Eye, UserCheck, ClipboardList } from "lucide-react";
import IdentitasMahasiswa from "@/components/shared/IdentitasMahasiswa";

const STORAGE_KEY = "askep_kmb_data_fokus";

export default function DataFokusForm() {
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

  const [dataSubyektif, setDataSubyektif] = useState([{ id: 1, teks: "" }]);
  const [dataObyektif, setDataObyektif] = useState([{ id: 1, teks: "" }]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMahasiswa((prev) => ({ ...prev, tgl: prev.tgl || today }));

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
        if (Array.isArray(parsed.dataSubyektif) && parsed.dataSubyektif.length > 0) {
          setDataSubyektif(parsed.dataSubyektif);
        }
        if (Array.isArray(parsed.dataObyektif) && parsed.dataObyektif.length > 0) {
          setDataObyektif(parsed.dataObyektif);
        }
      }
    } catch (err) {
      console.error("Gagal memuat data tersimpan:", err);
    }
  }, []);

  const addDs = () => {
    setDataSubyektif((prev) => [...prev, { id: Date.now(), teks: "" }]);
  };

  const removeDs = (id) => {
    if (dataSubyektif.length <= 1) return;
    setDataSubyektif((prev) => prev.filter((item) => item.id !== id));
  };

  const updateDs = (id, value) => {
    setDataSubyektif((prev) =>
      prev.map((item) => (item.id === id ? { ...item, teks: value } : item))
    );
  };

  const addDo = () => {
    setDataObyektif((prev) => [...prev, { id: Date.now(), teks: "" }]);
  };

  const removeDo = (id) => {
    if (dataObyektif.length <= 1) return;
    setDataObyektif((prev) => prev.filter((item) => item.id !== id));
  };

  const updateDo = (id, value) => {
    setDataObyektif((prev) =>
      prev.map((item) => (item.id === id ? { ...item, teks: value } : item))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      mahasiswa,
      pasien,
      dataSubyektif,
      dataObyektif,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/data-fokus/hasil");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              7. Data Fokus Keperawatan
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Kelompokkan keluhan klien (Data Subyektif) dan hasil pemeriksaan/observasi perawat (Data Obyektif).
            </p>
          </div>
          <Link
            href="/data-fokus/hasil"
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

      {/* Tabel Data Subyektif & Data Obyektif */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-6">
          <ClipboardList className="w-5 h-5 text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">Pengelompokan Data Fokus</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Kolom Kiri: Data Subyektif */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Data Subyektif (DS)</h3>
                <p className="text-xs text-slate-500">Keluhan yang diucapkan klien/keluarga</p>
              </div>
              <button
                type="button"
                onClick={addDs}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah DS
              </button>
            </div>

            <div className="space-y-3">
              {dataSubyektif.map((item, idx) => (
                <div key={item.id} className="flex items-start gap-2">
                  <span className="mt-2 text-xs font-bold text-slate-400 w-5">
                    {idx + 1}.
                  </span>
                  <textarea
                    rows={2}
                    placeholder='Contoh: Klien mengatakan nyeri pada luka kaki kanan skala 6 (0-10)...'
                    value={item.teks}
                    onChange={(e) => updateDs(item.id, e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {dataSubyektif.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDs(item.id)}
                      title="Hapus baris"
                      className="mt-1.5 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Kolom Kanan: Data Obyektif */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Data Obyektif (DO)</h3>
                <p className="text-xs text-slate-500">Hasil TTV, pemeriksaan fisik, & penunjang</p>
              </div>
              <button
                type="button"
                onClick={addDo}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah DO
              </button>
            </div>

            <div className="space-y-3">
              {dataObyektif.map((item, idx) => (
                <div key={item.id} className="flex items-start gap-2">
                  <span className="mt-2 text-xs font-bold text-slate-400 w-5">
                    {idx + 1}.
                  </span>
                  <textarea
                    rows={2}
                    placeholder="Contoh: TD 140/90 mmHg, Nadi 92x/menit, GDS 285 mg/dL, tampak meringis..."
                    value={item.teks}
                    onChange={(e) => updateDo(item.id, e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                  {dataObyektif.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDo(item.id)}
                      title="Hapus baris"
                      className="mt-1.5 p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
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