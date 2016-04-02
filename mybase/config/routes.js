var user = require('../controllers/user');
var index = require('../controllers/index');
var control = require('../controllers/control');
var movie = require('../controllers/movie');
var comment = require('../controllers/comment')

module.exports = function(app) {
    //判断session
    app.use(function(req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user
        next();
    });
    //登录
    app.post('/signIn', user.signIn);
    //注册
    app.post('/signUp', user.signUp);
    //登出
    app.get('/logout', user.logout);


    //首页
    app.get('/', movie.index);
    //电影编辑
    app.get('/movie/editor', movie.editor);
    app.post('/movie/editor', movie.save)
        //电影播放
    app.get('/movie/:id', movie.detail);
    //控制页面
    app.get('/control', user.requireLogin, control.control);
    app.post('/control', control.upload);
    //评论
    app.post('/comment', user.requireLogin, comment.save);
    //人员列表
    app.get('/userList', user.requireLogin, user.list);
    app.get('/userList/:id');
}
