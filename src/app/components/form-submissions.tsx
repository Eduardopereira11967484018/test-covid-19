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
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium mb-2">Envios de formulário</h2>
      {submissions.map((submission) => (
        <div key={submission.id} className="border p-4 rounded">
          <p><strong>Estados:</strong> {submission.state}</p>
          <p><strong>Casos:</strong> {submission.cases}</p>
          <p><strong>Confirmado:</strong> {submission.confirmed}</p>
          <p><strong>Mortos:</strong> {submission.deaths}</p>
          <p><strong>Recoperados:</strong> {submission.recovered}</p>
          <p><strong>Data:</strong> {formatDate(submission.date)}</p>
          <button onClick={() => handleDelete(submission.id!)} className="text-red-500">Delete</button>
        </div>
      ))}
    </div>
  )
}