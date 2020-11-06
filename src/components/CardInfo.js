import React, { Component, Route } from 'react';

class CardInfo extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const recipe = this.props.location.state;
    return (
      <>
        <p>{recipe.title}</p>
        {console.log(recipe)}
      </>
    );
  }
}

export default CardInfo;
