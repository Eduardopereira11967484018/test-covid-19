"use client"

import { useState, useEffect } from "react"
import { type CountryData, getAllCountries, getBrazilData } from "../sevices/api"

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

    fetchCountriesData()
  }, [])


