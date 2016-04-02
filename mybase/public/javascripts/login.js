$(document).ready(function() {
    //注册
    $('#signUp')
        .bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                user: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '6到30个字符'
                        },
                        /*remote: {
                            url: 'remote.php',
                            message: 'The username is not available'
                        },*/
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '只能是字母数字，下划线'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        identical: {
                            field: 'confirmPassword',
                            message: '密码不一致'
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        identical: {
                            field: 'password',
                            message: '密码不一致'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();

            $.ajax({
                url: $('form#sign-Up').attr('action'),
                type: 'POST',
                data: $('form#sign-Up').serializeArray(),
                success: function(data) {
                    $('#signUp').modal('hide');
                    var logout = '<li class="logout"><a href="javascript:;">' + data.name + '/<span id="logout">退出</span></a></li>';
                    $('#signIn').modal('hide');
                    $('.sign-in').replaceWith(logout);
                    window.location.href = window.location.href;
                }
            })
        });
    //登录
    $('#signIn')
        .bootstrapValidator({
            message: 'This value is not valid',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                user: {
                    message: 'The username is not valid',
                    validators: {
                        notEmpty: {
                            message: 'The username is required and can\'t be empty'
                        },
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: 'The username must be more than 6 and less than 30 characters long'
                        },
                        /*remote: {
                            url: 'remote.php',
                            message: 'The username is not available'
                        },*/
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: 'The username can only consist of alphabetical, number, dot and underscore'
                        }
                    }
                },
                // email: {
                //     validators: {
                //         notEmpty: {
                //             message: 'The email address is required and can\'t be empty'
                //         },
                //         emailAddress: {
                //             message: 'The input is not a valid email address'
                //         }
                //     }
                // },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'The password is required and can\'t be empty'
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();

            $.ajax({
                url: $('form#sign-In').attr('action'),
                type: 'POST',
                data: $('form#sign-In').serializeArray(),
                success: function(data) {
                    if (data.name) {
                        var logout = '<li class="logout"><a href="javascript:;">' + data.name + '/<span id="logout">退出</span></a></li>';
                        $('#signIn').modal('hide');
                        $('.sign-in').replaceWith(logout);
                        window.location.href = window.location.href;
                    } else {
                        alert('用户名或密码错误');
                    }
                }
            })
        });
    $('.navbar-right').delegate('#logout', 'click', function(event) {

        $.ajax({
            url: '/logout',
            type: 'GET',
            success: function(data) {
                var login = '<li class="sign-in" data-toggle="modal" data-target="#signIn"><a href="javascript:;">登录</a></li>'
                $('.logout').replaceWith(login);
                window.location.href = window.location.href;
            }
        });
    });
});
