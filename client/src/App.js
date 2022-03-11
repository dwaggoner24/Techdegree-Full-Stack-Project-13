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

class App extends Component { //modified from previous projects
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header />

          <Routes>
            <Route exact path="/" element={<Courses/>} />
            <Route path="/signin" element={<UserSignIn/>} />
            <Route path="/signup" element={<UserSignUp/>} />\
            <Route path="/signout" element={<UserSignOut/>} />
            <Route path="/courses/:id/update" element={<UpdateCourse/>} />
            <Route path="/courses/create" element={<CreateCourse/>} />
            <Route path="/courses/:id" element={<CourseDetail/>} />
            <Route elements={<NotFound/>} />
          </Routes>
        </div>
      </BrowserRouter>
      );
    }
}

export default App;
