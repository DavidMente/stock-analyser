import React, {FunctionComponent, useEffect} from "react";
import {RootState, SECONDARY_STOCK} from "../../store";
import {connect, ConnectedProps} from "react-redux";
import StockCorrelation from "./StockCorrelation";
import {HistoricalPriceFull, StockPrice} from "../../api/StockAPI";
import StockSelect from "../select/StockSelect";
import LineChart from "../charts/LineChart";
import {historicalToLineChart} from "../charts/chartDataMappers";
import {loadStock} from "../../store/stock/actions";

const mapState = (state: RootState) => {
  return {
    primaryStock: state.primaryStock,
    secondaryStock: state.secondaryStock,
    secondarySymbol: new URLSearchParams(state.router.location.search).get('compare')
  }
};

const mapDispatch = {
  loadSecondaryStock: (symbol: string | null) => loadStock(SECONDARY_STOCK, symbol)
};

const connector = connect(mapState, mapDispatch);

const StockComparisonSection: FunctionComponent<ConnectedProps<typeof connector>> =
  ({primaryStock, secondaryStock, secondarySymbol, loadSecondaryStock}) => {

    useEffect(() => {
      loadSecondaryStock(secondarySymbol);
    }, [secondarySymbol, loadSecondaryStock]);

    function stockIsSet(historicalPriceFull: HistoricalPriceFull) {
      return historicalPriceFull.historical.length > 0
    }

    function getSharedDates(stocks1: StockPrice[], stocks2: StockPrice[]): StockPrice[] {
      return stocks1.filter((stockPrice) => dateExistsInStock(stockPrice.date, stocks2))
    }

    function dateExistsInStock(date: string, stocks: StockPrice[]): boolean {
      return stocks.some((stock) => date === stock.date)
    }

    const primaryStocks = getSharedDates(primaryStock.historical, secondaryStock.historical);
    const secondaryStocks = getSharedDates(secondaryStock.historical, primaryStock.historical);

    function sectionContent() {
      if (stockIsSet(secondaryStock)) {

        const series = [
          {
            name: primaryStock.symbol,
            data: historicalToLineChart(primaryStocks)
          },
          {
            name: secondaryStock.symbol,
            data: historicalToLineChart(secondaryStocks)
          }];

        return <div>
          <LineChart series={series} />
          <StockCorrelation primaryStocks={primaryStocks} secondaryStocks={secondaryStocks} />
        </div>
      }
    }

    function to(symbol: string) {
      return `/stocks/${primaryStock.symbol}?compare=${symbol}`
    }

    function select() {
      if (stockIsSet(primaryStock)) {
        return <StockSelect stockName={SECONDARY_STOCK} placeholder={'compare with'} to={to} />
      }
    }

    return <div>
      {select()}
      {sectionContent()}
    </div>
  };

export default connector(StockComparisonSection);
