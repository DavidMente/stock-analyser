import axios, {AxiosResponse} from 'axios';

const API_URL = "https://financialmodelingprep.com/api/v3/";

export const StockAPI = {

  getAvailableStocks(): Promise<AxiosResponse<StockList>> {
    return axios.get(`${API_URL}company/stock/list`)
  },

  getHistoryBySymbol(symbol: string): Promise<AxiosResponse<HistoricalPriceFull>> {
    return axios.get(`${API_URL}historical-price-full/${symbol}`)
  },

  getHourlyHistoryBySymbol(symbol: string): Promise<AxiosResponse<StockPrice[]>> {
    return axios.get(`${API_URL}historical-chart/1hour/${symbol}`)
  },

  getProfileBySymbol(symbol: string): Promise<AxiosResponse<StockProfileResponse>> {
    return axios.get(`${API_URL}company/profile/${symbol}`)
  }

};

export interface StockList {
  symbolsList: [Stock]
}

export interface Stock {
  symbol: string,
  name?: string,
  price: number,
  exchange: string
}

interface StockProfileResponse {
  symbol: string,
  profile: StockProfile
}

export interface StockProfile {
  [key: string]: string | number | null
}

export interface HistoricalPriceFull {
  symbol: string | null,
  historical: StockPrice[]
}

export interface StockPrice {
  date: string,
  open: number,
  high: number,
  low: number,
  close: number,
  volume: number,

  [key: string]: number | string
}
