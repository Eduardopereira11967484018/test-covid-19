"use client"

import type React from "react"

import { useState } from "react"

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

export default function CovidDataForm() {
  const [formData, setFormData] = useState<FormData>({
    state: "",
    cases: 0,
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    date: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [jsonOutput, setJsonOutput] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    // Converter entradas  para números
    const parsedValue = type === "number" ? (value ? Number.parseInt(value, 10) : 0) : value

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }))

    //Limpar erro quando o campo é editado
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}
    let isValid = true

    // Valida o estado
    if (!formData.state.trim()) {
      newErrors.state = "State is required"
      isValid = false
    }

    // Valida os casos
    if (formData.cases < 0) {
      newErrors.cases = "Cases must be a positive number"
      isValid = false
    }

    // Valida confirmacao
    if (formData.confirmed < 0) {
      newErrors.confirmed = "Confirmed cases must be a positive number"
      isValid = false
    }

    // Validate deaths
    if (formData.deaths < 0) {
      newErrors.deaths = "Deaths must be a positive number"
      isValid = false
    }

    // Valida recoperados
    if (formData.recovered < 0) {
      newErrors.recovered = "Recovered must be a positive number"
      isValid = false
    }

    // Valid data
    if (!formData.date) {
      newErrors.date = "Date is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // Adicionar ID e carimbo de data/hora de envio
      const submissionData = {
        ...formData,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
      }

      //Formata saída JSON
      const jsonData = JSON.stringify(submissionData, null, 2)
      setJsonOutput(jsonData)
      setSubmitted(true)

      //salva em local
      const savedSubmissions = localStorage.getItem("covidFormSubmissions")
      let submissions = []

      if (savedSubmissions) {
        try {
          submissions = JSON.parse(savedSubmissions)
        } catch (error) {
          console.error("Error parsing saved submissions:", error) 
          //console.log(submissions)
        }
      }

      submissions.unshift(submissionData) //  Adiciona novo envio no início do array
      localStorage.setItem("covidFormSubmissions", JSON.stringify(submissions))

      
      console.log("Form data submitted:", submissionData)
    }
  }

  const handleReset = () => {
    setFormData({
      state: "",
      cases: 0,
      confirmed: 0,
      deaths: 0,
      recovered: 0,
      date: "",
    })
    setErrors({})
    setSubmitted(false)
    setJsonOutput("")
  }
  // campos do formulário
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-medium mb-1">Formulário de dados COVID-19</h2>
        <p className="text-sm text-gray-500">Preencha o formulário com dados com atualizações da COVID-19.</p>
      </div>

      <div className="border p-4 rounded">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="EStados" className="block text-sm mb-1">
                Estados
              </label>
              <input
                id="stage"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state code (e.g., SP)"
                className={`w-full p-2 border rounded ${errors.state ? "border-red-500" : ""}`}
              />
              {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
            </div>

            <div>
              <label htmlFor="data" className="block text-sm mb-1">
                Data
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.date ? "border-red-500" : ""}`}
              />
              {errors.date && <p className="text-sm text-red-500 mt-1">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="casos" className="block text-sm mb-1">
                Casos
              </label>
              <input
                id="cases"
                name="cases"
                type="number"
                min="0"
                value={formData.cases}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.cases ? "border-red-500" : ""}`}
              />
              {errors.cases && <p className="text-sm text-red-500 mt-1">{errors.cases}</p>}
            </div>

            <div>
              <label htmlFor="confirmados" className="block text-sm mb-1">
                Confirmados
              </label>
              <input
                id="confirmed"
                name="confirmed"
                type="number"
                min="0"
                value={formData.confirmed}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.confirmed ? "border-red-500" : ""}`}
              />
              {errors.confirmed && <p className="text-sm text-red-500 mt-1">{errors.confirmed}</p>}
            </div>

            <div>
              <label htmlFor="Mortos" className="block text-sm mb-1">
              Mortos
              </label>
              <input
                id="deaths"
                name="deaths"
                type="number"
                min="0"
                value={formData.deaths}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.deaths ? "border-red-500" : ""}`}
              />
              {errors.deaths && <p className="text-sm text-red-500 mt-1">{errors.deaths}</p>}
            </div>

            <div>
              <label htmlFor="recoperados" className="block text-sm mb-1">
                Recoperados
              </label>
              <input
                id="recovered"
                name="recovered"
                type="number"
                min="0"
                value={formData.recovered}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${errors.recovered ? "border-red-500" : ""}`}
              />
              {errors.recovered && <p className="text-sm text-red-500 mt-1">{errors.recovered}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={handleReset} className="px-3 py-2 border rounded hover:bg-gray-100">
             Deletar
            </button>
            <button type="submit" className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
             Enviar
            </button>
          </div>
        </form>
      </div>

      {submitted && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 text-green-800 p-3 rounded">
            <p className="font-medium">Formulário enviado</p>
            <p className="text-sm">
            Os dados do formulário foram salvos com sucesso.
            </p>
          </div>

          <div className="border p-4 rounded">
            <h3 className="text-lg font-medium mb-1"> envio do JSON</h3>
            <pre className="bg-gray-50 p-3 rounded overflow-auto text-sm">{jsonOutput}</pre>
          </div>
        </div>
      )}
    </div>
  )
}

