import React from 'react';
import PropTypes from 'prop-types';

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

      <div>
        {
          keyStorage.length > 0
            ? (
              <div>
                {
                  keyStorage.map((product) => (
                    <div key={ product.product.id }>
                      <p>
                        {product.product.title}
                      </p>
                      <p>
                        {product.quantity}
                      </p>
                    </div>
                  ))
                }
              </div>
            ) : null
        }
        <form>
          <input
            placeholder="Nome"
            onChange={ this.handeChange }
            value={ name }
            type="text"
            name="name"
            data-testid="checkout-fullname"
          />
          <input
            placeholder="Email"
            onChange={ this.handeChange }
            value={ email }
            type="email"
            name="email"
            data-testid="checkout-email"
          />
          <input
            placeholder="CPF"
            onChange={ this.handeChange }
            value={ cpf }
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
          />
          <input
            placeholder="Telefone"
            onChange={ this.handeChange }
            value={ phone }
            type="text"
            name="phone"
            data-testid="checkout-phone"
          />
          <input
            placeholder="CEP"
            onChange={ this.handeChange }
            value={ cep }
            type="text"
            name="cep"
            data-testid="checkout-cep"
          />
          <input
            placeholder="Endereço"
            onChange={ this.handeChange }
            value={ address }
            type="text"
            name="address"
            data-testid="checkout-address"
          />
          <label htmlFor="payment1">
            Boleto
            <input
              onChange={ this.handeChange }
              value="boleto"
              type="radio"
              name="radio"
              id="payment1"
              data-testid="ticket-payment"
            />
          </label>
          <label htmlFor="payment2">
            Visa
            <input
              onChange={ this.handeChange }
              value="visa"
              type="radio"
              name="radio"
              id="payment2"
              data-testid="visa-payment"
            />
          </label>
          MasterCard
          <label htmlFor="payment3">
            <input
              onChange={ this.handeChange }
              value="mastercard"
              type="radio"
              name="radio"
              id="payment3"
              data-testid="master-payment"
            />
          </label>
          <label htmlFor="payment3">
            Elo
            <input
              onChange={ this.handeChange }
              value="elo"
              type="radio"
              name="radio"
              id="payment4"
              data-testid="elo-payment"
            />
          </label>
          <button
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

    );
  }
}
Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Checkout;
