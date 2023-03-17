import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import ProductsList from '../components/ProductsList';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  state = {
    search: '',
    productList: {},
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  fetchGetProductsFromCategoryAndQuery = async (search) => {
    // const { search } = this.state;
    const productsList = await getProductsFromCategoryAndQuery(search);
    this.setState({
      productList: productsList,
    });
  };

  render() {
    const { search, productList } = this.state;
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
            onClick={ () => this.fetchGetProductsFromCategoryAndQuery(search) }
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
        <ProductsList products={ productList } />
        <Menu />
      </section>
    );
  }
}
export default Home;
