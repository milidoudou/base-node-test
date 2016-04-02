var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

exports.save = function(req, res, next) {
    var _comment = req.body;
    var movieId = _comment.movie;
    var comment = new Comment(_comment);
    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/movie/' + movieId);
        }
    });
}
