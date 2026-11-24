import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SistemTubuhSection from "../components/SistemTubuhSection";
import AlurDokumentasiSection from "../components/AlurDokumentasiSection";
import PemantauanKlinisSection from "../components/PemantauanKlinisSection";
import PerioperatifSection from "../components/PerioperatifSection";
import KontakSection from "../components/KontakSection";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />
      <main>
        <Hero />
        <SistemTubuhSection />
        <AlurDokumentasiSection />
        <PemantauanKlinisSection />
        <PerioperatifSection />
        <KontakSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}