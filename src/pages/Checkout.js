import React from 'react';

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
  };

  componentDidMount() {
    const value = JSON.parse(localStorage.getItem('productsLocalStorage'));
    this.setState({ keyStorage: value });
  }

  handeChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { keyStorage, name, email, cpf, phone, cep, address } = this.state;
    console.log(keyStorage);
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
            onChange={ this.handeChange }
            value={ name }
            type="text"
            name="name"
            data-testid="checkout-fullname"
          />
          <input
            onChange={ this.handeChange }
            value={ email }
            type="email"
            name="email"
            data-testid="checkout-email"
          />
          <input
            onChange={ this.handeChange }
            value={ cpf }
            type="text"
            name="cpf"
            data-testid="checkout-cpf"
          />
          <input
            onChange={ this.handeChange }
            value={ phone }
            type="text"
            name="phone"
            data-testid="checkout-phone"
          />
          <input
            onChange={ this.handeChange }
            value={ cep }
            type="text"
            name="cep"
            data-testid="checkout-cep"
          />
          <input
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
            data-testid="checkout-btn"
          >
            Finalizar
          </button>
        </form>
      </div>

    );
  }
}
export default Checkout;
