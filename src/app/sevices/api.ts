// url da base de dados
export const API_URL = "https://covid19-brazil-api.now.sh/api/report/v1"

//Tipos de dados para definir a estrutura dos dados retornados pela API
export interface StateData {
  uid: number
  uf: string
  state: string
  cases: number
  deaths: number
  suspects: number
  refuses: number
  datetime: string
}
//interface CountryData representa a estrutura dos dados relacionados a um país
export interface CountryData {
  country: string
  cases: number
  confirmed: number
  deaths: number
  recovered: number
  updated_at: string
}

//Função para obter todos os estados
export async function getAllStates(): Promise<StateData[]> {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Error fetching all states:", error);
      throw error;
    }
  }
//console.log(getAllStates())

//Função assíncrona para obter dados da base (UF)
export async function getStateByUF(uf: string): Promise<StateData> {
    try {
      //Garantindo que a UF seja convertida para minúscula da API
      const response = await fetch(`${API_URL}/brazil/uf/${uf.toLowerCase()}`)
      
      //Verificando a resposta JSON
      const data = await response.json()
  
      //se a API retornar um erro lança uma exceção
      if (data.error) {
        throw new Error(`State ${uf} not found`)
      }

      //console.log(data)
  
      //retorna os dados do estado obtidos da API
      return data
    } catch (error) {
      //caso ocorra um erro durante o resposta imprime o erro no console
      console.error(`Error fetching state ${uf}:`, error)

      //console.log(getStateByUF('SP'))
      
      //lança o erro para ser tratado em outro lugar
      throw error
    }
  }
  
  export async function getAllCountries(): Promise<CountryData[]> {
    try {
      const response = await fetch(`${API_URL}/countries`)
      const data = await response.json()
      return data.data || []
      //console.log(data)
    } catch (error) {
      console.error("Error fetching all countries:", error)
      throw error
      //console.log(getAllCountries())
    }
  }
  
  //função para obter todos os países
  export async function getBrazilData(): Promise<CountryData> {
    try {
      const response = await fetch(`${API_URL}/brazil`)
      const data = await response.json()
      return data.data || {}
      //console.log(data)
    } catch (error) {
      console.error("Error fetching Brazil data:", error)
      throw error
      //console.log(getBrazilData())
    }
  }
  