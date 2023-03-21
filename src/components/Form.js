import React, { Component } from 'react';

export default class Form extends Component {
  state = {
    email: '',
    textArea: '',
    radio: '',
    error: false,
    product: {},
  };

  componentDidMount() {
    const { product } = this.props;
    this.setState({
      product,
    });

    if (!JSON.parse(localStorage.getItem(`${product.id}`))) {
      localStorage.setItem(`${product.id}`, JSON.stringify([]));
    }
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleErrors = () => {
    const { email, textArea } = this.state;
    const regExpEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.[a-z]?$/i;
    const checkEmail = regExpEmail.test(email);
    const validate = email && textArea;
    if (!validate || !checkEmail) {
      this.setState({
        error: true,
        errorMsg: 'Campos inválidos',
      });
    }
  };

  onSubmit = () => {
    this.handleErrors();
    const { email, textArea, radio, product, error } = this.state;
    const Obj = {
      email,
      rating: radio,
      text: textArea,
    };
    const getLocalStorage = JSON.parse(localStorage.getItem(`${product.id}`));
    const newLocalStorage = [...getLocalStorage, Obj];
    localStorage.setItem(`${product.id}`, JSON.stringify(newLocalStorage));
    this.setState({
      email: '',
      textArea: '',
      radio: '',
    });

    if (error) {
      this.setState({
        error: false,
      });
    }
  };

  render() {
    const { email, textArea, radio, error, errorMsg } = this.state;
    return (
      <form>
        <label htmlFor="email">
          <input
            data-testid="product-detail-email"
            type="email"
            id="email"
            name="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="radio1">
          <input
            data-testid="1-rating"
            type="radio"
            name="radio"
            id="radio1"
            value="1"
            onChange={ this.handleChange }
          />
        </label>
        1
        <label htmlFor="radio2">
          <input
            data-testid="2-rating"
            type="radio"
            name="radio"
            id="radio2"
            value="2"
            onChange={ this.handleChange }
          />
        </label>
        2
        <label htmlFor="radio3">
          <input
            data-testid="3-rating"
            type="radio"
            name="radio"
            id="radio3"
            value="3"
            onChange={ this.handleChange }
          />
          3
        </label>
        <label htmlFor="radio4">
          <input
            data-testid="4-rating"
            type="radio"
            name="radio"
            id="radio4"
            value="4"
            onChange={ this.handleChange }
          />
          4
        </label>
        <label htmlFor="radio5">
          <input
            data-testid="5-rating"
            type="radio"
            name="radio"
            id="radio5"
            value="5"
            onChange={ this.handleChange }
          />
          5
        </label>

        <textarea
          data-testid="product-detail-evaluation"
          name="textArea"
          value={ textArea }
          onChange={ this.handleChange }
        />

        <button
          data-testid="submit-review-btn"
          type="button"
          onClick={ this.onSubmit }
        >
          Enviar
        </button>

        <div data-testid="error-msg">
          { error && <p>{errorMsg}</p> }
        </div>

      </form>
    );
  }
}
