import {StockPrice} from "../../api/StockAPI";
import {CandleStickData, LineChartData} from "./types";

export function historicalToCandleStickChart(historical: StockPrice[]): CandleStickData[] {
  return historical.map(stockPriceToCandleStickData)
}

function stockPriceToCandleStickData(stockPrice: StockPrice): CandleStickData {
  return {
    x: stockPrice.date,
    y: [stockPrice.open, stockPrice.high, stockPrice.low, stockPrice.close]
  }
}

export function historicalToLineChart(historical: StockPrice[]): LineChartData[] {
  return historical.map(stockPriceToNumber)
}

function stockPriceToNumber(stockPrice: StockPrice): LineChartData {
  return {
    x: stockPrice.date,
    y: Math.round((stockPrice.open + stockPrice.close) * 100 / 2) / 100
  }
}
