import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./MoviePage.css";

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

    const handleSearch=(event) => {
        event.preventDefault();
        // TODO: implement search logic using searchTerm state
        //console.log(`Searching for "${this.state.searchTerm}"...`);
        props.history.push(`/mainpage/${event.target[0].value}`);
      }
    

    return <div style={{ backgroundColor: "#000" }}>
    {/* navigation bar */}
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark p-2 mb-3">
        {/* IMDB LOGO */}
        <a class="navbar-brand ms-3" href="/">
            <img class="p-0"
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" width="70" height="auto" alt=""
            style={{marginLeft: "10%"}}
            />
        </a>
        {/* SEARCH BAR  align right*/}
        <form class="d-flex ms-3 me-3 ms-auto" style = {{marginLeft: "75%"}}
        onSubmit={(event) => (handleSearch(event))}
        >
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            {/* buttom outline yellow */}
            <button class="btn btn-outline-warning" type="submit">Search</button>
        </form>
    </nav>

    {movie && (
      <div
        className="card mb-3 text-white"
        style={{
          maxWidth: "800px",
          maxheight: "200px",
          backgroundColor: "#212121",
            marginLeft: "2%",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={movie["image"]}
              className="img-fluid rounded-start"
              alt="moive image"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title mb-3">
                {movie["title"]} {movie["description"]}
              </h2>
              <p className="card-text mb-3">
                <strong>Genres:</strong> {movie["genres"]}
              </p>
              <div className="stars mb-3">
              <strong>Rating: </strong>
                                {[...Array(5)].map((star, i) => {
                                    const rating = Math.floor(movie['imDbRating'] / 2);
                                    if (i < rating) {
                                    return <span class="star" style={{color: "#F6C700"}}>&#9733;</span>
                                    } else {
                                    return <span class="star" style={{color: "#F6C700"}}>&#9734;</span>
                                    }
                                })}
                                <span className="rating"> {movie['imDbRating']}</span>
              </div>
              <p className="card-text mb-3">{movie["plot"]}</p>
              <a href="#" className="btn btn-warning">
                Watch now
              </a>
            </div>
          </div>
        </div>
      </div>
    )}

    {recommendations && (
      <div className="recommendedBox">
      <h2 className="text-left" style={{color: "#F6C700",marginLeft: "2%"}}>Recommended Movies</h2>
      <p className="text-left" style={{color: "#F6C700",marginLeft: "2%"}}>Movies that you might like</p>
      <div className="recommended-movies container-fluid">
          <div className="d-flex flex-row flex-nowrap overflow-auto">
          {recommendations.map((movie) => {
              return <div class="col-3">
                      <div className="movie card border-0 mb-3 text-white" style={{backgroundColor: "#212121",width: "18rem", height: "auto", cursor: "pointer"}} key={movie['id']}
                      onClick={() => {window.location.href = `/moviepage/${movie['id']}`}}>
                      <img class="card-img-top" src={movie['image']} alt="" style = {{width: "18rem", height: "24rem"}}/>
                      <div class="card-body">
                          <h5 class="card-title">{movie['title']}</h5>
                          {/* show stars using rating */}
                          <div className="stars">
                              {[...Array(5)].map((star, i) => {
                                  const rating = Math.floor(movie['imDbRating'] / 2);
                                  if (i < rating) {
                                  return <span class="star" style={{color: "#F6C700"}}>&#9733;</span>
                                  } else {
                                  return <span class="star" style={{color: "#F6C700"}}>&#9734;</span>
                                  }
                              })}
                              <span className="rating"> {movie['imDbRating']}</span>
                          </div>
                      </div>
                  </div>
              </div>
          })}
          </div>
      </div>
  </div>
    )}
  </div>
}



export default MoviePage;