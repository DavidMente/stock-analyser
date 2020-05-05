import React, {FunctionComponent} from "react";
import {StockPrice} from "../../api/StockAPI";
import {pearson} from "../../statistics/correlation";

type StockCorrelationProps = {
  primaryStocks: StockPrice[],
  secondaryStocks: StockPrice[]
}

const StockCorrelation: FunctionComponent<StockCorrelationProps> = ({primaryStocks, secondaryStocks}) => {

  function historyToNumbers(stocks: StockPrice[]): number[] {
    return stocks.map(stockPriceToNumber)
  }

  function stockPriceToNumber(stockPrice: StockPrice): number {
    return (stockPrice.open + stockPrice.close) / 2
  }

  const correlation = pearson(historyToNumbers(primaryStocks), historyToNumbers(secondaryStocks));

  return <div>
    <div className={'title'}>Pearson:</div>
    <div>{correlation}</div>
  </div>
};

export default StockCorrelation;
