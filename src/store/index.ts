import {stocksReducer} from "./stocks/reducers";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {createStockReducer} from "./stock/reducers";
import {connectRouter, routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history'

export const history = createBrowserHistory();

export const PRIMARY_STOCK = 'PRIMARY_STOCK';
export const SECONDARY_STOCK = 'SECONDARY_STOCK';

const rootReducer = combineReducers({
  availableStocks: stocksReducer,
  primaryStock: createStockReducer(PRIMARY_STOCK),
  secondaryStock: createStockReducer(SECONDARY_STOCK),
  router: connectRouter(history),
});

export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk, routerMiddleware(history)));
