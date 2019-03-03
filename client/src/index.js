import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';
const loggerMiddleware = createLogger()

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import MoviesComponent from './components/Movies';
import MovieItemComponent from './components/MovieItem';
import WatchlistComponent from './components/Watchlist';
import movieReducer from './features/movies/reducers';

require('../public/scss/style.scss');
require('../public/scss/header.scss');
require('../public/scss/footer.scss');

const store = createStore(movieReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

const routing = (
    <Router>
        <div>
            <header>
                <Link to={"/"}>
                    <h1>Grape <span className={"brand"}>Movie</span></h1>
                </Link>
                <div className={"search-div"}>
                    <img className={"search-icon-img"} src={"../img/common/icon/search.svg"} />
                    <input placeholder={"Search film.."} type={"text"} />
                </div>
                <div className={"display-div"}>
                    <Link to={"/watchlist"}>
                        <img src={"../img/common/icon/wishlist.svg"} />
                    </Link>
                </div>
            </header>
            <Provider store={store}>
                <Route exact path="/" component={MoviesComponent} />
            </Provider>
            <Provider store={store}>
                <Route path="/movie/:id" component={MovieItemComponent} />
            </Provider>
            <Provider store={store}>
                <Route path="/watchlist" component={WatchlistComponent} />
            </Provider>
            <footer>
                <div>
                    <ul>
                        <li>
                            <a href={"#"}>
                                Terms of use
                            </a>
                        </li>
                        <li>
                            <a href={"#"}>
                                Privacy
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <a href={"#"}>Cookie Preferences</a>
                        </li>
                        <li>
                            <a href={"#"}>FAQ</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <a href={"#"}>
                                Corporate Information
                            </a>
                        </li>
                        <li>
                            <a href={"#"}>
                                Help Center
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

registerServiceWorker();
