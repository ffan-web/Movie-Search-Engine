import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import SearchPage from './pages/SearchPage'
import MainPage from './pages/MainPage'
import MoviePage from './pages/MoviePage'
import ActorPage from './pages/ActorPage'

class App extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" component={SearchPage} />
                        <Route exact path="/mainpage/:keyword" component={MainPage} />
                        <Route exact path="/moviepage/:id" component={MoviePage} />
                        <Route exact path="/actorpage/:id" component={ActorPage} />
                    </Switch>
                </Router>
            </div>
        )
    }
}


export default App;
