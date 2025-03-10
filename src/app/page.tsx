'use client'
import CountriesStatus from "../app/components/countries-status"
import BrazilStatesStatus from "../app/components/brazil-states-status"
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("Paises");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => handleTabChange("Paises")}
        className={`px-4 py-2 mr-2 ${activeTab === "Paises" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        Paises
      </button>
      <button
        onClick={() => handleTabChange("brazil-states")}
        className={`px-4 py-2 ${activeTab === "brazil-states" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
      >
        Escolha o País
      </button>

      <div className="mt-4">
        {activeTab === "Paises" && <CountriesStatus />}
        {activeTab === "Estados Do Brasil" && <BrazilStatesStatus />}
      </div>
    </div>
  );
}

