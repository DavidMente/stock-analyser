import React, {FunctionComponent, useEffect, useState} from "react";
import {RootState} from "../../store";
import {loadStocks} from "../../store/stocks/actions";
import {connect, ConnectedProps} from 'react-redux';
import {LOAD_STATUS} from "../../store/common/types";
import StockSelectList from "./StockSelectList";
import OutsideClickHandler from 'react-outside-click-handler';

const mapState = (state: RootState) => {
  return {
    stocks: state.availableStocks.stocks,
    loadStatus: state.availableStocks.loadStatus
  }
};

const mapDispatch = {
  load: loadStocks,
};

const connector = connect(mapState, mapDispatch);

type StockSelectProps = ConnectedProps<typeof connector> & {
  stockName: string,
  placeholder: string,
  to: (symbol: string) => string
}

const StockSelect: FunctionComponent<StockSelectProps> = ({placeholder, stocks, loadStatus, load, to}) => {

  useEffect(() => {
    if (loadStatus === LOAD_STATUS.NOT_LOADED) {
      load();
    }
  });

  const [inputValue, setInputValue] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [focused, setFocused] = useState(false);

  function handleChange(value: string) {
    setSelectedIndex(0);
    setInputValue(value);
  }

  function clearInput() {
    setInputValue('');
  }

  function handleKeyDown(key: string) {
    if (key === 'ArrowDown') {
      setSelectedIndex(Math.min(stocks.length, selectedIndex + 1));
    } else if (key === 'ArrowUp') {
      setSelectedIndex(Math.max(0, selectedIndex - 1));
    } else if (key === 'Enter') {
      const activeElement = document.querySelector('.dropdown-item.is-active');
      if (activeElement) {
        activeElement.dispatchEvent(new MouseEvent('click'));
      }
    } else if (key === 'Escape') {
      clearInput();
    }
  }

  return <OutsideClickHandler onOutsideClick={() => setFocused(false)}>
    <div className="control has-icons-right"
         onFocus={() => setFocused(true)}
    >
      <input className={'input'}
             type={'text'}
             value={inputValue}
             placeholder={placeholder}
             onChange={(event) => handleChange(event.target.value)}
             onKeyDown={(event) => handleKeyDown(event.key)}
      />
      {inputValue !== ''
        ? <span className="icon is-medium is-right has-pointer-events" onClick={() => clearInput()}>
            <i className="fas fa-times" />
          </span>
        : ''}
    </div>
    <StockSelectList
      onSelect={() => setFocused(false)}
      isHidden={!focused}
      stocks={stocks}
      input={inputValue}
      selectedIndex={selectedIndex}
      to={to}
    />
  </OutsideClickHandler>;
};

export default connector(StockSelect);
