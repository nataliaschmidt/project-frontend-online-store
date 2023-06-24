import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './Checkout.css';

class Checkout extends React.Component {
  state = {
    keyStorage: [],
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    radio: '',
    error: false,
  };

  componentDidMount() {
    const value = JSON.parse(localStorage.getItem('productsLocalStorage'));
    this.setState({ keyStorage: value });
  }

  handeChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const {
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      radio,
    } = this.state;
    const validate = name && email && cpf && phone && cep && address && radio;
    const { history } = this.props;
    if (!validate) {
      this.setState({ error: true });
    } else {
      localStorage.removeItem('productsLocalStorage');
      // return <Redirect to="/" />;
      history.push('/');
      const storage = 'productsLocalStorage';

      if (!JSON.parse(localStorage.getItem(storage))) {
        localStorage.setItem(storage, JSON.stringify([]));
      }
    }
  };

  render() {
    const { keyStorage,
      name,
      email,
      cpf,
      phone,
      cep,
      address,
      error,
    } = this.state;
    return (
      <>
        <Header />
        <div className="container-all">
          {
            keyStorage.length > 0
              ? (
                <div className="container-all-itens">
                  {
                    keyStorage.map((product) => (
                      <div
                        key={ product.product.id }
                        className="card-product-shopping-card"
                      >
                        <p>
                          {product.product.title}
                        </p>
                        <img
                          className="card-img"
                          src={ `${product.product.thumbnail}` }
                          alt="product-img"
                        />
                        <p>
                          {product.quantity}
                        </p>
                      </div>
                    ))
                  }
                </div>
              ) : null
          }
          <form className="form-checkout">
            <h3>Dados para envio</h3>
            <label className="form-label">
              Nome:
              <input
                className="form-control"
                onChange={ this.handeChange }
                value={ name }
                type="text"
                name="name"
                data-testid="checkout-fullname"
              />
            </label>

            <label className="form-label">
              Email:
              <input
                className="form-control"
                onChange={ this.handeChange }
                value={ email }
                type="email"
                name="email"
                data-testid="checkout-email"
              />
            </label>

            <label className="form-label">
              CPF:
              <input
                className="form-control"
                onChange={ this.handeChange }
                value={ cpf }
                type="text"
                name="cpf"
                data-testid="checkout-cpf"
              />
            </label>

            <label className="form-label">
              Telefone:
              <input
                className="form-control"
                onChange={ this.handeChange }
                value={ phone }
                type="text"
                name="phone"
                data-testid="checkout-phone"
              />
            </label>

            <label className="form-label">
              CEP:
              <input
                className="form-control"
                onChange={ this.handeChange }
                value={ cep }
                type="text"
                name="cep"
                data-testid="checkout-cep"
              />
            </label>

            <label className="form-label">
              Endereço:
              <input
                className="form-control"
                onChange={ this.handeChange }
                value={ address }
                type="text"
                name="address"
                data-testid="checkout-address"
              />
            </label>

            <label className="form-label">
              Forma de Pagamento:
              <label htmlFor="payment1" className="form-check-label">
                <input
                  className="form-check-input"
                  onChange={ this.handeChange }
                  value="boleto"
                  type="radio"
                  name="radio"
                  id="payment1"
                  data-testid="ticket-payment"
                />
                Boleto
              </label>

              <label htmlFor="payment2" className="form-check-label">
                <input
                  className="form-check-input"
                  onChange={ this.handeChange }
                  value="visa"
                  type="radio"
                  name="radio"
                  id="payment2"
                  data-testid="visa-payment"
                />
                Visa
              </label>

              <label htmlFor="payment3" className="form-check-label">
                <input
                  className="form-check-input"
                  onChange={ this.handeChange }
                  value="mastercard"
                  type="radio"
                  name="radio"
                  id="payment3"
                  data-testid="master-payment"
                />
                MasterCard
              </label>

              <label htmlFor="payment4" className="form-check-label">
                <input
                  className="form-check-input"
                  onChange={ this.handeChange }
                  value="elo"
                  type="radio"
                  name="radio"
                  id="payment4"
                  data-testid="elo-payment"
                />
                Elo
              </label>
            </label>

            <button
              className="btn btn-primary"
              // disabled={ !validate }
              type="button"
              onClick={ this.handleClick }
              data-testid="checkout-btn"
            >
              Finalizar
            </button>
          </form>
          {
            error ? <p data-testid="error-msg">Campos inválidos</p> : null
          }
        </div>
      </>
    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Checkout;
