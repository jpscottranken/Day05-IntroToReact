import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieError from './components/MovieError';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

ReactDOM.render (
    <React.StrictMode>
        <BrowserRouter>
            <Switch>    
                <Route exact path='/' component={MovieList} />
                <Route exact path='/error' component={MovieError} />
                <Route exact path='/:imdbID' component={MovieDetails} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
