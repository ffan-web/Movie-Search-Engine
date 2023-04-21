import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MainPage.css";

const MainPage = (props) => {
  const [totalres, setTotalres] = useState([]);
  const keyword = props.match.params.keyword;

  console.log("check keyword : ", keyword);
  
  const getallinformation = async (keyword) => {
    const res = await fetch(`http://localhost:8080/searchkey/${keyword}`, {
      method: "GET",
      mode: "cors",
    });
    console.log("backend return : ", res);
    return res.json();
  };

  useEffect(() => {
    getallinformation(keyword).then((res) => {
      setTotalres(res);
    });
  }, [keyword]);

  const handleActorClick = (id) => {
    props.history.push(`/actorpage/${id}`);
  };

  const handleMovieClick = (id) => {
    props.history.push(`/moviepage/${id}`);
  };

  const handleSearch=(event) => {
    event.preventDefault();
    // TODO: implement search logic using searchTerm state
    //console.log(`Searching for "${this.state.searchTerm}"...`);
    props.history.push(`/mainpage/${event.target[0].value}`);
  }


  return (
    <div className="background" style={{ backgroundColor: "#19191a" }}>
    
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
        <form class="d-flex ms-3 me-3 ms-auto"style = {{marginLeft: "75%"}}
        onSubmit={(event) => (handleSearch(event))}
        >
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            {/* buttom outline yellow */}
            <button class="btn btn-outline-warning" type="submit">Search</button>
        </form>
    </nav>

      <h1 className="text-center mt-3" style={{ color: "#F6C700" }}>
        Search Results for "{keyword}"
      </h1>

      <div className="container my-4">
        <div className="row">
          {totalres?.actors?.length > 0 && (
            <div className="col-md-6">
              <h2 className="text-muted">Actors</h2>
              <ul className="list-group">
                {totalres.actors.map((actor) => {
                  return (
                    <li className="list-group-item list-box" style={{height: "100px" }}>  
                      <div className="row" style={{ cursor: "pointer" }}
                      onClick={() => handleActorClick(actor.id)}
                      >
                        <div className="col-3"> 
                          <div className="actor-image-container">
                            <img
                              src={actor.image}
                              className="actor-image"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-9">
                          <h6 className="mb-0" onClick={() => handleActorClick(actor.id)}>{actor.name}</h6>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {totalres?.movies?.length > 0 && (
            <div className="col-md-6">
              <h2 className="text-muted">Movies</h2>
              <ul className="list-group">
                {totalres.movies.map((movie) => {
                  return (
                    <li className="list-group-item list-box" style={{ height: "150px" }}>
                      <div className="row" style={{ cursor: "pointer" }}> 
                        <div className="col-3">
                          <div className="movie-image-container">
                            <img
                              src={movie.image}
                              className="img-fluid rounded"
                              alt=""
                            />
                          </div>
                        </div>
                        <div className="col-9">
                          <h6 className="mb-0" onClick={() => handleMovieClick(movie.id)}>{movie.title}</h6>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {(!totalres?.actors || totalres.actors.length === 0) &&
            (!totalres?.movies || totalres.movies.length === 0) && (
              <div className="col-12 text-center">
                <h3>No Results Found</h3>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
