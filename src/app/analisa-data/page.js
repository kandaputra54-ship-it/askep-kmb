import Link from "next/link";
import { ArrowLeft, GitMerge } from "lucide-react";
import AnalisaDataForm from "@/components/analisa-data/AnalisaDataForm";

export const metadata = {
  title: "Analisa Data - Askep Medikal Bedah",
  description: "Formulir Analisa Data Keperawatan (DS, DO, Masalah, dan Etiologi)",
};

export default function AnalisaDataPage() {
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
            <GitMerge className="w-3.5 h-3.5" />
            Tahap 8 • Analisa Data (KMB)
          </span>
        </div>

        <AnalisaDataForm />
      </div>
    </main>
  );
}