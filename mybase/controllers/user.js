var mongoose = require('mongoose');
var User = mongoose.model('Users');

//注册
exports.signUp = function(req, res, next) {
        var _user = req.body.user;
        var _password = req.body.password;
        var user = {
            name: _user,
            password: _password
        };
        User.findOne({
            name: user.name
        }, function(err, doc) {
            if (err) {
                console.log(err);
            }
            if (doc) {
                res.json({
                    flag: 'used'
                });
            } else {
                var userObj = new User(user);
                userObj.save(function(err, userObj) {
                    if (err) {
                        console.log(err);
                        return next();
                    } else {
                        req.session.user = userObj;
                        res.json(user);
                    }
                });
            }
        });
    }
    //登录
exports.signIn = function(req, res, next) {
    var _user = req.body.user;
    var _password = req.body.password;
    var user = {
        name: _user,
        password: _password
    };
    User.findOne({
        name: user.name
    }, function(err, doc) {
        if (err) {
            console.log(err);
        }
        if (doc) {
            doc.comparePassword(user.password, function(err, isMatch) {
                if (err) {
                    console.log(err)
                }
                if (isMatch) {
                    req.session.user = doc;
                    res.json(doc);
                } else {
                    res.json('passwordErr');
                }
            })
        } else {
            res.json('不存在');
        }
    });
};
//登出
exports.logout = function(req, res, next) {
    delete req.session.user;
    res.json('logout');
};
//需要登录
exports.requireLogin = function(req, res, next) {
    var user = req.session.user;
    if (!user) {
        res.render('requireLogin', {
            index: 'unactive',
            control: 'unactive',
            userList: 'unactive'
        });
    } else {
        next();
    }
};
//用户列表和信息
exports.list = function(req, res, next) {
    User.fetch(function(err, doc) {
        res.render('list', {
            index: 'unactive',
            control: 'unactive',
            userList: 'active',
            member: doc
        });
    });
}
