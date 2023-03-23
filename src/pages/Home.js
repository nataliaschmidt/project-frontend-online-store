import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import addProduct from '../services/LocalStorage';
import './Home.css';

class Home extends React.Component {
  state = {
    categories: [],
    searchInput: '',
    searchResult: [],
    searchClicked: false,
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = async () => {
    const { searchInput } = this.state;
    const response = await getProductsFromCategoryAndQuery('', searchInput);
    this.setState({
      searchResult: response.results,
      searchClicked: true,
    });
  };

  render() {
    const { categories, searchResult, searchClicked } = this.state;
    return (
      <div className="container-all-page">
        <Header />
        <div className="container-all">
          <aside className="lateral-menu">
            <h2>Categorias</h2>
            {
              categories.map((categorie) => (
                <button
                  data-testid="category"
                  key={ categorie.name }
                  onClick={ async () => {
                    const response = await
                    getProductsFromCategoryAndQuery(categorie.id, '');
                    this.setState({
                      searchResult: response.results,
                      searchClicked: true,
                    });
                  } }
                >
                  {categorie.name}
                </button>
              ))
            }
          </aside>

          {searchClicked === false
            ? (
              <div className="teste">
                <p
                  className="instrucao"
                  data-testid="home-initial-message "
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
                <div className="container-search">
                  <label>
                    <input
                      className="form-control"
                      type="text"
                      data-testid="query-input"
                      name="searchInput"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    className="btn btn-primary"
                    data-testid="query-button"
                    onClick={ this.handleClick }
                  >
                    Pesquisar
                  </button>
                  <Link
                    className="hiden-link"
                    to="/carrinho-de-compras"
                    data-testid="shopping-cart-button"
                  >
                    <p className="hiden-link">Carrinho de Compras</p>
                  </Link>
                </div>
              </div>
            )
            : (
              <div className="teste2">
                <div className="container-search">
                  <label>
                    <input
                      className="form-control"
                      type="text"
                      data-testid="query-input"
                      name="searchInput"
                      onChange={ this.handleChange }
                    />
                  </label>
                  <button
                    className="btn btn-primary"
                    data-testid="query-button"
                    onClick={ this.handleClick }
                  >
                    Pesquisar
                  </button>
                  <Link
                    className="hiden-link"
                    to="/carrinho-de-compras"
                    data-testid="shopping-cart-button"
                  >
                    <p className="hiden-link">Carrinho de Compras</p>
                  </Link>
                </div>
                {
                  searchResult.length > 0 ? (
                    <ul className="product-card">
                      {
                        searchResult.map((result) => (
                          <li
                            className="card"
                            key={ result.id }
                            data-testid="product"
                          >
                            <Link
                              className="link"
                              data-testid="product-detail-link"
                              to={ `/product/${result.id}` }
                            >
                              <h2 className="card-title">{result.title}</h2>
                              <img
                                className="card-img"
                                src={ `${result.thumbnail}` }
                                alt="product-img"
                              />
                              <p className="card-price">
                                R$:
                                {` ${result.price}`}
                              </p>
                            </Link>
                            <button
                              className="btn-card-product"
                              type="button"
                              data-testid="product-add-to-cart"
                              onClick={ () => addProduct(result) }
                            >
                              Adicionar ao Carrinho
                            </button>
                          </li>
                        ))
                      }
                    </ul>
                  ) : <p>Nenhum produto foi encontrado</p>
                }
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Home;
