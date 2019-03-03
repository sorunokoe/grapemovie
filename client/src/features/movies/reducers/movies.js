
import {
    GET_FILMS, CHANGE_PAGE
} from '../actions/movies';

const movies  = {isLoaded: false, data: [], movies_inpage: [], page: 0};
export default function movieReducer(state=movies, action){
    switch (action.type) {
        case CHANGE_PAGE:
            console.log("from", action.page)
            console.log("to", (8*action.page)+8)
            return {
                isLoaded: true,
                data: [
                    ...state.data
                ],
                movies_inpage: [
                    ...state.data
                ].slice(8*action.page, (8*action.page)+8),
                page: action.page}
        case GET_FILMS:
            return {
                isLoaded: action.isLoaded,
                data: [
                ...state.data,
                ...action.data
                ],
                movies_inpage: [
                    ...state.data,
                    ...action.data
                ].slice(0,8),
                page: 0}
    }
    return state;
}
