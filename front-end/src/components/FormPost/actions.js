import * as ReadableAPI from '../../ReadableAPI';

import {
  GET_POST,
  CHANGE_TITLE,
  CHANGE_BODY,
  CHANGE_AUTHOR,
  GET_CATEGORIES,
  NEW_POST,
  SAVE_POST,
  CHANGE_CATEGORY
} from '../../types'

export function newPost() {
  const post = {
    "id": "",
    "timestamp": 0,
    "title": "",
    "body": "",
    "author": "",
    "category": "",
    "voteScore": 0,
    "deleted": false,
    "commentCount": 0
  }

  return {
    type: NEW_POST,
    payload: post
  }
}

export function getPost(postId) {
  const post = ReadableAPI.getPost(postId);
  return {
    type: GET_POST,
    payload: post
  }
}


export function changeTextTitle(e, post) {
  return {
    type: CHANGE_TITLE,
    payload: { ...post, title: e.target.value }
  }
}

export function changeTextBody(e, post) {
  return {
    type: CHANGE_BODY,
    payload: { ...post, body: e.target.value }
  }
}

export function changeTextAuthor(e, post) {
  return {
    type: CHANGE_AUTHOR,
    payload: { ...post, author: e.target.value }
  }
}

export function changeCategory(e, post) {
  return {
    type: CHANGE_CATEGORY,
    payload: { ...post, category: e.target.value }
  }
}

export function getCategories() {

  const categories = ReadableAPI.getCategories()

  return {
    type: GET_CATEGORIES,
    payload: categories
  }
}

export function savePost(post) {
  
    if (post.id) {
      //console.log('update post', post)
      ReadableAPI.updatePost(post)
    } else {
      const postToSave = {
        ...post,
        id: btoa(Date.now()),
        timestamp: Date.now()
      }
      //console.log('newPost', postToSave)
      ReadableAPI.addPost(postToSave);
    }
  
  
    const posts = ReadableAPI.getPosts();
  
    return {
      type: SAVE_POST,
      payload: posts
    }
  }