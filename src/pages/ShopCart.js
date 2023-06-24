import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete, MdOutlineRemoveShoppingCart } from 'react-icons/md';
import { AiFillMinusSquare, AiFillPlusSquare } from 'react-icons/ai';
import Header from '../components/Header';
import './ShoppingCart.css';

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
      <>
        <Header />
        <div>
          {
            getStorage.length === 0
              ? <p data-testid="shopping-cart-empty-message" className="empty-cart">
                Seu carrinho está vazio
                {' '}
                <MdOutlineRemoveShoppingCart className="icon-empty-cart" />
              </p>
              : (
                <div className="container-all-infos">
                  {
                    products.map((product) => (
                      <div
                        key={ product.product.id }
                        className="card-product-shopping-card"
                      >
                        <p data-testid="shopping-cart-product-name">
                          {product.product.title}
                        </p>
                        <img
                          className="card-img"
                          src={ `${product.product.thumbnail}` }
                          alt="product-img"
                        />
                        <p data-testid="shopping-cart-product-quantity">
                          {product.quantity}
                        </p>
                        <div className="containet-button-card">
                          <button
                            data-testid="product-increase-quantity"
                            type="button"
                            onClick={ () => this.increaseProduct(product) }
                          >
                            <AiFillPlusSquare id="button-icon1" />

                          </button>
                          <button
                            data-testid="product-decrease-quantity"
                            type="button"
                            onClick={ () => this.decreaseProduct(product) }
                          >
                            <AiFillMinusSquare id="button-icon2" />

                          </button>
                          <button
                            data-testid="remove-product"
                            type="button"
                            onClick={ () => this.removeProduct(product) }
                          >
                            <MdDelete id="button-icon3" />

                          </button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
          }
          <Link data-testid="checkout-products" to="/checkout">
            <button
              className="btn btn-primary btn-resume"
              type="button"
            >
              Resumo da compra
            </button>
          </Link>
        </div>
      </>
    );
  }
}
export default ShopCart;
