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
          return <Card key={recipe.id} recipe={recipe} />;
        })}
      </div>
    );
  }
}

export default CardList;
