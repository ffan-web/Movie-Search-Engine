import React from 'react';

class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          keyword: props.match.params.keyword,
          actorId: '',
          movieId: '',
        };

        this.handleActorIdChange = this.handleActorIdChange.bind(this);
        this.handleMovieIdChange = this.handleMovieIdChange.bind(this);
        this.goToActorPage = this.goToActorPage.bind(this);
        this.goToMoviePage = this.goToMoviePage.bind(this);
    }

    handleActorIdChange(event) {
        this.setState({ actorId: event.target.value });
    }

    handleMovieIdChange(event) {
        this.setState({ movieId: event.target.value });
    }

    goToActorPage() {
        this.props.history.push(`/actorpage/${this.state.actorId}`);
    }

    goToMoviePage() {
        this.props.history.push(`/moviepage/${this.state.movieId}`);
    }

    render() {
        return (
            <div>
                <h1>Hello {this.state.keyword}</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Enter actor ID"
                        value={this.state.actorId}
                        onChange={this.handleActorIdChange}
                    />
                    <button onClick={this.goToActorPage}>Go to Actor Page</button>
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Enter movie ID"
                        value={this.state.movieId}
                        onChange={this.handleMovieIdChange}
                    />
                    <button onClick={this.goToMoviePage}>Go to Movie Page</button>
                </div>
            </div>
        )
    }
}

export default MainPage;