const movieModel = require('../model/movie');
const userModel = require('../model/user');


module.exports = {
    getById: function(req, res, next) {
        console.log(req.body);
        movieModel.findById(req.params.movieId, function(err, movieInfo){
            if (err) {
                next(err);
            } else {
                res.json({status:"success", message: "Movie found!!!", data:{movies: movieInfo}});
            }
        });
    },
    getAll: function(req, res, next) {
        let moviesList = [];
        movieModel.find({}, function(err, movies){
            if (err){
                next(err);
            } else{
                for (let movie of movies) {
                    moviesList.push({id: movie.id, name: movie.name});
                }
                res.json({status:"success", message: "Movies list found!!!", data:{movies: moviesList}});
            }
        });
    },
    deleteById: function(req, res, next) {
        movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo){
            if(err)
                next(err);
            else {
                res.json({status:"success", message: "Movie deleted successfully!!!", data:null});
            }
        });
    },
    create: function(req, res, next) {
        userModel
            .find({_id: req.body.userId})
            .exec()
            .then(docs => {
                console.log(docs)
                res.json({"status": "success"})
            })
            .catch(next)

        // movieModel.create({ name: req.body.name, released_on: req.body.released_on }, function (err, result) {
        //     if (err)
        //         next(err);
        //     else
        //         res.json({status: "success", message: "Movie added successfully!!!", data: null});
        //
        // });
    },
}