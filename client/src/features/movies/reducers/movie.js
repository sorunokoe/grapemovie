
import {
    GET_FILM, ADD_TO_FAVORITES
} from '../actions/movie';

const movie  = {isLoaded: false, data: {}, favorite: {}};

export default function movieReducer(state=movie, action){
    switch (action.type) {
        case GET_FILM:
            return {
                isLoaded: action.isLoaded,
                data: action.data,
                favorite: state.favorite
            }
        case ADD_TO_FAVORITES:
            return {
                isLoaded: true,
                data: state.data,
                favorite: action.favorite
            }
    }
    return state;
}
