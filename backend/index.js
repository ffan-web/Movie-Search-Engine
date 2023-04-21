const express = require("express");
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    Credentials: true,
    allowHHeaders: ['Origin', 'Content-Type', 'Accept'],
    methods: ['GET', 'POST'],
    sameSite: 'None'
}
app.use(cors(corsOptions))

const search = require('./routes/search');
const movie = require('./routes/movie');
const actor = require('./routes/actor');

const port = process.env.PORT || 8080;
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
