
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getFilms } from '../features/movies/actions/movies'

require("../../public/scss/movieItem/style.scss")

class MovieItemComponent extends Component{
    componentDidMount(){
        console.log(this.props.match.params.id)
    }
    componentDidUpdate(){
    }
    render(){
        return(
            <div>
                <div className={"main-description-div"}>
                    <div className={"poster-background-div"}>
                        <img src={"../img/poster/inter.jpg"} />
                        <div className={"blur-layer-div"}></div>
                    </div>
                    <div className={"info-div"}>
                        <div className={"info-item-div poster"}>
                            <img src={"../img/poster/inter.jpg"} />
                        </div>
                        <div className={"info-item-div"}>
                            <h1>Interstellar</h1>
                            <p>Year: 2001</p>
                            <p>Rank: 9.48/10</p>
                            <p>Director: Stanley Kubrick</p>
                            <button>
                                <img src={"../img/common/icon/star_white.svg"} />
                                Add to wishlist
                            </button>
                        </div>
                    </div>
                    <div className={"description-div"}>
                        <p>
                            2001: A Space Odyssey is a 1968 epic science fiction film produced and directed by
                            Stanley Kubrick. The screenplay was written by Kubrick and Arthur C. Clarke,
                            and was inspired by Clarke's short story "The Sentinel". A novel also called 2001:
                            A Space Odyssey, written concurrently with the screenplay, was published soon after the
                            film was released. The film, which follows a voyage to Jupiter with the sentient
                            computer HAL after the discovery of a mysterious black monolith affecting human
                            evolution, deals with themes of existentialism, human evolution, technology,
                            artificial intelligence, and the possibility of extraterrestrial life.
                            The film is noted for its scientifically accurate depiction of spaceflight,
                            pioneering special effects, and ambiguous imagery. Sound and dialogue are used
                            sparingly and often in place of traditional cinematic and narrative techniques.
                            The soundtrack incorporates a number of pieces of classical music,
                            among them Also sprach Zarathustra by Richard Strauss,
                            The Blue Danube by Johann Strauss II, and works by Aram Khachaturian and György Ligeti.
                        </p>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MovieItemComponent);
