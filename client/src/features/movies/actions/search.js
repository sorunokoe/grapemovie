
export const SEARCH_MOVIE = '[SEARCH] SEARCH_MOVIE';
export const CHANGE_PAGE = '[SEARCH] CHANGE_PAGE';

function getMovies(movies){
    return {
        type: SEARCH_MOVIE,
        isLoaded: true,
        data: movies,
        page: 0
    }
}
export function changePage(page) {
    return {
        type: CHANGE_PAGE,
        page: page
    }
}
export function searchMovie(text) {
    return async (dispatch) => {
        await fetch("http://api.tvmaze.com/search/shows?q="+text)
            .then(response => response.json())
            .then( async (result) => {
                console.log(result)
                return await dispatch(getMovies(result))
            })
            .then((error) => {
            })
    }
}