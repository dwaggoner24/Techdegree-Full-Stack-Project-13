import React, {Component} from 'react';
import {
  BrowserRouter,
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

import PrivateRoute from './PrivateRoute';

//New Imports
import withContext from './Context';

const UserSignUpWithContext = withContext(UserSignUp);

class App extends Component { 
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route exact path="/" element={<Courses />} />
            <Route path="/signin" element={<UserSignIn />} />
            <Route path="/signup" element={<UserSignUpWithContext />} />\
            <Route path="/signout" element={<UserSignOut />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route component={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      );
    }
}

export default App;
