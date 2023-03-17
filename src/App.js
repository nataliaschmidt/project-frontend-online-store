import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './pages/Home';
import ShopCart from './pages/ShopCart';

class App extends React.Component {
  // componentDidMount() {
  //   // getCategories();
  //   // getProductsFromCategoryAndQuery('Agro');
  // }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/carrinho-de-compras" component={ ShopCart } />
      </Switch>
    );
  }
}
export default App;
