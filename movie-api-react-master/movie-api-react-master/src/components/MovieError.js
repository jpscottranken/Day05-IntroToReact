import React from 'react';
import { NavLink } from 'react-router-dom';

function MovieError() {
    return (
        <div className='container'>
            <h1>Movie Not Found</h1>
            <h2>Please try again with a valid title</h2>
            <NavLink to="/" className='btn btn-primary'>Try Again</NavLink>
        </div>
    )
}

export default MovieError

