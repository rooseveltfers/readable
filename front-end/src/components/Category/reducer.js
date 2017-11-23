import {
    GET_POSTS,
    REORDER_POSTS,
    VOTE_POST_DOWN,
    VOTE_POST_UP
} from '../../types';


const INITIAL_STATE = { posts: [] }

export default function (state = INITIAL_STATE, action) {

    switch (action.type) {
        case GET_POSTS:
            return { ...state, posts: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }

        case REORDER_POSTS:
            return { ...state, posts: action.payload }

        case VOTE_POST_UP:
            return { ...state, posts: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }


        case VOTE_POST_DOWN:
            return { ...state, posts: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }


        default:
            return state
    }
}