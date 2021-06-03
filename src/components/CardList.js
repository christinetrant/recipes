// Import Core
import React, { Component } from 'react';
// Import Components
import Card from './Card';

class CardList extends Component {
  // constructor(props) {
  //   super(props);
  // }

  // ({recipes}) => {
  render() {
    const { recipes } = this.props;
    console.log('propsssss', this.props);
    return (
      <div className='bg'>
        <div className='card-list'>
          {recipes.map((recipe, i) => {
            return (
							<Card
								key={recipe.recipe_id}
								recipe={recipe}
								deleteRecipes={this.props.deleteRecipes}
								editRecipe={this.props.editRecipe}
							/>
						);
          })}
        </div>
      </div>
    );
  }
}

export default CardList;
