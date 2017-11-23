import * as ReadableAPI from '../../ReadableAPI';

import {
  GET_CATEGORIES
} from '../../types'

export function getCategories(e) {
  const categories = ReadableAPI.getCategories();
  return {
      type: GET_CATEGORIES,
      payload: categories
  }
}