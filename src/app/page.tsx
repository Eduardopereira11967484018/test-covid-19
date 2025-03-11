"use client"

import { useState } from "react"
import BrazilStatesStatus from "@/app/components/brazil-states-status"
import BrazilDateStatus from "@/app/components/brazil-date-status"
import CountriesStatus from "@/app/components/countries-status"
import CovidDataForm from "@/app/components/covid-data-form"
import FormSubmissions from "@/app/components/form-submissions"

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("brazil-states")

  return (
    <main className="max-w-5xl mx-auto py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Painel de Dados COVID-19 Brasil</h1>

      <div className="mb-6">
        <div className="flex flex-wrap border-b">
          <button
            className={`px-3 py-2 ${activeTab === "brazil-states" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
            onClick={() => setActiveTab("brazil-states")}
          >
            Estados Brasileiros
          </button>
          <button
            className={`px-3 py-2 ${activeTab === "brazil-date" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
            onClick={() => setActiveTab("brazil-date")}
          >
           Brasil por data
          </button>
          <button
            className={`px-3 py-2 ${activeTab === "countries" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
            onClick={() => setActiveTab("countries")}
          >
            
            Países
          </button>
          <button
            className={`px-3 py-2 ${activeTab === "form" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
            onClick={() => setActiveTab("form")}
          >
          Formulário de dados
          </button>
          <button
            className={`px-3 py-2 ${activeTab === "submissions" ? "border-b-2 border-blue-500 font-medium" : "text-gray-500"}`}
            onClick={() => setActiveTab("submissions")}
          >
           Atualizações
          </button>
        </div>
      </div>

      <div>
        {activeTab === "brazil-states" && <BrazilStatesStatus />}
        {activeTab === "brazil-date" && <BrazilDateStatus />}
        {activeTab === "countries" && <CountriesStatus />}
        {activeTab === "form" && <CovidDataForm />}
        {activeTab === "submissions" && <FormSubmissions />}
      </div>
    </main>
  )
}