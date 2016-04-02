var fs = require('fs');
var formidable = require('formidable');
var mongoose = require('mongoose');
var Files = mongoose.model('Files');
//页面渲染
exports.control = function(req, res, next) {
    res.render('control', {
        index: 'unactive',
        control: 'active',
        userList: 'unactive'
    });
};
//文件上传
exports.upload = function(req, res) {
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = path.join(__dirname, '../public/upload'); //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
            console.log(err);
            return;
        } else {

            console.log(files.upload.path);
            res.send('yse');
        }
    });
}
