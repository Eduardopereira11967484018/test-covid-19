"use client"

import { useState, useEffect } from "react"
import { type CountryData, getAllCountries, getBrazilData } from "../sevices/api"

export default function CountriesStatus() {
  const [countries, setCountries] = useState<CountryData[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [filteredCountry, setFilteredCountry] = useState<CountryData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // fetch data countries da api
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        setLoading(true)
        const data = await getAllCountries()
        setCountries(data)
      } catch (err) {
        setError("An error occurred while fetching data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    //console.log(fetchCountriesData())

    fetchCountriesData()
  }, [])
// Fetch specific country data when selected
useEffect(() => {
    if (!selectedCountry || selectedCountry === "all") {
      setFilteredCountry(null)
      return
    }

    // Find the selected country in the countries array
    const country = countries.find((c) => c.country === selectedCountry)
    setFilteredCountry(country || null)

    //buscar dados do país quando selecionado
    if (selectedCountry === "Brazil") {
      const fetchBrazilData = async () => {
        try {
          setLoading(true)
          const data = await getBrazilData()
          setFilteredCountry(data)
        } catch (err) {
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
      //console.log(fetchBrazilData())

      fetchBrazilData()
    }
  }, [selectedCountry, countries])

  //formatacao de data
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    } catch (error) {
      console.error("Error formatting date:", error)
      return "Invalid date"
    }
  }
  // compenent que exibe o status dos países
 
  return (
    <div className="space-y-4">
      <div className="mb-4">
        <h2 className="text-xl font-medium mb-2">Status dos paises</h2>
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full max-w-xs p-2 border rounded"
        >
          <option value="">Escolha dos paises</option>
          <option value="all">Lista de paises</option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedCountry && selectedCountry !== "all" && filteredCountry ? (
            <div className="border p-3 rounded">
              <h3 className="text-lg font-medium mb-1">{filteredCountry.country}</h3>
              <p className="text-sm text-gray-500 mb-2">Ultimas Atualização: {formatDate(filteredCountry.updated_at)}</p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Casos:</span>
                  <span>{filteredCountry.cases?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmado :</span>
                  <span>{filteredCountry.confirmed?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mortos:</span>
                  <span>{filteredCountry.deaths?.toLocaleString() || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Recuperados:</span>
                  <span>{filteredCountry.recovered?.toLocaleString() || 0}</span>
                </div>
              </div>
            </div>
          ) : (
            countries.map((country) => (
              <div key={country.country} className="border p-3 rounded">
                <h3 className="text-lg font-medium mb-1">{country.country}</h3>
                <p className="text-sm text-gray-500 mb-2">Ultimas atualizações: {formatDate(country.updated_at)}</p>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Casos:</span>
                    <span>{country.cases?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confirmado:</span>
                    <span>{country.confirmed?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Mortos:</span>
                    <span>{country.deaths?.toLocaleString() || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recuperados:</span>
                    <span>{country.recovered?.toLocaleString() || 0}</span>
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

