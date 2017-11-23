import * as ReadableAPI from '../../ReadableAPI';

import {
  GET_POST,
  GET_COMMENTS,
  GET_COMMENT,
  CHANGE_AUTHOR,
  CHANGE_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT_UP,
  VOTE_COMMENT_DOWN,
  VOTE_POST_UP,
  VOTE_POST_DOWN,
  DELETE_POST
} from '../../types'

export function getPost(postId) {
  const post = ReadableAPI.getPost(postId);
  return {
    type: GET_POST,
    payload: post
  }
}

export function getComments(postId) {
  const comments = ReadableAPI.getComments(postId);
  return {
    type: GET_COMMENTS,
    payload: comments
  }
}

export function getNewComment(postId) {
  const comment = {
    id: '',
    parentId: postId,
    timestamp: 0,
    body: '',
    author: '',
    voteScore: 0,
    deleted: false,
    parentDeleted: false
  }

  return {
    type: GET_COMMENT,
    payload: comment
  }
}

export function changeTextAuthor(e, comment) {

  return {
    type: CHANGE_AUTHOR,
    payload: { ...comment, author: e.target.value }
  }
}

export function changeTextComment(e, comment) {

  return {
    type: CHANGE_COMMENT,
    payload: { ...comment, body: e.target.value }
  }
}

export function saveComment(comment) {

  if (comment.id) {
    //console.log('update comment', comment)
    ReadableAPI.updateComment(comment)
  } else {
    const commentToSave = {
      ...comment,
      id: btoa(Date.now()),
      timestamp: Date.now()
    }
    //console.log('newComment', commentToSave)
    ReadableAPI.addComment(commentToSave);
  }


  const comments = ReadableAPI.getComments(comment.parentId);

  return {
    type: ADD_COMMENT,
    payload: comments
  }
}

export function getComment(commentId) {

  const comment = ReadableAPI.getComment(commentId)

  return {
    type: GET_COMMENT,
    payload: comment
  }
}

export function deleteComment(comment) {
  ReadableAPI.deleteComment(comment.id)

  const comments = ReadableAPI.getComments(comment.parentId);

  return {
    type: DELETE_COMMENT,
    payload: comments
  }
}

export function voteCommentUp(comment) {
  ReadableAPI.voteComment(comment.id, 'upVote')

  const comments = ReadableAPI.getComments(comment.parentId);

  return {
    type: VOTE_COMMENT_UP,
    payload: comments
  }
}

export function voteCommentDown(comment) {
  ReadableAPI.voteComment(comment.id, 'downVote')

  const comments = ReadableAPI.getComments(comment.parentId);

  return {
    type: VOTE_COMMENT_DOWN,
    payload: comments
  }
}

export function deletePost(postId) {
  ReadableAPI.deletePost(postId)

  return {
    type: DELETE_POST,
    payload: {}
  }
}

export function votePostUp(post) {
  ReadableAPI.votePost(post.id, 'upVote')

  const p = ReadableAPI.getPost(post.id);

  return {
    type: VOTE_POST_UP,
    payload: p
  }
}

export function votePostDown(post) {
  ReadableAPI.votePost(post.id, 'downVote')

  const p = ReadableAPI.getPost(post.id);

  return {
    type: VOTE_POST_DOWN,
    payload: p
  }
}
