import React, { Component } from 'react';
import Card from './Card';

class CardList extends Component {
  constructor(props) {
    super(props);
  }

  // ({recipes}) => {
  render() {
    const { recipes } = this.props;
    return (
      <div className='card-list'>
        {recipes.map((recipe, i) => {
          return (
            <Card
              key={recipe.id}
              // id={recipe.id}
              // title={recipe.title}
              // category={recipe.category}
              // tags={recipe.tags}
              recipe={recipe}
            />
          );
        })}
      </div>
    );
  }
}

export default CardList;
