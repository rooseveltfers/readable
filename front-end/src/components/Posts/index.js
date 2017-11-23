import { connect } from 'react-redux'
import React, { Component } from 'react';
import { bindActionCreators } from 'redux'

import * as moment from 'moment'

import { getPosts, reorderPosts, votePostDown, votePostUp } from './actions'


class Posts extends Component {

  componentDidMount() {
    this.props.getPosts()
  }

  _reorderPosts(e) {
    this.props.reorderPosts(e, this.props.posts)
    this.forceUpdate();
  }

  actionPost(e, post) {
    e.preventDefault();
    //console.log(e.target.name)
    //console.log(comment)

    switch (e.target.name) {
      case "up":
        this.props.votePostUp(post.id)
        break;

      case "down":
        this.props.votePostDown(post.id)
        break;

      default:
        break;
    }

  }

  render() {
    return (
      <div className="row">

        <div className="col-sm-12 no-padding">
          <div className="col-sm-10 no-padding">
            <h2>Readble Project</h2>
          </div>
          <div className="col-sm-2" style={{padding: 25}}>
            <a href="/formPost/new">New Post</a>
          </div>
        </div>

        <div className="row sort-box">
          <p>Order by:</p>
          <select onChange={(e) => this._reorderPosts(e)}>
            <option value="vote">Vote Score</option>
            <option value="create">Created At</option>
          </select>
        </div>


        {this.props.posts.map(post => (
          <div className="card margin-bottom card-border" key={post.id}>
            <div className="card-body">
              <h4 className="card-title">
                <a href={'/post/' + post.id} className="font-weight-bold">
                  {post.title}
                </a>
              </h4>
              <h6 className="card-subtitle mb-2 text-muted">
                Category: {post.category}, Created at {moment(post.timestamp).format("MM/DD/YYYY")}
              </h6>
              <p className="card-text">
                {post.body}
                <br />
              </p>
            </div>
            <div className="card-footer">
              <span style={{marginBottom: 10}}>Comments: {post.commentCount}</span>
              <br />
              Vote Score: {post.voteScore}
              <br />
              <button className="btn btn-info margin-right" name="up" onClick={(e) => this.actionPost(e, post)}>
                <i className="fa fa-thumbs-o-up"></i> Like
              </button>
              <button className="btn btn-info" name="down" onClick={(e) => this.actionPost(e, post)}>
                <i className="fa fa-thumbs-o-down"></i> Deslike
              </button>
            </div>
          </div>


        ))}
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  //console.log('state', state)
  return { posts: state.posts.posts }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getPosts,
  reorderPosts,
  votePostDown,
  votePostUp
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
