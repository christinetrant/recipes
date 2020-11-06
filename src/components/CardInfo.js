import React, { Component } from 'react';

class CardInfo extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const recipe = this.props.location.state;
    return (
      <>
        <p>{recipe.title}</p>
        <p>{recipe.author}</p>
        <p>{recipe.category}</p>
        <p>{recipe.serves}</p>
        <p>{recipe.calories}</p>
        {console.log(recipe)}

        {recipe.ingredients.map(ingredient => {
          return <p key={ingredient}>{ingredient}</p>;
        })}

        {recipe.method.map(step => {
          return <p key={step}>{step}</p>;
        })}

        {/* <p>{recipe.tags}</p> */}

        <ul className='card-tags'>
          {recipe.tags.map(tag => {
            const classTags = tag.split(' ').join('');
            return (
              <li className={classTags} key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>

        <p>{recipe.url}</p>
        {/* image */}
      </>
    );
  }
}

export default CardInfo;
