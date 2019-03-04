
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { searchMovie, changePage } from '../features/movies/actions/search'
import { Route, Link } from 'react-router-dom'

require("../../public/scss/movies/style.scss")
require("../../public/scss/search.scss")

class SearchComponent extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        this.props.searchMovie(this.props.match.params.text)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.match.params.text != this.props.match.params.text){
            this.props.searchMovie(this.props.match.params.text)
        }
    }
    previousPage(){
        if(this.props.page>0) {
            this.choosePage(this.props.page - 1)
        }
    }
    nextPage(){
        if((this.props.page+1)*8<this.props.movies.length) {
            this.choosePage(this.props.page + 1)
        }
    }
    choosePage(page){
        this.props.changePage(page)
    }
    render(){
        const movies = this.props.movies_inpage.map((movie, index) =>
            <Link key={movie.show.id} to={"/movie/"+movie.show.id} className={movie.favs ? "active" : ""}>
                <div className={"movie-item"} key={index}>
                    <img className={"poster-img"} src={movie.show.image ? movie.show.image.medium ? movie.show.image.medium : "" : ""} />
                    <h3>{movie.show.name}</h3>
                    {/*<h4>{movie.name}</h4>*/}
                    <br/>
                    {/*<p>Status: {movie.status}</p>*/}
                    {/*<p>Year: {movie.airdate}</p>*/}
                    <p>Rating: {movie.show.rating.average}
                    </p>
                    <p>Premiered: {movie.show.premiered}</p>
                    {
                        movie.favs ? "" :
                            <div className={"add-fav-div"}>
                                <img src={"../img/common/icon/star.svg"} />
                            </div>
                    }
                </div>
            </Link>
        )
        const pages = [];
        for(let i = 1; i <= Math.ceil(this.props.movies.length / 8); i++) {
            pages.push(i)
        }
        return(
            <div>
                <div className={"main-content-div"}>
                    { this.props.movies.length == 0 ? <div className={"empty-result-div"}>
                        <img src={"../img/common/no_search.svg"} />
                        <p>The are no films with name <br/> "{this.props.match.params.text}"</p>
                    </div> : "" }
                    <div className={"movies-items"}>
                        {movies}
                    </div>
                    {
                        pages.length == 0 || !this.props.isLoaded ? "" :
                            <div className={"pagination-div"}>
                                <div>
                                    <img className={"prev"} onClick={this.previousPage.bind(this)}
                                         src={"../img/common/icon/left.svg"}/>
                                    <img className={"next"} onClick={this.nextPage.bind(this)}
                                         src={"../img/common/icon/left.svg"}/>
                                </div>
                                <div>
                                    {pages.map((page, key) =>
                                        <button className={this.props.page + 1 == page ? "active" : ""} key={key}
                                                onClick={this.choosePage.bind(this, page - 1)}>{page}</button>
                                    )}
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isLoaded: state.search.isLoaded,
    movies: state.search.data,
    movies_inpage: state.search.movies_inpage,
    page: state.search.page
});
const mapDispatchToProps = dispatch => ({
    searchMovie: (text) => dispatch(searchMovie(text)),
    changePage: (page) => dispatch(changePage(page))
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);
