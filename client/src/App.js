import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CourseListPage from './pages/CourseListPage';
import CourseInfoPage from './pages/CourseInfoPage';

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route path="/" component={CourseListPage} exact={true} />
            <Route path="/information/*" component={CourseInfoPage} exact={true} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default App;