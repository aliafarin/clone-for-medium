import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import "./Styles.css";
import history from "../history";
import PrivateRoute from "./PrivateRoute";
import NavBar from "./NavBar";
import Home from './Home';
import LoginPage from "./LoginPage";
import ListArticles from "./articles/ListArticles";
import DisplayArticle from './articles/DisplayArticle';
import CreateArticle from './articles/CreateArticle';
import EditArticle from './articles/EditArticle';
import DeleteArticle from './articles/DeleteArticle';

import Footer from './Footer';



class App extends React.Component {

  render() {
    return(
      <div>

        <Router history={history}>
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/articles" exact component={ListArticles} />
            <PrivateRoute path="/articles/create" exact component={CreateArticle} />
            <PrivateRoute path="/articles/:id" exact component={DisplayArticle} />
            <PrivateRoute path="/articles/edit/:id" exact component={EditArticle} />
            <PrivateRoute path="/articles/delete/:id" exact component={DeleteArticle} />
          </Switch>
          <Footer />
        </Router>
        
      </div>
    );
  }

}


export default App;