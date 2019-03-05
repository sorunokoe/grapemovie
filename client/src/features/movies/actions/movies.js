
export const GET_FILMS = '[MOVIES] GET_FILMS';
export const CHANGE_PAGE = '[MOVIES] CHANGE_PAGE';
export const GET_FAVORITES = '[MOVIES] GET_FAVORITES';
export const REMOVE_FAVORITE = '[MOVIES] REMOVE_FAVORITE';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

function receiveFilms(movies){
    return {
        type: GET_FILMS,
        isLoaded: true,
        data: movies,
        page: 0
    }
}
function receiveFavorites(movies){
    return {
        type: GET_FAVORITES,
        isLoaded: true,
        favorites: movies,
        page: 0
    }
}
function deleteFav(id){
    return {
        type: REMOVE_FAVORITE,
        id: id
    }
}
export function changePage(page) {
    console.log("changed page", page)
    return {
        type: CHANGE_PAGE,
        page: page
    }
}

export function getFilms() {
    return async (dispatch) => {
        await fetch("http://api.tvmaze.com/shows")
            .then(response => response.json())
            .then( async (result) => {
                return await dispatch(receiveFilms(result))
            })
            .then((error) => {

            })
    }
}
export function getFavorites() {
    console.log("getFavs")
    return async (dispatch) => {
        if(cookies.get("token")){
            await fetch("http://localhost:3030/api/movies/favorites", {
                headers: {
                    "x-access-token": cookies.get("token")
                }
            })
                .then(response => response.json())
                .then( async (result) => {
                    return await dispatch(receiveFavorites(result))
                })
                .then((error) => {

                })
        }
    }
}

export function removeFavorite(id) {
    return async (dispatch) => {
        dispatch(deleteFav(id))
        if(cookies.get("token")){
            await fetch("http://localhost:3030/api/movies/favorites/"+id, {
                method: "delete",
                headers: {
                    "x-access-token": cookies.get("token")
                }
            })
        }
    }
}