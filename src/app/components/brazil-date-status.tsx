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
    <div>
      <h1>Status da data no Brasil</h1>
      <input type="date" value={date} onChange={handleDateChange} />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>
      {error && <p>{error}</p>}
      {hasSearched && !loading && !error && (
        <div>
          <h2>Resultados{formatDate(date)}</h2>
            <ul>
                {statesData.map((state) => (
                <li key={state.uf}>
                    <strong>{state.state}: </strong>
                    Casos: {state.cases}, Mortos: {state.deaths}, Suspeitas: {state.suspects}
                </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  )
}