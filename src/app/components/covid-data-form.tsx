import React, { useState } from "react"



// Parte em desenvolvimento do formulário de dados COVID-19
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  
    if (validateForm()) {
      // Adiciona ID e data/hora no envio
      const submissionData = {
        ...formData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
      }
  
      // Formata a saída JSON
      const jsonData = JSON.stringify(submissionData, null, 2)
      setJsonOutput(jsonData)
      setSubmitted(true)
  
      // Salvar no local storage
      const savedSubmissions = localStorage.getItem("covidFormSubmissions")
      let submissions = []
  
      if (savedSubmissions) {
        try {
          submissions = JSON.parse(savedSubmissions)
        } catch (error) {
          console.error("Erro ao analisar envios salvos:", error)
        }
      }
  
      submissions.unshift(submissionData) // Adiciona novos dados ao início da lista
      localStorage.setItem("covidFormSubmissions", JSON.stringify(submissions))
  
      // Aqui, pode haver uma necessidade de limpar o formulário ou notificar o usuário
      console.log("Dados do formulário enviado:", submissionData)
    }
  }
  