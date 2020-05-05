import {LOAD_STATUS, SET_LOAD_STATUS} from "../common/types";
import {SET_STOCK, SET_STOCK_PROFILE, StockActionTypes, StockState} from "./types";

const initialState: StockState = {
  symbol: null,
  historical: [],
  loadedAt: 0,
  loadStatus: LOAD_STATUS.NOT_LOADED,
  profile: {}
};

export function createStockReducer(reducerName: string) {
  return function stockReducer(state = initialState, action: StockActionTypes) {
    const {name} = action;
    if (name !== reducerName) return state
    switch (action.type) {
      case SET_STOCK:
        return {
          ...state,
          symbol: action.payload.symbol,
          historical: action.payload.historical,
        };
      case SET_LOAD_STATUS:
        return {...state, loadStatus: action.payload};
      case SET_STOCK_PROFILE:
        return {...state, profile: action.payload};
      default:
        return state
    }
  }
}
