import mockAxios from 'jest-mock-axios';
import configureMockStore, {MockStore} from 'redux-mock-store';
import thunk from "redux-thunk";
import {loadStock} from "./actions";
import {LOAD_STATUS, SET_LOAD_STATUS} from "../common/types";
import {SET_STOCK} from "./types";
import {PRIMARY_STOCK} from "../index";

describe('stock actions', () => {

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  let store: MockStore;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    mockAxios.reset()
  });

  const loadAction = {type: SET_LOAD_STATUS, name: PRIMARY_STOCK, payload: LOAD_STATUS.LOADING};

  it('loadStock succeeds', () => {
    store.dispatch<any>(loadStock(PRIMARY_STOCK, 'GOOG'));
    expect(store.getActions()).toEqual([loadAction]);
    const data = {symbol: 'GOOG', historical: []};
    mockAxios.mockResponse({
      data: data
    });
    expect(store.getActions()).toEqual([
      loadAction,
      {type: SET_STOCK, name: PRIMARY_STOCK, payload: data},
    ])
  });

  it('loadStocks fails', () => {
    store.dispatch<any>(loadStock(PRIMARY_STOCK,'TSLA'));
    expect(store.getActions()).toEqual([loadAction]);
    mockAxios.mockError();
    expect(store.getActions()).toEqual([
      loadAction,
      {type: SET_LOAD_STATUS, name: PRIMARY_STOCK, payload: LOAD_STATUS.FAILED}
    ])
  })


});
