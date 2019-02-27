
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getFilms } from '../features/movie/actions/movie'
require("../../public/scss/main/style.scss")

class AuthComponent extends Component{
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    render(){
        return(
            <div>
                <h1>HEllo WOLrd</h1>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    films: state.films
});
const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent);
