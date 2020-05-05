import {Stock} from "../../api/StockAPI";
import {SetLoadStatus} from "../common/types";

export const SET_STOCKS = 'SET_STOCKS';

interface SetStocks {
  type: typeof SET_STOCKS,
  payload: Stock[]
}

export interface StocksState {
  stocks: Stock[]
}

export type StocksActionTypes = SetStocks | SetLoadStatus
