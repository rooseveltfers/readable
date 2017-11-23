import * as ReadableAPI from '../../ReadableAPI';

import {
  GET_POSTS,
  REORDER_POSTS,
  VOTE_POST_DOWN,
  VOTE_POST_UP
} from '../../types'

export function getPosts(e) {
  const posts = ReadableAPI.getPosts();
  return {
    type: GET_POSTS,
    payload: posts
  }
}

export function reorderPosts(e, posts) {
  //console.log('e', e.target.value);
  let sorted = []
  
  if (e.target.value === 'vote') {
    sorted = posts.sort(function (a, b) { return a.voteScore - b.voteScore })
  } else {
    sorted = posts.sort(function (a, b) { return b.timestamp - a.timestamp })
  }

  //console.log('sorted', sorted)

  return {
    type: REORDER_POSTS,
    payload: sorted
  }
}

export function votePostUp(postId) {
  ReadableAPI.votePost(postId, 'upVote')

  const posts = ReadableAPI.getPosts();

  return {
    type: VOTE_POST_UP,
    payload: posts
  }
}

export function votePostDown(postId) {
  ReadableAPI.votePost(postId, 'downVote')

  const posts = ReadableAPI.getPosts();

  return {
    type: VOTE_POST_DOWN,
    payload: posts
  }
}