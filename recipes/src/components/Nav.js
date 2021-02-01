// Import Core
import React, { Component } from 'react';
// Import Components
import SearchBox from './SearchBox';
import AddRecipeButton from './Buttons/AddRecipeButton';
// Import Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUtensils,
  faAppleAlt,
  faHamburger,
  faIceCream,
  faCookie,
  faGlassMartiniAlt
} from '@fortawesome/free-solid-svg-icons';

class Nav extends Component {
  renderButtons = () => {
    const buttonCategories = [
      ['all', faUtensils, 'All'],
      ['breakfast', faAppleAlt, 'Breakfast'],
      ['main', faHamburger, 'Main'],
      ['dessert', faIceCream, 'Dessert'],
      ['snacks', faCookie, 'Snacks'],
      ['drinks', faGlassMartiniAlt, 'Drinks']
    ];

    let buttons = buttonCategories.map(button => {
      return (
        <div key={button[0]} className='nav-item'>
          <button
            className='nav-button btn'
            onClick={() => this.props.onFilterChange(button[0])}
          >
            <FontAwesomeIcon className='nav-icon' icon={button[1]} />
          </button>
          <span>{button[2]}</span>
        </div>
      );
    });

    return buttons;
  };

  renderNav() {
    return (
      <div className='nav'>
        <SearchBox searchChange={this.props.onSearchChange} />
        <nav className='filter-categories'>{this.renderButtons()}</nav>

        <div>
          {/* <button
            className=''
            onClick={() => console.log('Add recipe')}
          ></button> */}
          {/* <span>Add Recipe</span> */}

          {/* <Link
            to='/create'
            className='add-button btn'
            // className='card-link-wrapper'
          >
            Add New Recipe
          </Link> */}
          <AddRecipeButton />

          {/* <AddRecipe show={this.state.show} handleClose={this.hideModal}>
            <p>Modal</p>
            <p>Data</p>
          </AddRecipe>
          <button type='button' onClick={this.showModal}>
            New Recipe
          </button> */}
        </div>
      </div>
    );
  }

  render() {
    return this.renderNav();
  }
}

export default Nav;
