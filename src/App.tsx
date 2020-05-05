import React from 'react';
import Navbar from "./components/layouts/Navbar";
import {store} from "./store";
import {Provider} from "react-redux";
import StockSection from "./components/stock/StockSection";
import {ConnectedRouter} from "connected-react-router";
import {Route, Switch} from 'react-router-dom';
import {history} from './store';

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path={'/stocks/:symbol'} component={StockSection}/>
          </Switch>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
