import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const MoviePage = (props) => {
    const { id } = useParams()
    console.log('id is '+id)
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState([])
    const [recommendations, setRecommendations] = useState([])

    const fetchMovie = () => {

        fetch(`http://localhost:8080/movie/${id}`,
        {
            method: 'GET',
            mode:'cors'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMovies(data)
            setMovie(data['movie'])
            setRecommendations(data['recommendations'])
        })
    }
    
    useEffect(() => {
        fetchMovie()
        console.log('moive is '+movie)
        console.log('recommandations is '+recommendations)

    }, [])

    return <div>
        {movie &&
        <div className="movie">
            <img src={movie['image']} alt="movie image" height={"20%"} width={"20%"}/>
            <h2>{movie['title']}</h2>

        </div>}
        <h2>recommandations</h2>
        {recommendations &&
        <div className="recommended-movies container-fluid">
            <div className="d-flex flex-row flex-nowrap overflow-auto">
            {recommendations.map((movie) => {
                return <div className="col-3">
                <div className="movie card" style={{width: "18rem"}}>
                    <h3>{movie['title']}</h3>
                    <img src={movie['image']} alt="movie image" />
                    <p>{movie['description']}</p>
                </div>
                </div>
            })}
            </div>
        </div>}
    </div>
}



export default MoviePage;