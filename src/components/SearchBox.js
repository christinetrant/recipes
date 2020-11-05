import React from 'react';

const SearchBox = ({searchChange}) => {
	return (
		<input 
			type='search' 
			placeholder='search for recipe' 
			className='search-input' 
			onChange={searchChange}
		/>
	);
}

export default SearchBox;