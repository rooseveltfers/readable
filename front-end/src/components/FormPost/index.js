import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//import * as normalize from 'normalize.css'

import {
  getPost,
  changeTextTitle,
  changeTextBody,
  changeTextAuthor,
  getCategories,
  newPost,
  savePost,
  changeCategory
} from './actions'

class FormPost extends Component {

  componentDidMount() {
    this.props.getCategories()
    const param = this.props.match.params.id;
    if (param !== 'new') {
      this.props.getPost(param)
    } else {
      this.props.newPost()
    }

  }

  handleClick(e) {
    e.preventDefault();
    //console.log(this.props.categories)
    this.props.savePost(this.props.post)
    this.props.history.push('/')

  }


  render() {
    return (

      <div>
        <h2>{(this.props.match.params.id === 'new') ? 'New Post' : 'Edit post "' + this.props.post.title + '"'}</h2>
        <form>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              name="author"
              required
              onChange={(e) => this.props.changeTextAuthor(e, this.props.post)}
              placeholder="Author"
              value={this.props.post.author}
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select className="form-control" value={this.props.post.category} onChange={(e) => this.props.changeCategory(e, this.props.post)}>
              {this.props.categories.map(category => (
                <option
                  key={category.name}
                  value={category.name}
                  selected={category.name === this.props.post.category}
                >{category.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Title</label>
            <input
              required
              className="form-control"
              type="text"
              name="title"
              onChange={(e) => this.props.changeTextTitle(e, this.props.post)}
              placeholder="Title here"
              value={this.props.post.title}
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              className="form-control"
              required
              placeholder="Body"
              name="body"
              value={this.props.post.body}
              onChange={(e) => this.props.changeTextBody(e, this.props.post)}
            />
          </div>

          <button className="btn btn-info" onClick={(e) => this.handleClick(e)}>
            {(this.props.match.params.id === 'new') ? 'Save' : 'Edit'}
          </button>
        </form>
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.formPost.post,
    categories: state.formPost.categories
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPost,
  changeTextTitle,
  changeTextBody,
  changeTextAuthor,
  getCategories,
  newPost,
  savePost,
  changeCategory
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FormPost)
