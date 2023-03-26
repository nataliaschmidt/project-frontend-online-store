import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './pages/Home';
import Products from './pages/Products';
import ShopCart from './pages/ShopCart';
import Checkout from './pages/Checkout';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <Route exact path="/product/:id" component={ Products } />
        <Route exact path="/checkout" component={ Checkout } />
      </Switch>
    );
  }
}
export default App;
