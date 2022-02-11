const authMiddleware = {}
const helpers = require('../helpers/helpers')

authMiddleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('danger', 'Log in to access')
    res.redirect('/signin')
}

authMiddleware.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/profile')
}

authMiddleware.isFamilyLeader = (req, res, next) => {
    if(req.user.fk_rol === 1){
        return next()
    }
    req.flash('danger', 'Only the family leader can access this module')
    res.redirect('/profile')
}

module.exports = authMiddleware