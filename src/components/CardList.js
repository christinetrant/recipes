import React, { Component } from 'react';
import Card from './Card';

class CardList extends Component {
	constructor(props) {
		super(props)
	}
	
	// ({recipes}) => {
		render() {
			const { recipes } = this.props;
			return (
				<div className='card-list'>
				{
					recipes.map((user, i) => {
						return (
							<Card 
							key={recipes[i].id} 
							id={recipes[i].id} 
							title={recipes[i].title} 
							category={recipes[i].category} 
							tags={recipes[i].tags} 
							/>
						)
					})
				}
	   	</div>
		);
	}
}

export default CardList;