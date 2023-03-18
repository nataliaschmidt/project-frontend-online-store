import React from 'react';
import { getCategories, getProductsFromCategoryId } from '../services/api';

class Menu extends React.Component {
  state = {
    categories: [],
    searchResults: [],
    searchClicked: false,
  };

  componentDidMount() {
    this.fetchGetCategories();
  }

  fetchGetCategories = async () => {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  };

  render() {
    const { categories, searchClicked, searchResults } = this.state;
    // console.log(searchResults);
    return (
      <section>
        {categories.map((categorie) => (
          <label data-testid="category" key={ categorie.id } htmlFor="input-radio">
            <button
              type="button"
              onClick={ async () => {
                const data = await getProductsFromCategoryId(categorie.id);
                this.setState({
                  searchResults: data.results,
                  searchClicked: true,
                });
              } }
            >
              { categorie.name }
            </button>
          </label>
        ))}
        {
          searchClicked && searchResults.map((product) => (
            <div data-testid="product" key={ product.id }>
              <h3>{ product.title }</h3>
              <img src={ product.thumbnail } alt={ product.title } />
              <h3>{ product.price }</h3>
            </div>
          ))
        }
      </section>
    );
  }
}
export default Menu;
