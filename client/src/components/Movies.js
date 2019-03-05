
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getFilms, changePage } from '../features/movies/actions/movies'
import { Route, Link } from 'react-router-dom'
import bodymovin from 'lottie-web'

require("../../public/scss/movies/style.scss")

class MoviesComponent extends Component{
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var svgContainer = document.getElementById('svgContainer');
        var animItem = bodymovin.loadAnimation({
            wrapper: svgContainer,
            animType: 'svg',
            loop: false,
            path: 'https://labs.nearpod.com/bodymovin/demo/markus/isometric/markus2.json'
        });
        animItem.onComplete  = () => {
            this.props.getFilms();
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
            <Link key={movie.id} to={"/movie/"+movie.id} className={movie.favs ? "active" : ""}>
                <div className={"movie-item"} key={index}>
                    <img className={"poster-img"} src={movie.image.medium ? movie.image.medium : "" } />
                    <h3>{movie.name}</h3>
                    <br/>
                    <p>Rating: {movie.rating.average}</p>
                    <p>Premiered: {movie.premiered}</p>
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
                    { this.props.isLoaded ? "" : <div id={"svgContainer"}></div> }
                    <div className={"movies-items"}>
                        {movies}
                    </div>
                    {
                        pages.length == 0 || !this.props.isLoaded ? "" :
                        <div className={"pagination-div"}>
                            <div>
                                <img className={"prev"} onClick={this.previousPage.bind(this)}
                                     src={"img/common/icon/left.svg"}/>
                                <img className={"next"} onClick={this.nextPage.bind(this)}
                                     src={"img/common/icon/left.svg"}/>
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
    isLoaded: state.movies.isLoaded,
    movies: state.movies.data,
    movies_inpage: state.movies.movies_inpage,
    page: state.movies.page
});
const mapDispatchToProps = dispatch => ({
    getFilms: () => dispatch(getFilms()),
    changePage: (page) => dispatch(changePage(page))
});
export default connect(mapStateToProps, mapDispatchToProps)(MoviesComponent);
