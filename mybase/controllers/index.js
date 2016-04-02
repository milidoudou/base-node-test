exports.index = function(req, res, next) {
    res.render('index', {
        index: 'active',
        control: 'unactive',
        userList: 'unactive'
    });
}
