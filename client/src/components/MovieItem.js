
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getFilm} from '../features/movies/actions/movie'
var HtmlToReactParser = require('html-to-react').Parser;

require("../../public/scss/movieItem/style.scss")

class MovieItemComponent extends Component{
    componentDidMount(){
        this.props.getFilm(this.props.match.params.id)
    }
    componentDidUpdate(){
    }
    render(){
        var htmlToReactParser = new HtmlToReactParser();
        return(
            <div>
                <div className={"main-description-div"}>
                    <div className={"poster-background-div"}>
                        <img src={this.props.movie.data.image ? this.props.movie.data.image.original : ""}/>
                        <div className={"blur-layer-div"}></div>
                    </div>
                    <div className={"info-div"}>
                        <div className={"info-item-div poster"}>
                            <img src={this.props.movie.data.image ? this.props.movie.data.image.medium : ""} />
                        </div>
                        <div className={"info-item-div"}>
                            <h1>{this.props.movie.data.name}</h1>
                            <p>Premiered: {this.props.movie.data.premiered}</p>
                            {/*<p>Rating: {this.props.movie.f}</p>*/}
                            <p>Genres: {this.props.movie.data.genres? this.props.movie.data.genres.join(', ') : ""}</p>
                            <p>Language: {this.props.movie.data.language}</p>
                            <button>
                                <img src={"../img/common/icon/star_white.svg"} />
                                Add to wishlist
                            </button>
                        </div>
                    </div>
                    <div className={"description-div"}>
                        {htmlToReactParser.parse(this.props.movie.data.summary)}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    movie: state.movie
});
const mapDispatchToProps = dispatch => ({
    getFilm: (id) => dispatch(getFilm(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(MovieItemComponent);
