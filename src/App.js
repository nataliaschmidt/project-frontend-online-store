import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
// import { getCategories, getProductsFromCategoryAndQuery } from './services/api';
import Home from './pages/Home';

class App extends React.Component {
  // componentDidMount() {
  //   // getCategories();
  //   // getProductsFromCategoryAndQuery('Agro');
  // }

  render() {
    return (
      <Route exact path="/" component={ Home } />
    );
  }
}
export default App;
