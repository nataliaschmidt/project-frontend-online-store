import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export default class Form extends Component {
  state = {
    email: '',
    textArea: '',
    radio: '',
    error: false,
    // product: {},
  };

  componentDidMount() {
    const { product } = this.props;
    console.log(product);
    // this.setState({
    //   product,
    // }, () => console.log(this.state.product) );

    if (!JSON.parse(localStorage.getItem(`${product.id}`))) {
      localStorage.setItem(`${product.id}`, JSON.stringify([]));
    }
    // console.log(product);
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = () => {
    const { email, textArea, radio } = this.state;
    const { product } = this.props;
    const regExpEmail = /^[a-z0-9.]+@[a-z0-9]+.[a-z]+.[a-z]?$/i;
    const checkEmail = regExpEmail.test(email);
    const Obj = {
      email,
      rating: radio,
      text: textArea,
    };
    if (email && checkEmail && radio) {
      const getLocalStorage = JSON.parse(localStorage.getItem(`${product.id}`));
      const newLocalStorage = [...getLocalStorage, Obj];
      localStorage.setItem(`${product.id}`, JSON.stringify(newLocalStorage));
      this.setState({
        email: '',
        textArea: '',
        radio: '',
        error: false,
      });
    } else {
      this.setState({
        error: true,
        errorMsg: 'Campos inválidos',
      });
    }
  };

  render() {
    const { email, textArea, error, errorMsg } = this.state;
    const { product } = this.props;
    const getLocalStorage = JSON.parse(localStorage.getItem(`${product.id}`));
    return (
      <>
        <form className="form">

          <h3>Deixe sua Avaliação</h3>
          <label htmlFor="email" className="form-label">
            Email:
            <input
              className="form-control"
              data-testid="product-detail-email"
              type="email"
              id="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>

          <label className="label-rating">
            Nota:
            <label htmlFor="radio1" className="form-check-label">
              <input
                className="form-check-input"
                data-testid="1-rating"
                type="radio"
                name="radio"
                id="radio1"
                value="1"
                onChange={ this.handleChange }
              />
              1
            </label>

            <label htmlFor="radio2" className="form-check-label">
              <input
                className="form-check-input"
                data-testid="2-rating"
                type="radio"
                name="radio"
                id="radio2"
                value="2"
                onChange={ this.handleChange }
              />
              2
            </label>

            <label htmlFor="radio3" className="form-check-label">
              <input
                className="form-check-input"
                data-testid="3-rating"
                type="radio"
                name="radio"
                id="radio3"
                value="3"
                onChange={ this.handleChange }
              />
              3
            </label>

            <label htmlFor="radio4" className="form-check-label">
              <input
                className="form-check-input"
                data-testid="4-rating"
                type="radio"
                name="radio"
                id="radio4"
                value="4"
                onChange={ this.handleChange }
              />
              4
            </label>

            <label htmlFor="radio5" className="form-check-label">
              <input
                className="form-check-input"
                data-testid="5-rating"
                type="radio"
                name="radio"
                id="radio5"
                value="5"
                onChange={ this.handleChange }
              />
              5
            </label>
          </label>
          <textarea
            data-testid="product-detail-evaluation"
            name="textArea"
            rows="10"
            value={ textArea }
            className="form-control"
            placeholder="Deixe seu comentário"
            onChange={ this.handleChange }
          />

          <button
            className="btn btn-primary"
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.onSubmit }
          >
            Enviar
          </button>

          {error && <p data-testid="error-msg">{errorMsg}</p>}
        </form>
        <div className="container-evaluetion">
          <h3>Avaliações do Produto</h3>
          {
            getLocalStorage && getLocalStorage
              .map((evaluetion) => (
                <div key={ evaluetion.email } className="container-box">
                  <p data-testid="review-card-email">{`Usuário: ${evaluetion.email}`}</p>
                  <p data-testid="review-card-rating">{`Nota: ${evaluetion.rating}`}</p>
                  <p data-testid="review-card-evaluation">
                    {`Comentário: ${evaluetion.text}`}
                  </p>
                </div>))
          }

        </div>
      </>
    );
  }
}

Form.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
