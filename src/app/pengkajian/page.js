import Link from "next/link";
import { ArrowLeft, ClipboardList } from "lucide-react";
import PengkajianForm from "@/components/pengkajian/PengkajianForm";

export const metadata = {
  title: "Pengkajian Keperawatan Medikal Bedah - Askep KMB",
  description: "Format Pengkajian Komprehensif Asuhan Keperawatan Medikal Bedah (12 Sistem Tubuh)",
};

export default function PengkajianPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Alur Askep
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
            <ClipboardList className="w-3.5 h-3.5" />
            Bagian A • Pengkajian Komprehensif (KMB)
          </span>
        </div>

        <PengkajianForm />
      </div>
    </main>
  );
}