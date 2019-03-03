
export const GET_FILMS = '[MOVIES] GET_FILMS';
export const CHANGE_PAGE = '[MOVIES] CHANGE_PAGE';


function receiveFilms(movies){
    return {
        type: GET_FILMS,
        isLoaded: true,
        data: movies,
        page: 0
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
    console.log("hello");
    return async (dispatch) => {
        await fetch("http://api.tvmaze.com/schedule/full")
            .then(response => response.json())
            .then( async (result) => {
                return await dispatch(receiveFilms(result))
            })
            .then((error) => {

            })
    }
}


