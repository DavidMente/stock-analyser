import {Dispatch} from "redux";
import {SET_STOCK, SET_STOCK_PROFILE, StockActionTypes} from "./types";
import {LOAD_STATUS, SET_LOAD_STATUS} from "../common/types";
import {HistoricalPriceFull, StockAPI, StockProfile} from "../../api/StockAPI";

export const loadStock = (name: string, symbol: string | null) => (dispatch: Dispatch<StockActionTypes>) => {
  if (symbol === null) {
    dispatch(setStock(name, {symbol: null, historical: []}));
  } else {
    dispatch(setStockLoadStatus(name, LOAD_STATUS.LOADING));
    StockAPI.getHourlyHistoryBySymbol(symbol)
      .then(({data}) => {
        dispatch(setStock(name, {symbol: symbol, historical: data.reverse()}));
        StockAPI.getProfileBySymbol(symbol)
          .then(({data}) => {
            dispatch(setStockProfile(name, data.profile));
            dispatch(setStockLoadStatus(name, LOAD_STATUS.LOADED));
          });
      })
      .catch(() => dispatch(setStockLoadStatus(name, LOAD_STATUS.FAILED)))
  }
};

function setStockLoadStatus(name: string, loadStatus: LOAD_STATUS): StockActionTypes {
  return {
    type: SET_LOAD_STATUS,
    name: name,
    payload: loadStatus
  }
}

function setStock(name: string, historical: HistoricalPriceFull): StockActionTypes {
  return {
    type: SET_STOCK,
    name: name,
    payload: historical
  }
}

function setStockProfile(name: string, profile: StockProfile): StockActionTypes {
  return {
    type: SET_STOCK_PROFILE,
    name: name,
    payload: profile
  }
}
