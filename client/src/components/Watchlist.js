
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getFilms } from '../features/movies/actions/movies'
import {Link} from "react-router-dom";

require("../../public/scss/watchList.scss")

class WatchlistComponent extends Component{
    componentDidMount(){
        console.log(this.props.match.params.id)
    }
    componentDidUpdate(){
    }
    render(){
        return(
            <div>
                <div className={"movies-list-div"}>
                    <h2>Watchlist:</h2>
                    {this.props.movie.map((film, index) =>
                    <Link key={film.id} to={"/movie/"+film.id} className={film.favs ? "active" : ""}>
                        <div className={"movie-item-div"}>
                            <img src={film.img}/>
                            <div className={"description-div"}>
                                <h3>{film.title}</h3>
                                <p className={"inline"}>Year: {film.year}</p>
                                <p className={"inline"}>Rank: {film.rank}</p>
                                <p className={"inline"}>Director: {film.director}</p>
                                <br/>
                                <p>
                                    2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by
                                    Stanley Kubrick. The screenplay was written by Kubrick and Arthur C. Clarke,
                                    and was inspired by Clarke's short story "The Sentinel".
                                </p>
                            </div>
                            <img className={"remove-img"} src={"../img/common/icon/cancel.svg"} />
                        </div>
                    </Link>
                    )}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    movie: state.movies
});
const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(WatchlistComponent);
