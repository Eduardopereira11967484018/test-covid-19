'use client'
import CountriesStatus from "../app/components/countries-status"
import { useState } from 'react';

export default function Home() {
  const [activeTab] = useState("countries");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
       {activeTab === "countries" && <CountriesStatus />}
    </div>
  );
}
