const SolrNode = require('solr-node');
const config = require('../config.json');
const log4js = require('log4js');

var solrClient = new SolrNode ({
    host: config.solrHost,
    port: config.solrPort,
    core: config.solrCoreName,
    protocol: config.solrProtocol,
});


// Set logger level (can be set to DEBUG, INFO, WARN, ERROR, FATAL or OFF)
require('log4js').getLogger('solr-node').level = 'DEBUG';


// Search the movie with the given id, and then recommend the movies by ratings with the same genre 
function search_movie(req, res) {
    var id = req.params.id;
    var myStrQuery = 'q=id:"' + id + '"&wt=json';

    solrClient.search(myStrQuery, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Error searching for movie with ID ' + id);
            return;
        }
        //console.log('Response:', result.response);
        var movie = result.response.docs[0];
        if (movie == null) {
            res.status(404).send('Movie with ID ' + id + ' not found');
            return;
        }

        var genres = movie.genres;
        var genre = genres[0].split(',')[0];
        console.log('genre: ' + genre);

        // Search for movies with the same genre
        var genre_StrQuery = 'q=genres:"' + genre + '"'+'&sort=imDbRatingVotes desc'+'&wt=json';

        solrClient.search(genre_StrQuery, function (err, recommendations) {
            if (err) {
                console.log(err);
                res.status(500).send('Error searching for movies with genre ' + genre);
                return;
            }
            //console.log('Response:', result.response);
            var movies = recommendations.response.docs;
            if (movies == null) {
                res.status(404).send('Movies with genre ' + genre + ' not found');
                return;
            }

            // Send the JSON response back to the client
            res.json({
                movie: movie,
                recommendations: movies
            });
        }
        );

    }
    );
}

module.exports = (app) => {
    app.get('/movie/:id', search_movie);
}

