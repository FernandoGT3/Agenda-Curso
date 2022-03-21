
exports.checkCSRFError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('404');
    }
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken(); //criando um token e jogando na variável global do middleware
    next();
}