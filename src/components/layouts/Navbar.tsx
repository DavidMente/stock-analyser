import React, {FunctionComponent} from "react";
import StockSelect from "../select/StockSelect";
import {PRIMARY_STOCK} from "../../store";

const Navbar: FunctionComponent = () =>
  <nav className="navbar has-background-grey-dark" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <div className={'navbar-item has-text-white'}>
        <i className="fas fa-chart-line" /><span style={{marginLeft: '5px'}}>Stock Analyser</span>
      </div>
      <div className="navbar-item">
        <StockSelect stockName={PRIMARY_STOCK} placeholder={'choose stock'} to={(symbol) => `/stocks/${symbol}`} />
      </div>
    </div>
  </nav>;

export default Navbar
