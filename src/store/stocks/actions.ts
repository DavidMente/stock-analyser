import {SET_STOCKS, StocksActionTypes} from "./types";
import {Stock, StockAPI} from "../../api/StockAPI";
import {LOAD_STATUS, SET_LOAD_STATUS} from "../common/types";
import {Dispatch} from "redux";

export const loadStocks = () => (dispatch: Dispatch<StocksActionTypes>) => {
  dispatch(setStocksLoadStatus(LOAD_STATUS.LOADING));
  return StockAPI.getAvailableStocks()
    .then(({data}) => {
      dispatch(setStocks(data.symbolsList));
    })
    .catch(() => dispatch(setStocksLoadStatus(LOAD_STATUS.FAILED)))
};

function setStocksLoadStatus(loadStatus: LOAD_STATUS): StocksActionTypes {
  return {
    type: SET_LOAD_STATUS,
    payload: loadStatus
  }
}

function setStocks(stocks: Stock[]): StocksActionTypes {
  return {
    type: SET_STOCKS,
    payload: stocks
  }
}
