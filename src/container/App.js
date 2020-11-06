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

// FIX: Fixed nav on homepage
// TODO: category background card not color!
// TODO: use infinite scroll rather than SCROLL
// TODO: Images for recipes
// TIDYUP: Loop through object to create nav buttons {['Breakfast', 'breakfast'], []} etc
// TIDYUP: Don't show empty json objects!!!
// TIDYUP: Split css into corresponding files

class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: recipes,
      searchBox: '',
      category: 'all'
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
    console.log(category);
  };

  render() {
    const { recipes, searchBox, category } = this.state;
    // let num = [];
    const filterRecipes = recipes.filter(recipe => {
      let filteredValue = '';
      if (recipe.category.toLowerCase() === category.toLowerCase()) {
        filteredValue = recipe.title
          .toLowerCase()
          .includes(searchBox.toLowerCase());
        // console.log(recipe);
        // num.push(recipe);
        // console.log('cat:', category, 'recipes', this.state.count, num);
      } else if (category.toLowerCase() === 'all' || '') {
        filteredValue = recipe.title
          .toLowerCase()
          .includes(searchBox.toLowerCase());
      }
      // this.setState({ count: num.length });
      return filteredValue;
    });
    console.log(filterRecipes.length);
    // this.recipeCount(count);
    // console.log('count', count);
    // this.state.count = count;
    // console.log(this.state.count, num.length);
    // this.setNum(num);

    const renderHomepage = () => {
      if (filterRecipes.length === 0) {
        return (
          <>
            <Nav
              onSearchChange={this.onSearchChange}
              onFilterChange={this.onFilterChange}
            />
            <div className='App'>
              <h1>Loading</h1>
            </div>
          </>
        );
      } else {
        return (
          <>
            <Nav
              onSearchChange={this.onSearchChange}
              onFilterChange={this.onFilterChange}
            />
            <CardList recipes={filterRecipes} recipe={this.state.recipe} />
          </>
        );
      }
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
