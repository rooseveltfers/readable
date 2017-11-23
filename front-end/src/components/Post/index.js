import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as moment from 'moment'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

//import * as normalize from 'normalize.css'

import {
  getPost,
  getComments,
  getNewComment,
  changeTextAuthor,
  changeTextComment,
  saveComment,
  deleteComment,
  getComment,
  voteCommentUp,
  voteCommentDown,
  deletePost,
  votePostUp,
  votePostDown
} from './actions'

class Post extends Component {

  componentWillMount() {
    //this.props.getPost()
    const postId = this.props.match.params.id
    //console.log('postId: ', postId)
    this.props.getPost(postId)
    this.props.getComments(postId)
    this.props.getNewComment(postId)
  }

  handleClick(e) {
    e.preventDefault();
    this.props.saveComment(this.props.comment);
    this.props.getNewComment(this.props.comment.parentId)
  }

  actionComment(e, comment) {
    e.preventDefault();
    //console.log(e.target.name)
    //console.log(comment)

    switch (e.target.name) {
      case "edit":
        this.props.getComment(comment.id)
        break;

      case "delete":
        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to delete?',
          confirmLabel: 'Yes',
          cancelLabel: 'No',
          onConfirm: () => this.props.deleteComment(comment),
          onCancel: () => console.log('canceled')
        })

        break;

      case "up":
        this.props.voteCommentUp(comment)
        break;

      case "down":
        this.props.voteCommentDown(comment)
        break;

      default:
        break;
    }

  }

  actionPost(e, post) {
    e.preventDefault();

    switch (e.target.name) {
      case "edit":
        this.props.history.push(`/formPost/${this.props.post.id}`)
        break;

      case "delete":

        confirmAlert({
          title: 'Confirm to delete',
          message: 'Are you sure to delete?',
          confirmLabel: 'Yes',
          cancelLabel: 'No',
          onConfirm: () => {
            this.props.deletePost(this.props.post.id)
            this.props.history.push('/')
          },
          onCancel: () => console.log('canceled')
        })

        break;

      case "up":
        this.props.votePostUp(this.props.post)
        break;

      case "down":
        this.props.votePostDown(this.props.post)
        break;

      default:
        break;
    }

  }

  render() {
    return (
      <div>

        <h2>{this.props.post.title}</h2>
        <div style={{ float: 'right' }}>
          <button className="btn btn-info btn-sm" name="edit" onClick={(e) => this.actionPost(e)}>Edit</button>
          <button className="btn btn-danger btn-sm" name="delete" onClick={(e) => this.actionPost(e)}>Delete</button>
        </div>

        <div className="card" style={{ marginTop: 20 }}>
          <div className="card-subtitle">
            Author: {this.props.post.author}, created at: {moment(this.props.post.timestamp).format("MM/DD/YYYY")}<br />
            Category: {this.props.post.category}
          </div>
          <div className="card-body" style={{ marginTop: 20, marginBottom: 20 }}>
            {this.props.post.body}
          </div>
          <div className="card-footer">
            Vote Score: {this.props.post.voteScore}<br />
            <button className="btn btn-info" name="up" onClick={(e) => this.actionPost(e)}>
              <i className="fa fa-thumbs-o-up" aria-hidden="true"></i> Like
            </button>
            <button className="btn btn-info" name="down" onClick={(e) => this.actionPost(e)}>
              <i className="fa fa-thumbs-o-down" aria-hidden="true"></i> Deslike
            </button>
          </div>
        </div>


        <div className="margin-top" style={{ marginTop: 50 }}>
          <h3>Comments</h3>


          {this.props.comments.map(comment => (
            <div className="card margin-bottom card-border" key={comment.id}>
              <div className="card-body">
                <h4 className="card-title">
                  <div style={{ float: 'right' }}>
                    <button className="btn btn-info btn-sm" name="edit" onClick={(e) => this.actionComment(e, comment)}>Edit</button>
                    <button className="btn btn-danger btn-sm" name="delete" onClick={(e) => this.actionComment(e, comment)}>Delete</button>
                  </div>
                  Author: {comment.author}
                </h4>
                <h6 className="card-subtitle mb-2 text-muted">
                  Created at {moment(comment.timestamp).format("MM/DD/YYYY")}
                </h6>
                <p className="card-text">
                  {comment.body}
                  <br />
                </p>
              </div>
              <div className="card-footer">
                Vote Score: {comment.voteScore}
                <br />
                <button className="btn btn-info btn-sm margin-right" name="up" onClick={(e) => this.actionComment(e, comment)}>
                  <i className="fa fa-thumbs-o-up"></i> Like
                </button>
                <button className="btn btn-info btn-sm" name="down" onClick={(e) => this.actionComment(e, comment)}>
                  <i className="fa fa-thumbs-o-down"></i> Deslike
                </button>
              </div>
            </div>


          ))}

          <h3>Write a comment!</h3>
          <form>
            <div className="form-group">
              <label>Your name</label>
              <input
                type="text"
                className="form-control"
                required
                name="author"
                onChange={(e) => this.props.changeTextAuthor(e, this.props.comment)}
                placeholder="John Doe"
                value={this.props.comment.author}
              />
            </div>
            <div className="form-group">
              <label>Comment</label>
              <textarea
                required
                className="form-control"
                placeholder="Your comment"
                value={this.props.comment.body}
                onChange={(e) => this.props.changeTextComment(e, this.props.comment)}
              />
            </div>
            <button className="btn btn-info" onClick={(e) => this.handleClick(e)}>
              {(this.props.comment.id) ? 'Edit' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  return {
    post: state.post.post,
    comments: state.post.comments,
    comment: state.post.comment
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPost,
  getComments,
  getNewComment,
  changeTextAuthor,
  changeTextComment,
  saveComment,
  getComment,
  deleteComment,
  voteCommentUp,
  voteCommentDown,
  deletePost,
  votePostUp,
  votePostDown
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post)
