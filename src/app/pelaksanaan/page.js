import Link from "next/link";
import { ArrowLeft, Activity } from "lucide-react";
import PelaksanaanForm from "@/components/pelaksanaan/PelaksanaanForm";

export const metadata = {
  title: "Pelaksanaan Keperawatan - Askep Medikal Bedah",
  description: "Formulir Pelaksanaan / Catatan Tindakan Keperawatan dan Respon Hasil",
};

export default function PelaksanaanPage() {
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
            <Activity className="w-3.5 h-3.5" />
            Bagian D • Pelaksanaan Keperawatan (KMB)
          </span>
        </div>

        <PelaksanaanForm />
      </div>
    </main>
  );
}