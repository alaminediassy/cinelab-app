// Importation des modules nécessaires
const express = require('express');
const app = express();
const path = require('path');
const port = 4000;
const request = require('request');

// Configuration de l'application
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Utilisation de fichiers statiques
app.use(express.static('public'));
// Route pour afficher les résultats de la recherche
app.get('/results', (req, res) => {
    // Récupération de la requête de recherche depuis l'URL
    let query = req.query.search;
    // Appel à l'API pour récupérer les films correspondant à la recherche
    request(`https://api.themoviedb.org/3/search/movie?api_key=e6f88954c2825ba363ff3894afd5d8e5&query=${query}`, (error, response, body) => {
        if(error){
            console.log(error)
        }
        // Conversion de la réponse en JSON
        let data = JSON.parse(body);

        // Affichage des résultats de la recherche dans la vue movies.ejs
        res.render('movies', {data:data, searchQuery:query});
    });
})

// Route pour afficher le formulaire de recherche
app.get('/search', (req, res) => {
    res.render('search');
});

// Lancement du serveur
app.listen(port, ()=> {
    console.log(`Server started on port http://localhost:${port}`);
});
