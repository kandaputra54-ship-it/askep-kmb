import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import DataFokusForm from "@/components/data-fokus/DataFokusForm";

export const metadata = {
  title: "Data Fokus - Askep Medikal Bedah",
  description: "Formulir pengelompokan Data Subyektif dan Data Obyektif Keperawatan Medikal Bedah",
};

export default function DataFokusPage() {
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
            <FileText className="w-3.5 h-3.5" />
            Tahap 7 • Data Fokus (KMB)
          </span>
        </div>

        <DataFokusForm />
      </div>
    </main>
  );
}