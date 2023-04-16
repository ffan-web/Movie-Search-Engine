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
function search_actor(req, res) {
    var id = req.params.id;
    var myStrQuery = 'q=id:"' + id + '"&wt=json';
    console.log(myStrQuery)

    solrClient.search(myStrQuery, function (err, result) {
        if (err) {
            console.log(err);
            res.status(500).send('Error searching for movie with ID ' + id);
            return;
        }
        //console.log('Response:', result.response);
        var actor = result.response.docs[0];
        if (actor == null) {
            res.status(404).send('Actor with ID ' + id + ' not found');
            return;
        }

        var name = actor.name;
        var priname = actor.primaryname[0];
        //console.log('name: ' + name, priname);

        // Search for movies with the same genre
        var actor_StrQuery = 'q=stars:"' + name + '"'+'OR stars:"'+priname+'"&sort=imDbRating desc'+'&wt=json';
        //console.log(actor_StrQuery)
        solrClient.search(actor_StrQuery, function (err, recommendations) {
            if (err) {
                console.log(err);
                res.status(500).send('Error searching for movies with actor ' + name);
                return;
            }
            //console.log('Response:', result.response);
            var movies = recommendations.response.docs;
            if (movies == null) {
                res.status(404).send('Movies with actor ' + name + ' not found');
                return;
            }

            //if recommendation is less than 10, then search for movies with the same genre
            if (movies.length < 10) {
                //find the the genre of the first movie
                var genres = movies[0].genres;
                var genre = genres[0].split(',')[0];
                //console.log('genre: ' + genre);

                // Search for movies with the same genre
                var genre_StrQuery = 'q=genres:"' + genre + '"'+'&sort=imDbRating desc'+'&wt=json';

                solrClient.search(genre_StrQuery, function (err, recommendations2) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Error searching for movies with genre ' + genre);
                        return;
                    }
                    //console.log('Response:', result.response);
                    var movies2 = recommendations2.response.docs;
                    if (movies2 == null) {
                        res.status(404).send('Movies with genre ' + genre + ' not found');
                        return;
                    }

                    // add the movies with the same genre to the recommendation list
                    for (var i = 0; i < movies2.length; i++) {
                        movies.push(movies2[i]);
                    }

                    //keep the first 10 movies
                    movies = movies.slice(0, 10);

                    // Send the JSON response back to the client
                    res.json({
                        actor: actor,
                        recommendations: movies
                    });
                });
            } else {
                // Send the JSON response back to the client
                res.json({
                    actor: actor,
                    recommendations: movies
                });
            }
        });
    });
}


module.exports = (app) => {
    app.get('/actor/:id', search_actor);
}
