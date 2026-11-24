import React from "react";
import { MapPin, Phone, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-emerald-50/70 border-t border-emerald-100 text-slate-600 text-xs mt-10">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Kolom 1: Brand & Deskripsi */}
        <div className="space-y-3 lg:col-span-5 pr-0 lg:pr-8">
          <a
            href="#"
            className="flex items-center space-x-2 text-lg font-bold text-slate-900 w-fit"
          >
            <img
              src="/logo.webp"
              alt="Logo Askep KMB"
              className="w-7 h-7 object-contain"
            />
            <span>
              Askep<span className="text-emerald-600">KMB</span>
            </span>
          </a>
          <p className="text-slate-500 leading-relaxed">
            Sistem informasi dokumentasi dan panduan klinis Asuhan Keperawatan
            Medikal Bedah terstandar. Mencakup pengkajian sistemik B1–B6,
            penegakan diagnosa SDKI, luaran SLKI, intervensi SIKI, serta
            manajemen perawatan pasien penyakit dalam dan perioperatif.
          </p>
        </div>

        {/* Kolom 2: Navigasi Utama */}
        <div className="lg:col-span-2">
          <h4 className="font-bold text-slate-900 mb-3 text-sm">Navigasi</h4>
          <ul className="space-y-2 text-slate-500">
            <li>
              <a href="#" className="hover:text-emerald-600 transition">
                Beranda
              </a>
            </li>
            <li>
              <a href="#sistem" className="hover:text-emerald-600 transition">
                Sistem Tubuh
              </a>
            </li>
            <li>
              <a href="#alur" className="hover:text-emerald-600 transition">
                Alur Dokumentasi
              </a>
            </li>
            <li>
              <a
                href="#perioperatif"
                className="hover:text-emerald-600 transition"
              >
                Perioperatif
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Standar Klinis */}
        <div className="lg:col-span-2">
          <h4 className="font-bold text-slate-900 mb-3 text-sm">
            Standar Klinis
          </h4>
          <ul className="space-y-2 text-slate-500">
            <li>Pengkajian B1–B6</li>
            <li>Diagnosa SDKI</li>
            <li>Luaran SLKI & Intervensi SIKI</li>
          </ul>
        </div>

        {/* Kolom 4: Kontak & Alamat */}
        <div className="lg:col-span-3">
          <h4 className="font-bold text-slate-900 mb-3 text-sm">
            Hubungi Kami
          </h4>
          <ul className="space-y-2.5 text-slate-500">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span>Kampus B : JL.Alternatif Cibubur KM.1</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>021-845290</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>www.akperberkala.ac.id</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Baris Copyright */}
      <div className="bg-emerald-700 text-emerald-50 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <span>© 2026 Askep KMB. Hak Cipta Dilindungi.</span>
            <span className="hidden sm:inline text-emerald-300/60">|</span>
            <span className="text-emerald-100 font-medium">AKPER BWH 2026</span>
          </div>
          <span>Keperawatan Medikal Bedah Terpadu</span>
        </div>
      </div>
    </footer>
  );
}
