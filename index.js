const Joi = require('joi');
// build a web server
const express = require('express');
const app = express();
// allow app to parse json
app.use(express.json());

const genres = [];
// validate if requested genre meets required schema
validateGenre = (genre) => {
    const schema = {
        type: Joi.string().min(3).required()
    }
    return Joi.validate(genre, schema);
}
// getting all genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});
// get a single genre
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given id was not found');
    res.send(genre);
});
// create genre
app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    const genre = {
        id: genres.length + 1,
        type: req.body.type
    }
    genres.push(genre);
    res.send(genre);
});
// update single genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given id was not found.');
    const { error } = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    genre.type = req.body.type;
    res.send(genre);
});
// delete single genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('The genre with the given id was not found.');
    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

const port = process.env.PORT || 3000;
// listen on, if set, PORT environment variable otherwise port 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));