import PelaksanaanResult from "@/components/pelaksanaan/PelaksanaanResult";

export const metadata = {
  title: "Hasil Pelaksanaan Keperawatan - Askep Medikal Bedah",
  description: "Lembar cetak dan ekspor PDF/WhatsApp Catatan Keperawatan Askep Medikal Bedah",
};

export default function PelaksanaanHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <PelaksanaanResult />
      </div>
    </main>
  );
}