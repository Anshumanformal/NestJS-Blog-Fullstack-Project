import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import HomeComponent from './views/Home'
import EditComponent from './components/Post/Edit';
import CreateComponent from './components/Post/Create';
import PostComponent from './components/Post/Post';

const AppRouter = () => {
  return (
    <Router>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route path="/home" component={HomeComponent} />
      <Route path="/create" component={CreateComponent} />
      <Route path="/edit/:id" component={EditComponent} />
      <Route path="/post/:id" component={PostComponent} />
    </Router>
  );
};

export default AppRouter;
