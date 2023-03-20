import React, { Component } from 'react';

class ShopCart extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    const storage = 'productsLocalStorage';
    const getStorage = JSON.parse(localStorage.getItem(storage));
    // console.log(getStorage);
    this.setState({ products: getStorage });
  }

  render() {
    const { products } = this.state;
    // console.log(products);
    const storage = 'productsLocalStorage';
    const getStorage = JSON.parse(localStorage.getItem(storage));
    return (
      <div>
        {
          getStorage.length === 0
            ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            : (
              <div>
                {
                  products.map((product) => (
                    <div key={ product.product.id }>
                      <p data-testid="shopping-cart-product-name">
                        { product.product.title }
                      </p>
                      <p data-testid="shopping-cart-product-quantity">
                        { product.quantity}
                      </p>

                    </div>
                  ))
                }
              </div>
            )
        }
      </div>
    );
  }
}
export default ShopCart;
