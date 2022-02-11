const controller = {}
const connect = require('../database')

controller.renderProfile = (req, res) => {
    res.render('auth/profile.hbs')
}

module.exports = controller