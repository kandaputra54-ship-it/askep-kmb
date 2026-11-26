import DataFokusResult from "@/components/data-fokus/DataFokusResult";

export const metadata = {
  title: "Hasil Data Fokus - Askep Medikal Bedah",
  description: "Lembar cetak dan ekspor PDF/WhatsApp Data Fokus Askep Medikal Bedah",
};

export default function DataFokusHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <DataFokusResult />
      </div>
    </main>
  );
}