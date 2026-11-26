import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import EvaluasiForm from "@/components/evaluasi/EvaluasiForm";

export const metadata = {
  title: "Evaluasi Hasil (SOAP) - Askep Medikal Bedah",
  description: "Formulir Evaluasi Keperawatan SOAP (Subyektif, Obyektif, Analisa, Planning)",
};

export default function EvaluasiPage() {
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
            <CheckCircle2 className="w-3.5 h-3.5" />
            Bagian E • Evaluasi Hasil SOAP (KMB)
          </span>
        </div>

        <EvaluasiForm />
      </div>
    </main>
  );
}