import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route, 
} from 'react-router-dom';

//Components
import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />

          <Routes>
            <Route exact path="/courses" component={Courses} />
            <Route path="/signin" component={UserSignIn} />
            <Route path="/signup" component={UserSignUp} />\
            <Route path="/signout" component={UserSignOut} />
            <Route path="/courses/:id/update" component={UpdateCourse} />
            <Route path="/courses/create" component={CreateCourse} />
            <Route path="/courses/:id" component={CourseDetail} />
            <Route component={NotFound} />
          </Routes>
        </div>
      </Router>
      );
    }
}

export default App;