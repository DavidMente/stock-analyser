import {SET_STOCKS, StocksActionTypes, StocksState} from "./types";
import {LOAD_STATUS, LoadMetadata, SET_LOAD_STATUS} from "../common/types";

type CombinedStocksState = StocksState & LoadMetadata

const initialState: CombinedStocksState = {
  stocks: [],
  loadedAt: 0,
  loadStatus: LOAD_STATUS.NOT_LOADED
};

export function stocksReducer(state = initialState, action: StocksActionTypes): CombinedStocksState {
  switch (action.type) {
    case SET_LOAD_STATUS: {
      return {...state, loadStatus: action.payload}
    }
    case SET_STOCKS: {
      return {...state, stocks: action.payload, loadStatus: LOAD_STATUS.LOADED}
    }
    default: {
      return state
    }
  }
}
