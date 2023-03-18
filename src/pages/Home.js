import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import ProductsList from '../components/ProductsList';
import { getProductsFromQuery } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    productList: {},
    button: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchGetProductsFromQuery = async (search) => {
    // const { search } = this.state;
    const productsList = await getProductsFromQuery(search);
    // console.log(productsList);
    this.setState({
      productList: productsList,
      button: true,
    });
  };

  render() {
    const { search, productList, button } = this.state;
    return (
      <section>
        <form>
          <label>
            <input
              data-testid="query-input"
              type="search"
              name="search"
              value={ search }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="query-button"
            type="button"
            onClick={ () => this.fetchGetProductsFromQuery(search) }
          >
            Pesquisar
          </button>
        </form>
        <p>
          <Link
            data-testid="shopping-cart-button"
            to="/carrinho-de-compras"
          >
            Carrinho de compras.
          </Link>
        </p>
        {
          !search && (
            <p data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )
        }
        {button && <ProductsList products={ productList } />}
        <Menu />
      </section>
    );
  }
}
export default Home;
