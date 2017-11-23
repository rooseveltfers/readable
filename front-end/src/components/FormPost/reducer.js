import {
  GET_POST,
  CHANGE_TITLE,
  CHANGE_BODY,
  CHANGE_AUTHOR,
  GET_CATEGORIES,
  NEW_POST,
  SAVE_POST,
  CHANGE_CATEGORY
} from '../../types';

const INITIAL_STATE = { post: {}, categories: [] }

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_POST:
      return { ...state, post: action.payload }

    case NEW_POST:
      return { ...state, post: action.payload }

    case CHANGE_TITLE:
      return { ...state, post: action.payload }

    case CHANGE_BODY:
      return { ...state, post: action.payload }

    case CHANGE_AUTHOR:
      return { ...state, post: action.payload }

    case GET_CATEGORIES:
      return { ...state, categories: action.payload.categories }

    case SAVE_POST:
      return { ...state, posts: action.payload }

    case CHANGE_CATEGORY:
      return { ...state, post: action.payload }


    default:
      return state
  }
}