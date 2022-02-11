const exhbs = require('express-handlebars')
const connection = require('../database')
const { format } = require('timeago.js')

let hbs = exhbs.create({})

hbs.handlebars.registerHelper('isFamilyLeader', (user) => {
    try {
        return user.fk_rol == 1 ? true : false
    } catch (e) {
         
    }
})

hbs.handlebars.registerHelper('isFamilyuserOrFamilyleader', (user) => {
    try {
        return user.fk_rol == 1 || user.fk_rol == 2 ? true : false   
    } catch (e) {
        
    }
})

hbs.handlebars.registerHelper('timeago', (timestamp) => {
    return format(timestamp)
})

hbs.handlebars.registerHelper('isNormal', (importance) => {
    return importance == 'Normal' ? true : false
})

hbs.handlebars.registerHelper('isImportant', (importance) => {
    return importance == 'Important' ? true : false
})

hbs.handlebars.registerHelper('isVeryImportant', (importance) => {
    return importance == 'Very Important' ? true : false
})