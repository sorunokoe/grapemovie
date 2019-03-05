
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getFavorites, removeFavorite } from '../features/movies/actions/movies'
import {Link} from "react-router-dom";
var HtmlToReactParser = require('html-to-react').Parser;

require("../../public/scss/watchList.scss")

class WatchlistComponent extends Component{
    componentDidMount(){
        this.props.getFavorites()
    }
    componentDidUpdate(){
        console.log("NARUTO", this.props.favorites)
    }
    removeFav(id){
        this.props.removeFavorite(id)
    }
    render(){
        var htmlToReactParser = new HtmlToReactParser();
        const favorites = this.props.favorites.map((film, index) =>
            <Link key={film.id} to={"/movie/"+film.id} className={film.favs ? "active" : ""}>
                <div className={"movie-item-div"}>
                    <img src={film.image}/>
                    <div className={"description-div"}>
                        <h3>{film.name}</h3>
                        <p className={"inline"}>Rating: {film.rating}</p>
                        <p className={"inline"}>Premiered: {film.premiered}</p>
                        <br/>
                        {htmlToReactParser.parse(film.summary)}
                    </div>
                    {/*<img onClick={this.removeFav.bind(this, film.id)} className={"remove-img"} src={"../img/common/icon/cancel.svg"} />*/}
                </div>
            </Link>
        )
        return(
            <div>
                <div className={"movies-list-div"}>
                    <h2>Watchlist:</h2>
                    {favorites}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    favorites: state.movies.favorites.data.movies
});
const mapDispatchToProps = dispatch => ({
    getFavorites: () => dispatch(getFavorites()),
    removeFavorite: (id) => dispatch(removeFavorite(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(WatchlistComponent);
