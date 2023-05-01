import React, { useEffect, useState } from 'react';


function MovieDetails(props) {

    const [movieDetails, setMovieDetails] = useState({})


    useEffect(() => {
        const imdbID = props.match.params.imdbID;

        extractMovieDetailsByID(imdbID);
    }, [])

    const extractMovieDetailsByID = (imdbID) => {
        const movieDetailsURL = `http://www.omdbapi.com/?i=${imdbID}&apikey=ead99e79`
        fetch(movieDetailsURL)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            setMovieDetails(result)
        })
    }

    return (

        <div className='container'>
            
            <div className='header-content'>
                
                <h2>{movieDetails.Title}</h2>
                
                <p>{movieDetails.Year} | {movieDetails.Rated}</p>
            
            </div>

            <div className='main-content'>
                
                <img 
                    src={movieDetails.Poster}
                    alt="Movie Poster"
                />

                <div className='movie-details'>
                    <p>{movieDetails.Genre}</p>

                    <p>{movieDetails.Plot}</p>
                    <hr/>

                    <p>Director: {movieDetails.Director}</p>
                    <hr/>

                    <p>Cast: {movieDetails.Actors}</p>
                    <hr/>

                    <p>Box Office: {movieDetails.BoxOffice}</p>
                </div>

            </div>
        </div>

        // <div className = 'movieDetails'>
        //     <h1>Movie Details</h1>
        //     <img 
        //         src={movieDetails.Poster} 
        //         alt='Movie Poster'
        //     />
        //     <p>Title: {movieDetails.Title}</p>
        //     <p>Year: {movieDetails.Year}</p>
        //     <p>Plot: {movieDetails.Plot}</p>
        //     <p>Cast: {movieDetails.Actors}</p>  
        // </div>
    )
}

export default MovieDetails