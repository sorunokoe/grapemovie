import React, {Component} from 'react';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
const loggerMiddleware = createLogger()

import { Route, Link, BrowserRouter as Router, withRouter } from 'react-router-dom'

import MoviesComponent from '../components/Movies';
import MovieItemComponent from '../components/MovieItem';
import WatchlistComponent from '../components/Watchlist';
import SearchComponent from '../components/Search';
import HeaderComponent from '../components/Header';
import AuthRegComponent from './AuthReg';

import movieReducer from '../features/movies/reducers';
import userReducer from '../features/users/reducers';

require('../../public/scss/style.scss');
require('../../public/scss/header.scss');
require('../../public/scss/footer.scss');

const movieStore = createStore(movieReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
const userStore = createStore(userReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

class App extends Component {
    render(){
        return(<Router>
                <div>
                    <Provider store={userStore}>
                        <HeaderComponent/>
                    </Provider>
                    <Provider store={movieStore}>
                        <Route exact path="/" component={MoviesComponent} />
                    </Provider>
                    <Provider store={movieStore}>
                        <Route path="/movie/:id" component={MovieItemComponent} />
                    </Provider>
                    <Provider store={movieStore}>
                        <Route path="/search/:text" component={SearchComponent} />
                    </Provider>
                    <Provider store={movieStore}>
                        <Route path="/watchlist" component={WatchlistComponent} />
                    </Provider>
                    <Provider store={userStore}>
                        <Route path="/login/:type" component={AuthRegComponent} />
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
    }
}

export default App