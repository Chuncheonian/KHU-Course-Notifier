import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CourseListPage from './pages/CourseListPage';
import CourseInfoPage from './pages/CourseInfoPage';

class App extends Component {
  render() {
    return (
      <>
        <Route path="/" component={CourseListPage} exact={true} />
        <Route path="/information:*" component={CourseInfoPage} exact={true} />
      </>
    );
  }
}

export default App;