import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import CategoryListReducer from './components/Categories/reducer'
import PostsReducer from './components/Posts/reducer'
import PostReducer from './components/Post/reducer'
import FormPostReducer from './components/FormPost/reducer'

const reducers = combineReducers({
  categories: CategoryListReducer,
  posts: PostsReducer,
  formPost: FormPostReducer,
  post: PostReducer
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


const store = applyMiddleware(promise)(createStore)(reducers, devTools)


ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

  ,document.getElementById('root'));
registerServiceWorker();
