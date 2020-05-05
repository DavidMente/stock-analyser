import React, {FunctionComponent} from "react";
import {StockState} from "../../store/stock/types";

type StockProfileProps = {
  stock: StockState
}

const StockProfileComponent: FunctionComponent<StockProfileProps> = ({stock}) =>
  <div className={'box'}>
    <h1 className={'title'}>{stock.symbol}: {stock.profile.companyName}</h1>
    <div className={'text'}>{stock.profile.description}</div>
  </div>;

export default StockProfileComponent;
