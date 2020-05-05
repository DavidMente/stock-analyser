import {Stock} from "../api/StockAPI";

export function stockFactory(attributes: object = {}): Stock {
  return {
    symbol: 'SYMBOL',
    name: 'Name',
    price: 0,
    exchange: 'NYSE',
    ...attributes
  }
}
