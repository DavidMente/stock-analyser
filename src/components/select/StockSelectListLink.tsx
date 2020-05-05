import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";
import {Stock} from "../../api/StockAPI";

type StockSelectListLinkProps = {
  stock: Stock,
  onSelect?: () => void,
  selected: boolean
  to: (symbol: string) => string
}

const StockSelectListLink: FunctionComponent<StockSelectListLinkProps> =
  ({stock, onSelect, selected, to}) =>
  <Link className={'dropdown-item' + (selected ? ' is-active' : '')}
        onClick={onSelect} to={to(stock.symbol)}
  >{stock.symbol}: {stock.name}</Link>;

export default StockSelectListLink;
