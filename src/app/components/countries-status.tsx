"use client"

import { useState, useEffect } from "react"
import { type CountryData, getAllCountries, getBrazilData } from "../services/api"

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
