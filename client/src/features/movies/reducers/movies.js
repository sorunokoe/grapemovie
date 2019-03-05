
import {
    GET_FILMS, CHANGE_PAGE, GET_FAVORITES, REMOVE_FAVORITE
} from '../actions/movies';

const movies  = {isLoaded: false, data: [], movies_inpage: [], favorites: {data: { movies: []}}, page: 0};
export default function moviesReducer(state=movies, action){
    switch (action.type) {
        case CHANGE_PAGE:
            return {
                isLoaded: true,
                data: [
                    ...state.data
                ],
                movies_inpage: [
                    ...state.data
                ].slice(8*action.page, (8*action.page)+8),
                page: action.page,
                favorites: state.favorites
            }
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
                page: 0,
                favorites: state.favorites
            }
        case GET_FAVORITES:
            return {
                isLoaded: true,
                data: [
                    ...state.data
                ],
                movies_inpage: [
                    ...state.data
                ].slice(8*action.page, (8*action.page)+8),
                page: action.page,
                favorites: action.favorites
            }
        case REMOVE_FAVORITE:
            var favorites = state.favorites
            favorites.forEach((movie) => {
                if(movie.id==action.id){
                    const index = action.favorites.indexOf(movie)
                    favorites.splice(inex, 1)
                }
            })
            return {
                isLoaded: true,
                data: [
                    ...state.data
                ],
                movies_inpage: [
                    ...state.data
                ].slice(8*action.page, (8*action.page)+8),
                page: action.page,
                favorites: favorites
            }

    }
    return state;
}
