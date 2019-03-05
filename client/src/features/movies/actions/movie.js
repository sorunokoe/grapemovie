
export const GET_FILM = '[MOVIE] GET_FILM';
export const ADD_TO_FAVORITES = '[MOVIES] ADD_TO_FAVORITES';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function receiveFilm(movie){
    return {
        type: GET_FILM,
        isLoaded: true,
        data: movie
    }
}
export function getFilm(id) {
    return async (dispatch) => {
        await fetch("http://api.tvmaze.com/shows/"+id)
            .then(response => response.json())
            .then( async (result) => {
                return await dispatch(receiveFilm(result))
            })
            .then((error) => {

            })
    }
}
function favoriteAdded(favorite){
    console.log("ADDDDDDED", favorite)
    return {
        type: ADD_TO_FAVORITES,
        isLoaded: true,
        favorite: favorite.data,
        page: 0
    }
}
export function addToFavorites(movie) {
    return async (dispatch) => {
        console.log("ADDEDMOVIE", movie)
        if(cookies.get("token")) {
            await fetch("http://localhost:3030/api/movies/favorites", {
                method: 'post',
                headers: {
                    'x-access-token': cookies.get("token"),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: movie.id, name: movie.name, image: movie.image.medium, rating: movie.rating.average, summary: movie.summary, premiered: movie.premiered })
            })
                .then(response => response.json())
                .then(async (result) => {
                    return await dispatch(favoriteAdded(result))
                })
                .then((error) => {

                })
        }
    }
}


