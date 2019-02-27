import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import registerServiceWorker from './registerServiceWorker';

import MovieComponent from './components/Movie';
import movieReducer from './features/movie/reducers';

const loggerMiddleware = createLogger()

require('../public/scss/style.scss');

const store = createStore(movieReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));

ReactDOM.render(
<Provider store={store}>
    <MovieComponent/>
    </Provider>
    , document.getElementById('root')
);
registerServiceWorker();
