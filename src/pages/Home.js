import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';

class Home extends React.Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
    return (
    //    {!search  undefined ? <p data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</p> : <h1>''</h1>  }
      <section>
        <form>
          <label>
            <input
              type="search"
              name="search"
              value={ search }
              onChange={ this.handleChange }
            />
          </label>
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
        <Menu />
      </section>
    //   <search data-testid="home-initial-message"> Digite algum termo de pesquisa ou escolha uma categoria. </search>
    );
  }
}
export default Home;
