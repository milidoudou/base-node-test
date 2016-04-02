var mongoose = require('mongoose');
var Movies = mongoose.model('Movies');
var Comment = mongoose.model('Comment');
exports.detail = function(req, res) {
    var id = req.params.id;
    Movies.findById(id, function(err, movie) {
        Comment.find({
                movie: id
            })
            .populate('from', 'name')
            .exec(function(err, comment) {
                res.render('detail', {
                    index: 'active',
                    control: 'unactive',
                    userList: 'unactive',
                    movie: movie,
                    comment: comment
                });
            });
    });
};
exports.editor = function(req, res) {
    res.render('editor', {
        index: 'active',
        control: 'unactive',
        userList: 'unactive'
    });
};
exports.save = function(req, res) {
    var movie = req.body;
    movie.userId = req.session.user.name;
    var movieObj = new Movies(movie);
    movieObj.save(function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/movie/' + doc.id);
        }
    });
    console.log(movie);
};
exports.index = function(req, res) {
    Movies.fetch(function(err, movies) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                index: 'active',
                control: 'unactive',
                userList: 'unactive',
                movies: movies
            });
        }
    });
}
