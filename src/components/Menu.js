import React from 'react';
import { getCategories } from '../services/api';

class Menu extends React.Component {
  state = {
    categories: [],
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
    const { categories } = this.state;
    return (
      <section>
        {categories.map((categorie) => (
          <label data-testid="category" key={ categorie.id } htmlFor="input-radio">
            <input
              type="radio"
              id="input-radio"
            />
            { categorie.name }
          </label>
        ))}
      </section>
    );
  }
}
export default Menu;
