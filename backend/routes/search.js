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


function search_all(req, res) {
    var myStrQuery = 'q=*%3A*&wt=json';
    // Search documents using strQuery
    solrClient.search(myStrQuery, function (err, result) {
        if (err) {
        console.log(err);
        res.status(500).send('Error querying Solr');
        return;
        }
        //console.log('Response:', result.response);

        // Send the JSON response back to the client
        res.json(result.response);
    });
}
function search_keyword(req, res){
    var keyword_movie = req.params.keyword;
    var myStrQuery = 'q=title:"' + keyword_movie +'"&sort=imDbRatingVotes desc&wt=json';

    solrClient.search(myStrQuery, function (err, result) {
        if (err) {
        console.log(err);
        res.status(500).send('Error querying Solr');
        return;
        }

        var keyword_actor = req.params.keyword;
        var actor_StrQuery = 'q=name:"' + keyword_actor +'"&wt=json';
        solrClient.search(actor_StrQuery, function (err, actor) {
            if (err) {
                console.log(err);
                res.status(500).send('Error querying Solr');
                return;
            }


        //console.log('Response:', result.response);

        // Send the JSON response back to the client
            res.json({
                movies: result.response.docs,
                actors: actor.response.docs
            });
        }
        );
    });

}

module.exports = (app) => {
    app.get('/search', search_all);
    app.get('/searchkey/:keyword', search_keyword);
}