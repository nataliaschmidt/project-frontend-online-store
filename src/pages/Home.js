import React from 'react';

class Home extends React.Component {
  state = {
    search: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
    if (!search) {
      return (
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      );
    }
    return (
    //    {!search  undefined ? <p data-testid="home-initial-message">Digite algum termo de pesquisa ou escolha uma categoria.</p> : <h1>''</h1>  }

      <form>
        <label>
          <input
            type="search"
            name="search"
            value={ search }
            onChange={ this.handleChange }
          />

        </label>
      </form>
    //   <search data-testid="home-initial-message"> Digite algum termo de pesquisa ou escolha uma categoria. </search>
    );
  }
}
export default Home;
