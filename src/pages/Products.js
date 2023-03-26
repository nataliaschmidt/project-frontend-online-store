import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import addProduct from '../services/LocalStorage';
import Form from '../components/Form';
import Header from '../components/Header';

class Products extends React.Component {
  state = {
    product: {},
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getProductById(id);
    this.setState({ product: data });
  }

  render() {
    // console.log(this.props);
    const { product } = this.state;
    // console.log(product);
    return (
      <>
        <Header />
        <div>
          <h2 data-testid="product-detail-name">{product.title}</h2>
          <img
            data-testid="product-detail-image"
            src={ `${product.thumbnail}` }
            alt="product-img"
          />
          <p data-testid="product-detail-price">
            R$:
            {` ${product.price}`}
          </p>
          <button
            type="button"
          >
            <Link
              data-testid="shopping-cart-button"
              to="/carrinho-de-compras"
            >
              Carrinho de Compras

            </Link>
          </button>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => addProduct(product) }
          >
            Adicionar ao Carrinho
          </button>
          <div>
            {
              product.id && <Form
                product={ product }
              />
            }
          </div>
        </div>
      </>
    );
  }
}
Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
export default Products;
