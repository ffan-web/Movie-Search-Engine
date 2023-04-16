const express = require("express");
const app = express();

const search = require('./routes/search');
const movie = require('./routes/movie');
const actor = require('./routes/actor');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
     const addr = server.address();
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
});

app.get("/", (req, res) => {
    res.send("Hello IMDB!");
});

search(app);
movie(app);
actor(app);
