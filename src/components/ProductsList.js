import React from 'react';
import PropTypes, { object } from 'prop-types';

class ProductsList extends React.Component {
  render() {
    const { products } = this.props;
    const result = products.results;
    console.log(result);
    return (
        {
         Object.entries(result).map((product)=> {
            console.log(product);
            
        }) : <p>Nenhum produto foi encontrado</p> 
    }
    
  }
}
export default ProductsList;

ProductsList.propTypes = {
  products: PropTypes.shape({}).isRequired,
};
