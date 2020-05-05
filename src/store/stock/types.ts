import {HistoricalPriceFull, StockProfile} from "../../api/StockAPI";
import {LoadMetadata, SetLoadStatus} from "../common/types";

export type StockState = HistoricalPriceFull & LoadMetadata & {
  profile: StockProfile
}

export const SET_STOCK = 'SET_STOCK';
export const SET_STOCK_PROFILE = 'SET_STOCK_PROFILE';

interface SetStock {
  type: typeof SET_STOCK,
  name: string,
  payload: HistoricalPriceFull
}

interface SetStockProfile {
  type: typeof SET_STOCK_PROFILE,
  name: string,
  payload: StockProfile
}

export type StockActionTypes = SetStock | SetLoadStatus | SetStockProfile
