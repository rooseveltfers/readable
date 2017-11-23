import {
  GET_CATEGORIES
} from '../../types';


const INITIAL_STATE = { categories: []}

export default function(state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_CATEGORIES:
            //console.log('action.payload', action.payload.categories)
            return {...state, categories: action.payload.categories}
        default:
            return state
    }
}