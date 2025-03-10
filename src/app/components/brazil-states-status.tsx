"use client"

import { useState, useEffect } from "react"
import { type StateData, getAllStates, getStateByUF } from "../sevices/api"

// Componente principal que exibe o status dos estados brasileiros
export default function BrazilStatesStatus() {
  // Estados locais para armazenar dados e estados de carregamento
  const [states, setStates] = useState<StateData[]>([]) // Para armazenar todos os estados
  const [selectedState, setSelectedState] = useState<string>("") // Estado selecionado pelo usuário
  const [filteredState, setFilteredState] = useState<StateData | null>(null) // Estado filtrado com base na seleção
  const [loading, setLoading] = useState<boolean>(true) // Indica se os dados estão sendo carregados
  const [error, setError] = useState<string | null>(null) // Armazena mensagens de erro

  // Efeito colateral para buscar dados de todos os estados ao montar o componente
  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        setLoading(true) // Inicia o carregamento
        const data = await getAllStates() // Chama a API para obter todos os estados
        setStates(data) // Armazena os dados dos estados
      } catch (err) {
        setError("An error occurred while fetching data") // Define mensagem de erro
        console.error(err) // Log do erro no console
      } finally {
        setLoading(false) // Finaliza o carregamento
      }
    }

    fetchStatesData() // Executa a função para buscar dados
  }, [])

  // Efeito colateral para buscar dados de um estado específico quando selecionado
  useEffect(() => {
    const fetchStateData = async () => {
      if (!selectedState || selectedState === "all") {
        setFilteredState(null) // Reseta o estado filtrado se nenhuma seleção ou 'todos' for escolhido
        return
      }

      try {
        setLoading(true) // Inicia o carregamento
        const data = await getStateByUF(selectedState) // Chama a API para obter dados do estado selecionado
        setFilteredState(data) // Armazena os dados do estado filtrado
      } catch (err) {
        setError(`State ${selectedState} not found`) // Define mensagem de erro se o estado não for encontrado
        setFilteredState(null) // Reseta o estado filtrado
        console.error(err) // Log do erro no console
      } finally {
        setLoading(false) // Finaliza o carregamento
      }
    }

    if (selectedState && selectedState !== "all") {
      fetchStateData() // Executa a função para buscar dados do estado selecionado
    }
  }, [selectedState]) // Dependência do efeito: executa quando selectedState muda

  // Função para formatar a data para exibição
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A" // Retorna 'N/A' se não houver data
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) // Formata a data para o padrão brasileiro
    } catch (error) {
      console.error("Erro de formatação de dados", error) 
      return "data invalidade" 
    }
  }

  
// Componente principal que exibe o status dos estados brasileiros
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Status dos estados Brasileiros </h2>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full max-w-xs p-2 border rounded"
        >
          <option value="">Escolha o Estado Brasileiro</option>
          <option value="all">Todos os estados </option>
          {states.map((state) => (
            <option key={state.uid} value={state.uf}>
              {state.uf} - {state.state} 
            </option>
          ))}
        </select>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">{error}</div>} 

      {loading ? ( // Condicional para exibir carregamento ou dados
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
        // Exibe os dados dos estados
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedState && selectedState !== "all" && filteredState ? (
            <div className="border p-3 rounded">
              <h3 className="text-lg font-medium mb-1">
                {filteredState.state} ({filteredState.uf}) 
              </h3>
              <p className="text-sm text-gray-500 mb-2">Ultimas atualizações{formatDate(filteredState.datetime)}</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Casos:</span>
                  <span>{filteredState.cases?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mortos:</span>
                  <span>{filteredState.deaths?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Suspeitos:</span>
                  <span>{filteredState.suspects?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recuperados:</span>
                  <span>{filteredState.refuses?.toLocaleString() || 0}</span> 
                </div>
              </div>
            </div>
          ) : (
            states.map((state) => (
              <div key={state.uid} className="border p-3 rounded">
                <h3 className="text-lg font-medium mb-1">
                  {state.state} ({state.uf}) 
                </h3>
                <p className="text-sm text-gray-500 mb-2">Ultimas atualizações: {formatDate(state.datetime)}</p>
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
                    <span>Recuoerados:</span>
                    <span>{state.refuses?.toLocaleString() || 0}</span> 
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
