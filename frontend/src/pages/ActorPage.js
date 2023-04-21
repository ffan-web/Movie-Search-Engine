import React from 'react';
import data from './ActorTest.json';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ActorPage = (props) => {
    //const id = props.match.params.id
    const { id } = useParams()
    const [data, setData] = useState([])
    const [actor, setActor] = useState([])
    const [recommendations, setRecommendations] = useState([])

    const fetchMovie = () => {

        fetch(`http://localhost:8080/actor/${id}`,
        {
            method: 'GET',
            mode:'cors'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setData(data)
            setActor(data['actor'])
            setRecommendations(data['recommendations'])
        })
    }
    
    useEffect(() => {
        fetchMovie()
    }, [])

    return <div>
        <div class="card" style={{width: "18rem"}}>
            < img class="card-img-top" src={actor['image']} alt=""/>
            <div class="card-body">
                <h5 class="card-title">{actor['name']}</h5>
                <p class="card-text">{actor['primaryprofession']}</p >
            </div>
        </div>
        {/* recommended movies */}
        <h2>Recommended Movies</h2>
        <div className="recommended-movies container-fluid">
            <div className="d-flex flex-row flex-nowrap overflow-auto">
            {recommendations.map((movie) => {
                return <div class="col-3">
                        <div className="movie card" key={movie['id']} style={{width: "18rem"}}>
                        < img class="card-img-top" src={movie['image']} alt=""/>
                        <div class="card-body">
                            <h5 class="card-title">{movie['title']}</h5>
                            <p class="card-text">{movie['imDbRating']}</p >
                        </div>
                    </div>
                </div>
            })}
            </div>
        </div>
    </div>
}

export default ActorPage;