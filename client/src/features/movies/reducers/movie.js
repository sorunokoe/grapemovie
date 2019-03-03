
import {
    GET_FILM
} from '../actions/movie';

const movie  = {isLoaded: false, data: {}};

export default function movieReducer(state=movie, action){
    switch (action.type) {
        case GET_FILM:
            return {
                isLoaded: action.isLoaded,
                data: action.data
            }
    }
    return state;
}
