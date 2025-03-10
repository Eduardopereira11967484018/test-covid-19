"use client"

import { useState, useEffect } from "react"

// Definição da interface dos dados do formulário
interface FormData {
  state: string 
  cases: number 
  confirmed: number 
  deaths: number 
  recovered: number 
  date: string 
  id?: string 
  submittedAt?: string 
}

export default function FormSubmissions() {
  const [submissions, setSubmissions] = useState<FormData[]>([])

  // Carrega as submissões do localStorage 
  useEffect(() => {
    const savedSubmissions = localStorage.getItem("covidFormSubmissions")
    if (savedSubmissions) {
      try {
        setSubmissions(JSON.parse(savedSubmissions))
      } catch (error) {
        // console.error("Error parsing saved submissions:", error)
        console.error("Error parsing saved submissions:", error) 
      }
    }
  }, [])

  // Função para deletar uma submissão 
  const handleDelete = (id: string) => {
    const updatedSubmissions = submissions.filter((submission) => submission.id !== id) 
    setSubmissions(updatedSubmissions) 
    localStorage.setItem("covidFormSubmissions", JSON.stringify(updatedSubmissions)) 
  }

  // Formata a data para exibição
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A" 
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) //  data para o formato brasileiro
    } catch (error) {
      console.error("Error formatting date:", error) 
      console.log("data invalidade")
      return "Invalid date" 
    }
  }

  // se não houver submissões exibe uma mensagem
  if (submissions.length === 0) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-medium mb-2">Envios de formulário</h2>
        <div className="border p-4 rounded text-center">
          <p className="text-gray-500">Use o Formulário de Dados para enviar dados da COVID-19.</p>
        </div>
      </div>
    )
  }

  // interface de exibição das submissões
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Envios de formulário</h2>
        <button
          onClick={() => {
            setSubmissions([])
            localStorage.removeItem("covidFormSubmissions")
          }}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Limpar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {submissions.map((submission) => (
          <div key={submission.id} className="border p-3 rounded">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-medium">{submission.state}</h3>
              <button onClick={() => handleDelete(submission.id!)} className="text-red-500 hover:text-red-700">
                ×
              </button>
            </div>

            <p className="text-sm text-gray-500 mb-2">
              Data: {formatDate(submission.date)}
              {submission.submittedAt && <span className="block">Enviar: {formatDate(submission.submittedAt)}</span>}
            </p>

            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Casos:</span>
                <span>{submission.cases?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmado:</span>
                <span>{submission.confirmed?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Mortos:</span>
                <span>{submission.deaths?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Recuperados:</span>
                <span>{submission.recovered?.toLocaleString() || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}