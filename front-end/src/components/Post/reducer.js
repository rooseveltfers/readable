import {
    GET_POST,
    GET_COMMENTS,
    GET_COMMENT,
    CHANGE_AUTHOR,
    CHANGE_COMMENT,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    VOTE_COMMENT_UP,
    VOTE_COMMENT_DOWN,
    VOTE_POST_UP,
    VOTE_POST_DOWN,
    DELETE_POST
} from '../../types';

const INITIAL_STATE = { post: {}, comments: [], comment: {}, value: "" }

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case GET_POST:
            return { ...state, post: action.payload }

        case GET_COMMENTS:
            return { ...state, comments: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }

        case GET_COMMENT:
            return { ...state, comment: action.payload }

        case CHANGE_AUTHOR:
            return { ...state, comment: action.payload }

        case CHANGE_COMMENT:
            return { ...state, comment: action.payload }

        case ADD_COMMENT:
            return { ...state, comments: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }

        case EDIT_COMMENT:
            return { ...state, comments: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }

        case DELETE_COMMENT:
            return { ...state, comments: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }

        case VOTE_COMMENT_UP:
            return { ...state, comments: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }

        case VOTE_COMMENT_DOWN:
            return { ...state, comments: action.payload.sort(function (a, b) { return b.voteScore - a.voteScore }) }

        case DELETE_POST:
            return {}

        case VOTE_POST_UP:
            return { ...state, post: action.payload }

        case VOTE_POST_DOWN:
            return { ...state, post: action.payload }

        default:
            return state
    }
}