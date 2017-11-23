import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

import Categories from './components/Categories'
import Posts from './components/Posts'
import Post from './components/Post'
import Category from './components/Category'
import FormPost from './components/FormPost'

class App extends Component {


  render() {
    return (
      <div className="container">


        <Route exact path="/" render={() => (

          <div className="col-sm-12">
            <div className="col-sm-8">
              <Posts />
            </div>
            <div className="col-sm-4">
              <Categories />
            </div>
          </div>
        )} />

        <Route exact path="/post/:id" component={Post} />
        <Route exact path="/category/:id" component={Category} />
        <Route exact path="/formPost/:id" component={FormPost} />


      </div>
    );
  }
}

export default App
