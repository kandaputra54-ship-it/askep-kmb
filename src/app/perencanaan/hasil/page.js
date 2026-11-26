import PerencanaanResult from "@/components/perencanaan/PerencanaanResult";

export const metadata = {
  title: "Hasil Perencanaan Keperawatan - Askep Medikal Bedah",
  description: "Lembar cetak dan ekspor PDF/WhatsApp Perencanaan Keperawatan Askep Medikal Bedah",
};

export default function PerencanaanHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <PerencanaanResult />
      </div>
    </main>
  );
}