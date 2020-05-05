import mockAxios from 'jest-mock-axios';
import configureMockStore, {MockStore} from 'redux-mock-store';
import thunk from "redux-thunk";
import {loadStocks} from "./actions";
import {stockFactory} from "../../factories/stockFactory";
import {LOAD_STATUS, SET_LOAD_STATUS} from "../common/types";
import {SET_STOCKS} from "./types";

describe('stocks actions', () => {

  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  let store: MockStore;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    mockAxios.reset()
  });

  const loadAction = {type: SET_LOAD_STATUS, payload: LOAD_STATUS.LOADING};

  it('loadStocks succeeds', () => {
    store.dispatch<any>(loadStocks());
    expect(store.getActions()).toEqual([loadAction]);
    const stocks = [stockFactory({symbol: 'ST1'}), stockFactory({symbol: 'ST2'})];
    mockAxios.mockResponse({
      data: {symbolsList: stocks}
    });
    expect(store.getActions()).toEqual([
      loadAction,
      {type: SET_STOCKS, payload: stocks},
    ])
  });

  it('loadStocks fails', () => {
    store.dispatch<any>(loadStocks());
    expect(store.getActions()).toEqual([loadAction]);
    mockAxios.mockError();
    expect(store.getActions()).toEqual([
      loadAction,
      {type: SET_LOAD_STATUS, payload: LOAD_STATUS.FAILED}
    ])
  })


});
