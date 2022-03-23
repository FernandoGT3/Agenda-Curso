const LoginModel = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado');
    return res.render('login');
};

exports.register = async (req, res, next) => {
    try {
        const login = new LoginModel(req.body);
        await login.register();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', "Usuário Cadastrado com Sucesso");
        req.session.save(function () {
            return res.redirect('/login/index');
        });

    } catch (error) {
        console.log(error)
        return res.render('404');
    }
};

exports.enter = async (req, res, next) => {
    try {
        const login = new LoginModel(req.body);
        await login.entry();

        if(login.errors.length > 0){
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('/login/index');
            });
            return;
        }

        req.flash('success', "Usuário Logado com Sucesso");
        req.session.user = login.user; //jogando o usuário para dentro da sessão
        req.session.save(function () {
            return res.redirect('/login/index');
        });

    } catch (error) {
        console.log(error)
        return res.render('404');
    }
};

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};