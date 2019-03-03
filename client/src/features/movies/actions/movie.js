

export const GET_FILM = '[MOVIES] GET_FILM';

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


