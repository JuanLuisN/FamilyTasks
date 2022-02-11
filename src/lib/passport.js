const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const helpers = require('../helpers/helpers')
const connection = require('../database')

passport.use('local.signin', new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, email, password, done) => {
    const rows = await connection.query("select * from users where email = ?", [email])
    if(rows.length > 0) {
        const user = rows[0]
        const validPass = await helpers.matchPassword(password, user.password)
        if(validPass){
            done(null, user, req.flash("success", `Welcome ${user.name}`))
        }else{
            done(null, false, req.flash("danger", "Incorrect password. Try again"))
        }
    }else{
        return done(null, false, req.flash("danger", "The email does not exists. Try again"))
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done ) => {
    const existsemail = await helpers.emailExists(email)    
    if(!existsemail){
        const { name, lastname } = req.body
        const familycode = ''
        const newUser = {
            name,
            lastname,
            familycode,
            email,
            password,
            fk_rol: 1
        }
        newUser.familycode = Math.random() * (10000 - 1) + 1 
        const existscode = await helpers.familycodeExists(newUser.familycode)
        newUser.password = await helpers.encryptPassword(password)
        if(!existscode){
            const result = await connection.query('insert into users set ?', [newUser])
            req.flash("success", "Account registered successfully")
            newUser.id = result.insertId
            return done(null, newUser)
        } else {
            return done(null, false, req.flash("danger", "The family code assigned to you already exists"))
        }
    } else {
        return done(null, false, req.flash("danger", "The email is already registered"))
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const rows = await connection.query('select * from users where id = ?', [id])
    done(null, rows[0])
})