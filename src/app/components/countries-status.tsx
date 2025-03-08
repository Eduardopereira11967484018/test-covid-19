"use client"

import { useState, useEffect } from "react"
import { type CountryData, getAllCountries, getBrazilData } from "../sevices/api"

export default function CountriesStatus() {
  const [countries, setCountries] = useState<CountryData[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [filteredCountry, setFilteredCountry] = useState<CountryData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // fetch data countries  da api
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
        <h2 className="text-xl font-medium mb-2">Status dos paises 

        </h2>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="w-full max-w-xs p-2 border rounded"
        >
          <option value="">Escolha os paises</option>
          <option value="all">Listas De paises
          </option>
          {countries.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
            </div>
          </div>
        )
      }

     