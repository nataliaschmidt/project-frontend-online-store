import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

  increaseProduct = (productObj) => {
    const storage = 'productsLocalStorage';
    const getStorage = JSON.parse(localStorage.getItem(storage));
    const verification = getStorage
      .find((product) => product.product.id === productObj.product.id);
    verification.quantity += 1;
    localStorage.setItem(storage, JSON.stringify(getStorage));

    const newGetStorage = JSON.parse(localStorage.getItem(storage));
    this.setState({
      products: newGetStorage,
    });
  };

  removeProduct = (productObj) => {
    // console.log(`Esse é meu objeto parametro ${productObj}`);
    const storage = 'productsLocalStorage';
    const getStorage = JSON.parse(localStorage.getItem(storage));
    // console.log(getStorage);
    const newLocalStorage = getStorage
      .filter((product) => product.product.id !== productObj.product.id);
    localStorage.setItem(storage, JSON.stringify(newLocalStorage));
    this.setState({
      products: newLocalStorage,
    });
  };

  decreaseProduct = (productObj) => {
    const storage = 'productsLocalStorage';
    const getStorage = JSON.parse(localStorage.getItem(storage));
    const verification = getStorage
      .find((product) => product.product.id === productObj.product.id);
    if (verification.quantity <= 1) {
      verification.quantity = 1;
    } else {
      verification.quantity -= 1;
    }
    localStorage.setItem(storage, JSON.stringify(getStorage));

    const newGetStorage = JSON.parse(localStorage.getItem(storage));
    this.setState({
      products: newGetStorage,
    });
  };

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
                        {product.product.title}
                      </p>
                      <p data-testid="shopping-cart-product-quantity">
                        {product.quantity}
                      </p>

                      <button
                        data-testid="product-increase-quantity"
                        type="button"
                        onClick={ () => this.increaseProduct(product) }
                      >
                        +

                      </button>
                      <button
                        data-testid="product-decrease-quantity"
                        type="button"
                        onClick={ () => this.decreaseProduct(product) }
                      >
                        -

                      </button>
                      <button
                        data-testid="remove-product"
                        type="button"
                        onClick={ () => this.removeProduct(product) }
                      >
                        Excluir

                      </button>

                    </div>
                  ))
                }
              </div>
            )
        }
        <Link data-testid="checkout-products" to="/checkout">
          <button
            type="button"
          >
            Resumo da compra
          </button>
        </Link>
      </div>
    );
  }
}
export default ShopCart;
