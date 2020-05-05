import React, {FunctionComponent} from "react";
import {Stock} from "../../api/StockAPI";
import StockSelectListLink from "./StockSelectListLink";

type StockSelectListProps = {
  stocks: Stock[],
  input: string | null,
  isHidden: boolean,
  onSelect: () => void,
  selectedIndex: number,
  to: (symbol: string) => string
}

const StockSelectList: FunctionComponent<StockSelectListProps> =
  ({isHidden, stocks, input, onSelect, selectedIndex, to}) => {

    const MAX_STOCKS = 6;

    const inputIsEmpty = input === undefined || input === null || input === '';

    const visibleStocks = inputIsEmpty ? [] : stocks.filter((stock) => stockMatchesInput(stock, input!)).slice(0, MAX_STOCKS);

    function stockMatchesInput(stock: Stock, input: string): boolean {
      return includes(stock.symbol, input) || includes(stock.name, input)
    }

    function includes(haystack: string | undefined, needle: string): boolean {
      return haystack !== undefined && haystack.toLowerCase().includes(needle.toLowerCase())
    }

    return <div className={'stock-select-list dropdown-content' + (isHidden ? ' is-hidden' : '')}>
      {visibleStocks.map((stock, index) =>
        <StockSelectListLink key={stock.symbol} selected={index === selectedIndex} onSelect={onSelect} stock={stock}
                             to={to} />
      )}
    </div>
  };

export default StockSelectList;
