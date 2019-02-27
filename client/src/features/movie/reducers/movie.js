
import {
    GET_FILMS
} from '../actions/movie';

const films  = [
    {
        title: "Interstellar",
        year: "2001",
        rank: "9.68/10",
        director: "Stanley Kubrick"
    }
];
export default function chatReducer(state=films, action){
    switch (action.type) {
        case GET_FILMS:
            return [
                ...state,
                ...action.films
            ]
    }
    return state;
}
