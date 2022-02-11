const controller = {}
const passport = require('passport')

controller.renderSignUp = (req, res) => {
    res.render('auth/signup.hbs')
}

controller.renderSignIn = (req, res) => {
    res.render('auth/signin.hbs')
}

controller.signUp = passport.authenticate('local.signup', {
    successRedirect: '/tasks',
    failureRedirect: '/signin',
    failureFlash: true
})

controller.signIn = (req, res, next) => {
    passport.authenticate('local.signin', {
    successRedirect: '/tasks',
    failureRedirect: '/signin',
    failureFlash: true
})(req, res, next)
}

controller.logOut = (req, res, next) => {
    req.logOut()
    res.redirect('/signin')
}


module.exports = controller