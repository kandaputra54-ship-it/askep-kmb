import React from "react";
import { Phone } from "lucide-react";

export default function KontakSection() {
  return (
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
          <p className="font-medium">• Pemantauan TTV & Balance Cairan 24 Jam</p>
          <p className="font-medium">• Evaluasi Perkembangan SOAP Harian</p>
        </div>
      </div>
    </section>
  );
}