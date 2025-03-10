'use client'
import CountriesStatus from "@/app/components/countries-status";
import BrazilStatesStatus from "@/app/components/brazil-states-status";
import CovidDataForm from "@/app/components/covid-data-form"; // Verifique se esse componente existe
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState("countries");
  
  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => setActiveTab("countries")}
        className={`px-4 py-2 mr-2 ${activeTab === "countries" ? "bg-gray-600 text-gray-300" : "bg-gray-300"}`}
      >
        Países
      </button>
      <button
        onClick={() => setActiveTab("brazil-states")}
        className={`px-4 py-2 mr-2 ${activeTab === "brazil-states" ? "bg-gray-600 text-gray-300" : "bg-gray-300"}`}
      >
        Estados Brasileiros
      </button>
      <button
        onClick={() => setActiveTab("form")}
        className={`px-4 py-2 ${activeTab === "form" ? "bg-gray-600 text-gray-300" : "bg-gray-300"}`}
      >
        Formulário de Dados
      </button>

      <div className="mt-4">
        {activeTab === "countries" && <CountriesStatus />}
        {activeTab === "brazil-states" && <BrazilStatesStatus />}
        {activeTab === "form" && <CovidDataForm />}
      </div>
    </div>
  );
}
