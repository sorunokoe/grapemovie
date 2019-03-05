const movieModel = require('../model/movie');
const userModel = require('../model/user');


module.exports = {
    getAll: function(req, res, next) {
        console.log(req.body.userId)
        let moviesList = [];
        userModel
            .findOne({_id: req.body.userId})
            .exec()
            .then(docs => {
                for (let movie of docs.favorites) {
                    moviesList.push(movie);
                }
                console.log(moviesList)
                res.json({status:"success", message: "Movies list found!", data:{movies: moviesList}});
            })
            .catch(next)
    },
    deleteById: function(req, res, next) {
        movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Movie deleted successfully!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        console.log(req.body)
        userModel
            .findOne({_id: req.body.userId})
            .exec()
            .then(docs => {
                console.log(docs)
                const fav_movie = new movieModel({
                    id: req.body.id,
                    image: req.body.image,
                    name: req.body.name,
                    rating: req.body.rating,
                    premiered: req.body.premiered,
                    summary: req.body.summary
                })
                docs.favorites.push(fav_movie)
                docs.save()
                res.json({status: "success", message: "Movie added successfully!", data: fav_movie});
            })
            .catch(next)

    },
}