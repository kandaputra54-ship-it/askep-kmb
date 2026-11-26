import PengkajianResult from "@/components/pengkajian/PengkajianResult";

export const metadata = {
  title: "Hasil Pengkajian KMB - Askep Medikal Bedah",
  description: "Lembar cetak dan ekspor PDF/WhatsApp Pengkajian Asuhan Keperawatan Medikal Bedah",
};

export default function PengkajianHasilPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 print:bg-white print:py-0 print:px-0">
      <div className="max-w-5xl mx-auto">
        <PengkajianResult />
      </div>
    </main>
  );
}