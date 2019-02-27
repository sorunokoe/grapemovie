
export const GET_FILMS = '[MOVIE] GET_FILMS';


function getFilms(films) {
    return {
        type: GET_FILMS,
        films: films
    }
}


