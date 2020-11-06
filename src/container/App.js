// Import Core
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Import Components
import Nav from '../components/Nav';
import CardList from '../components/CardList';
import CardInfo from '../components/CardInfo';
// import SearchBox from '../components/SearchBox';
// Import Recipes JSON
import recipes from '../recipes.json';
// Import Styles
import './App.css';

// TIDYUP: Don't show empty json objects!!!
// FIX: Fixed header
// TODO: category background card not color!
// TODO: use infinite scroll rather than SCROLL
// TODO: Images for recipes
// TIDYUP: Loop through object to create nav buttons {['Breakfast', 'breakfast'], []} etc

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: recipes,
      searchBox: '',
      category: 'all'
      // recipe: {}
    };
  }

  // componentDidMount() {
  //   console.log(recipes);
  // }

  onSearchChange = event => {
    this.setState({ searchBox: event.target.value });
  };

  onFilterChange = category => {
    this.setState({ category });
  };

  // onClickShowRecipe = id => {
  //   this.setState({ recipe: id });
  //   console.log(recipe);
  // };

  render() {
    const { recipes, searchBox, category } = this.state;
    const filterRecipes = recipes.filter(recipe => {
      if (recipe.category.toLowerCase() === category.toLowerCase()) {
        return recipe.title.toLowerCase().includes(searchBox.toLowerCase());
      } else if (category.toLowerCase() === 'all' || '') {
        return recipe.title.toLowerCase().includes(searchBox.toLowerCase());
      }
    });

    const renderHomepage = () => {
      return (
        <>
          <Nav
            onSearchChange={this.onSearchChange}
            onFilterChange={this.onFilterChange}
          />
          <CardList recipes={filterRecipes} recipe={this.state.recipe} />
        </>
      );
    };

    return !recipes.length ? (
      <div className='App'>
        <h1>Loading</h1>
      </div>
    ) : (
      <div className='App'>
        <h1 className='header-title'>My Recipes</h1>
        <Router>
          <Switch>
            <Route path='/' exact render={() => renderHomepage()} />
            <Route path='/:id' component={CardInfo} />
          </Switch>
        </Router>
        {/* <Scroll> */}
        {/* <ErrorBoundary> */}
        {/* <CardList recipes={filterRecipes} /> */}
        {/* </ErrorBoundary> */}
        {/* </Scroll> */}
      </div>
    );
  }
}

export default App;
