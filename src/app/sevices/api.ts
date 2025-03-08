// url da base de dados
export const API_URL = "https://covid19-brazil-api.now.sh/api/report/v1"

// Tipos de dados para definir a estrutura dos dados retornados pela API
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
// A interface CountryData representa a estrutura dos dados relacionados a um país
export interface CountryData {
  country: string
  cases: number
  confirmed: number
  deaths: number
  recovered: number
  updated_at: string
}

// Função para obter todos os estados
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

