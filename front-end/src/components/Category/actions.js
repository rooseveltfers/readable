import * as ReadableAPI from '../../ReadableAPI';

import {
  GET_POSTS,
  REORDER_POSTS,
  VOTE_POST_DOWN,
  VOTE_POST_UP
} from '../../types'

export function getPosts(categoryId) {
  const posts = ReadableAPI.getCategoryPosts(categoryId);
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

export function votePostUp(post) {
  ReadableAPI.votePost(post.id, 'upVote')

  const posts = ReadableAPI.getCategoryPosts(post.category);

  return {
    type: VOTE_POST_UP,
    payload: posts
  }
}

export function votePostDown(post) {
  ReadableAPI.votePost(post.id, 'downVote')

  const posts = ReadableAPI.getCategoryPosts(post.category);

  return {
    type: VOTE_POST_DOWN,
    payload: posts
  }
}