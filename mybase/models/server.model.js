var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
//文件模型
var FileSchema = new mongoose.Schema({
    uid: Number,
    psd: String,
    html: String,
    meta: {
        data: {
            type: Date,
            default: Date.now
        }
    }
});
mongoose.model('Files', FileSchema);
//电影模型
var MovieSchema = new mongoose.Schema({
    title: String,
    hero: String,
    userId: String,
    poster: String,
    intro: String,
    src: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
MovieSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
})

MovieSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    }
};
mongoose.model('Movies', MovieSchema);
//评论模型
var CommentSchema = new mongoose.Schema({
    movie: {
        type: ObjectId,
        ref: 'Movies'
    },
    from: {
        type: ObjectId,
        ref: 'Users'
    },
    reply: [{
        from: {
            type: ObjectId,
            ref: 'Users'
        },
        to: {
            type: ObjectId,
            ref: 'Users'
        },
        content: String
    }],
    content: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});
CommentSchema.pre('save', function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    next()
});

CommentSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    }
};
mongoose.model('Comment', CommentSchema);
//用户模型
var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: String,
    dota: {
        name: {
            type: String,
            default: '未填写'
        },
        dotaId: {
            type: String,
            default: '未填写'
        },
        gameName: {
            type: String,
            default: '未填写'
        }
    },
    // 0: nomal user
    // 1: verified user
    // 2: professonal user
    // >10: admin
    // >50: super admin
    role: {
        type: Number,
        default: 0
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

UserSchema.pre('save', function(next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    bcrypt.hash(user.password, null, null, function(err, hash) {
        if (err) {
            return next(err)
        }
        user.password = hash
        next()
    })
})

UserSchema.methods = {
    comparePassword: function(_password, cb) {
        bcrypt.compare(_password, this.password, function(err, isMatch) {
            if (err) return cb(err)

            cb(null, isMatch)
        })
    }
}
UserSchema.statics = {
    fetch: function(cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id, cb) {
        return this
            .findOne({
                _id: id
            })
            .exec(cb)
    }
}
mongoose.model('Users', UserSchema);
