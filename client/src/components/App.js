import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'


import {applyMiddleware, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
const loggerMiddleware = createLogger();

import MoviesComponent from './Movies';
import movieReducer from '../features/movies/reducers';
const store = createStore(movieReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

import MovieItemComponent from './MovieItem';
import {Provider} from "react-redux";

require('../../public/scss/style.scss');
require('../../public/scss/header.scss');
require('../../public/scss/footer.scss');

class App extends Component {
    render() {
        return(
        <Router>
            <div>
                <Switch>

                    <Provider store={store}>
                        <Route exact path="/" component={MoviesComponent} />
                    </Provider>
                    <Route path="/movie" component={MovieItemComponent} />
                    {/*<Provider store={store}>*/}
                        {/**/}
                    {/*</Provider>*/}
                </Switch>
            </div>
        </Router>
        )
    }
}

export default App