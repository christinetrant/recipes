// Import Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddRecipeButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
			<div className='nav'>
				<Link
					to='/create'
					className='add-button btn'
					// state={this.props.loadRecipe}
				>
					Add New Recipe
				</Link>
			</div>
		);
  }
}

export default AddRecipeButton;
