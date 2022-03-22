const LoginModel = require('../models/LoginModel');

exports.index = (req, res) => {
    res.render('login');
};

exports.register = async (req, res, next) => {
    const login = new LoginModel(req.body);

    try {
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