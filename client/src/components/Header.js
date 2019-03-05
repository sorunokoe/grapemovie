
import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class HeaderComponent extends Component{
    componentDidMount() {

    }
    _handleKeyPress(e){
        if (e.key === 'Enter') {
            this.search()
        }
    }
    search(){
        if(this.refs.searchText.value.length>0) {
            this.props.history.push('/search/' + this.refs.searchText.value)
        }else{
            this.props.history.push('/')
        }
    }
    render(){
        return (
            <header>
                <Link to={"/"}>
                    <h1>Grape <span className={"brand"}>Movie</span></h1>
                </Link>
                <div className={"search-div"}>
                    <img  onClick={this.search.bind(this)} className={"search-icon-img"} src={"../img/common/icon/search.svg"} />
                    <input onKeyPress={this._handleKeyPress.bind(this)} ref={"searchText"} placeholder={"Search film.."} type={"text"} />
                </div>
                <div className={"display-div"}>
                    { this.props.user.data && cookies.get("token") ?
                        <Link to={"/watchlist"}>
                            <img src={"../img/common/icon/wishlist.svg"} />
                        </Link> :
                        <div>
                            <Link to={"/login/auth"}>
                                Sign in
                            </Link>
                            <Link to={"/login/reg"}>
                            Sign up
                            </Link>
                        </div>
                    }
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    user: state.users
});
const mapDispatchToProps = dispatch => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderComponent));