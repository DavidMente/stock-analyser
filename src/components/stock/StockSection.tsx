import React, {FunctionComponent, useEffect} from "react";
import {PRIMARY_STOCK, RootState} from "../../store";
import {connect, ConnectedProps} from "react-redux";
import CandleStickChart from "../charts/CandleStickChart";
import {historicalToCandleStickChart} from "../charts/chartDataMappers";
import {LOAD_STATUS} from "../../store/common/types";
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {loadStock} from "../../store/stock/actions";
import StockComparisonSection from "../comparison/StockComparisonSection";
import StockProfileComponent from "./StockProfileComponent";

const mapState = (state: RootState) => {

  const primaryStockSeries = {
    name: state.primaryStock.symbol,
    data: historicalToCandleStickChart(state.primaryStock.historical)
  };

  return {
    stock: state.primaryStock,
    series: [primaryStockSeries],
    isLoaded: state.primaryStock.loadStatus === LOAD_STATUS.LOADED
  }
};

const mapDispatch = {
  loadPrimaryStock: (symbol: string) => loadStock(PRIMARY_STOCK, symbol)
};

const connector = connect(mapState, mapDispatch);

const StockSection: FunctionComponent<ConnectedProps<typeof connector> & RouteComponentProps<any>> =
  ({series, isLoaded, match, loadPrimaryStock, stock}) => {

    useEffect(() => {
      if (match.params.symbol) {
        loadPrimaryStock(match.params.symbol);
      }
    }, [match.params.symbol, loadPrimaryStock]);

    return <section className={'section'}>
      <div className={'container'}>
        <div className="columns">
          <div className={'column is-one-third'}>
            <StockProfileComponent stock={stock} />
          </div>
          <div className={'column'}>
            {isLoaded ? <div className={'box'}><CandleStickChart series={series} /></div> : ''}
          </div>
        </div>
        <StockComparisonSection />
      </div>
    </section>;
  };

export default connector(withRouter(StockSection));
