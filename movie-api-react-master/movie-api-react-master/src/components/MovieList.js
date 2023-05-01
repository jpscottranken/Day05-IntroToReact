import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";

function MovieList() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [noMovieFound, setNoMovieFound] = useState(false);

    useEffect(() => {
        // Get the movie name from local storage
        let term = localStorage.getItem("searchTerm")

        if (term) {
            handleClick(term)
        }
    }, [])

    const handleChange = (e) => {
        setSearchTerm(e.target.value)
    }

    const handleClick = (movie) => {
        const movieURL = `http://www.omdbapi.com/?s=${movie}&apikey=ead99e79`

        // Put the movie name into local storage
        localStorage.setItem("searchTerm", movie);

        fetch(movieURL)
            .then((response) => response.json())
            .then((result => {
                if(result.Error) {
                    // Error - Render Nothing
                    setMovies([])
                    setNoMovieFound(true)
                    localStorage.removeItem("searchTerm")
                } else {
                    // Found movie(s)
                    console.log(result.Search)
                    setMovies(result.Search)
                    setNoMovieFound(false)
                }
            })
        )
    }

    const handleClearScreen = () => {
        setMovies([]);
        setSearchTerm("");
        localStorage.removeItem("searchTerm");
        setNoMovieFound("");
        document.getElementById('searchbar').value = "";
    }

    const returnedMovies = movies.map(movie => {
        return (
            <div key={movie.imdbID}>
                <div className='card bg-dark'>
                        <NavLink to={`/${movie.imdbID}`}>
                            <img 
                                src={movie.Poster}
                                className='card-img-top'
                                alt="Movie Poster"
                            />
                        </NavLink>
                    
                    
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {movie.Title}
                        </h5>
                    </div>
                </div>
            </div>
            

            // <div key={movie.imdbID}>
            //     <img 
            //         src={movie.Poster}
            //         alt="Movie Poster"
            //     />
                
            //     <h5>{movie.Title}</h5>

            //     <NavLink to={`/${movie.imdbID}`}>
            //         <button>
            //             Movie Details
            //         </button>
            //     </NavLink>
            // </div>

        )
    })

    return (

        <div className = 'container'>
            <div className='search-bar'>
                <h1>React Movie App</h1>
                
                <input 
                    type='text'
                    id = "searchbar"
                    className='form-control'
                    placeholder="Movie Title"
                    onChange={handleChange}
                />
                   
                <button className = 'btn btn-primary'
                    onClick = {() => handleClick(searchTerm)} 
                > 
                    Search 
                </button>
            
        
                <button 
                    className = 'btn btn-danger'
                    onClick = {handleClearScreen}
                >
                    Clear
                </button>
            
            </div>

            <section className='cards'>
                {returnedMovies}
            </section>
            
            
            {noMovieFound ? <Redirect to='/error' /> : null}
        
        </div>
    
    )
}

export default MovieList