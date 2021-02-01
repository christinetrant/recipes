// Import Core
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Import Components
import AddRecipeButton from './Buttons/AddRecipeButton';
import AddRecipe from './AddRecipe';
import CardInfo from './CardInfo';

class WelcomePage extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <>
        {this.props.renderHeader()}
        <Router>
          <Switch>
            <Route
              path='/'
              exact
              render={() => {
                return (
                  <>
                    <AddRecipeButton />
                    <div className='message-div bg'>
                      <h1 className='message'>no recipes have been added!</h1>
                    </div>
                  </>
                );
              }}
            />
            <Route exact path='/create' component={AddRecipe} />
            <Route path='/:id' component={CardInfo} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default WelcomePage;
