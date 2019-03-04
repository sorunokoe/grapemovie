
import {
    SIGN_IN, SIGN_UP
} from '../actions';

const user  = {isLoaded: false, data: {}};

export default function movieReducer(state=user, action){
    switch (action.type) {
        case SIGN_IN:
            return {
                isLoaded: action.isLoaded,
                data: action.data
            }
        case SIGN_UP:
            return {
                isLoaded: action.isLoaded,
                data: action.data
            }
    }
    return state;
}
