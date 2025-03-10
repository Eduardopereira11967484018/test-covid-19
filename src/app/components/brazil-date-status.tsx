"use client"

import type React from "react"
import { useState } from "react"
import { type StateData, getStatesByDate } from "@/app/sevices/api"

// Componente que gerencia o status dos estados do Brasil por data
export default function BrazilDateStatus() { 
  const [date, setDate] = useState<string>("")
  const [statesData, setStatesData] = useState<StateData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  //mudança de data no input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value)
  }

  //chamada ao realizar a busca
  const handleSearch = async () => {
    //valida se uma data foi selecionada
    if (!date) {
      setError("Please select a date")
      return
    }

    //converte para o formato YYYYMMDD
    const formattedDate = date.replace(/-/g, "")

    try {
      // carrega e limpa mensagens de erro
      setLoading(true)
      setError(null)
      setHasSearched(true)

      //busca da API
      const data = await getStatesByDate(formattedDate)
      setStatesData(data)

      //se define uma mensagem de erro
      if (data.length === 0) {
        setError("No data available for the selected date")
      }
    } catch (err) {
      //busca e exibe uma mensagem de erro
      setError("An error occurred while fetching data")
      console.error(err)
      setStatesData([])
    } finally {
      // finaliza o carregamento
      setLoading(false)
      //console.log("data")
    }
  }

  //formata a data para exibição
  const formatDate = (dateString: string) => {
    //se não houver data "N/A"
    if (!dateString) return "N/A"
    try {
      //formata a data para o formato DD/MM/AAAA
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      //captura erros de formatação
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Situação da COVID-19 no Brasil por data</h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="date"
            value={date}
            onChange={handleDateChange}
            className="p-2 border rounded"
            placeholder="Select date (YYYY-MM-DD)"
          />
          <button onClick={handleSearch} className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Buscar
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-1">
        Selecione uma data para visualizar o status da COVID-19 no Brasil naquela data.
        </p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">{error}</div>}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border p-3 rounded bg-gray-100">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            </div>
          ))}
        </div>
      ) : (
        hasSearched && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statesData.length > 0 ? (
              statesData.map((state) => (
                <div key={state.uid} className="border p-3 rounded">
                  <h3 className="text-lg font-medium mb-1">
                    {state.state} ({state.uf})
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Data: {formatDate(state.datetime)}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Casos:</span>
                      <span>{state.cases?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mortos:</span>
                      <span>{state.deaths?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Suspeitos:</span>
                      <span>{state.suspects?.toLocaleString() || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Recuperados:</span>
                      <span>{state.refuses?.toLocaleString() || 0}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-4">
                {!error && <p>Não há dados disponíveis para a data selecionada.</p>}
              </div>
            )}
          </div>
        )
      )}
    </div>
  )
}

