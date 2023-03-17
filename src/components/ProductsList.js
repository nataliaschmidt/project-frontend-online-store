import React from 'react';
import PropTypes from 'prop-types';

class ProductsList extends React.Component {
  render() {
    const { products } = this.props;
    const result = products.results;
    return (
      <div>
        {
          result && result.length > 0 ? result.map((product) => (
            // title, price e thumbnail
            <div data-testid="product" key={ product.id }>
              <h3>{ product.title }</h3>
              <img src={ product.thumbnail } alt={ product.title } />
              <h3>{ product.price }</h3>
            </div>
          )) : <p> Nenhum produto foi encontrado </p>
        }
      </div>
    );
  }
}
export default ProductsList;

ProductsList.propTypes = {
  products: PropTypes.shape().isRequired,
};
