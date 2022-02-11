const connection = require('../../../database')
const helpers = require('../../../helpers/helpers')

const redirectPath = '/familyusers'

const controller = {}

controller.renderFamilyUsers = async (req, res) => {
    const familyusers = await connection.query(`select * from users where familycode = ${req.user.familycode} and fk_rol = 2`)
    res.render('application/familyleader/familyUsers', {
        familyusers
    })
}

controller.SaveFamilyuser = async (req, res) => {
    const { name, lastname, email, password} = req.body
    const emailExists = await helpers.emailExists(email)
    if(!emailExists){
        const newUser = {
            name,
            lastname,
            familycode: req.user.familycode,
            email,
            password,
            fk_rol: 2
        }
        newUser.password = await helpers.encryptPassword(newUser.password)
        try {
            await connection.query('insert into users set ?', [newUser])
            req.flash('success', 'User added successfully')
            res.redirect(redirectPath)
        } catch (error) {
            console.log(error)
            req.flash('danger', 'Something went wrong. Try again')
            res.redirect(redirectPath)
        }
    } else {
        req.flash("danger", "The family code assigned to you already exists")
        res.redirect(redirectPath)
    }
}

controller.EditFamilyuser = async (req, res) => {
    const { id } = req.params    
    const { name, lastname, email, password } = req.body
    const previousEmail = await connection.query('select email from users where id = ?', [id])
    const newUser = {
        name,
        lastname,
        email,
        password
    }
    newUser.password = await helpers.encryptPassword(newUser.password)
    try {
        if(previousEmail[0].email == email)
        {
            await connection.query('update users set name = ?, lastname = ?, email = ?, password = ? where id = ?',
                [newUser.name, newUser.lastname, newUser.email, newUser.password, id])
            req.flash('success', 'User updated successfully')
            res.redirect(redirectPath)
        } else {
            const emailExists = await helpers.emailExists(email)
            if(!emailExists){
                await connection.query('update users set name = ?, lastname = ?, email = ?, password = ? where id = ?',
                    [newUser.name, newUser.lastname, newUser.email, newUser.password, id])
                req.flash('success', 'User updated successfully')
                res.redirect(redirectPath)
          
            } else {
                req.flash("danger", "The email is already registered")
                res.redirect(redirectPath)
            }
        }
    } catch (error) {
        console.log(error)
        req.flash('danger', 'Something went wrong. Try again')
        res.redirect(redirectPath)
    }    
}

controller.DeleteFamilyUser = async (req, res) => {
    const { id } = req.params
    await connection.query(`UPDATE tasks SET fk_familycode = NULL WHERE fk_familycode = ${req.user.familycode}`)
    try {
        await connection.query(`delete from users where id = ${id}`)
        await connection.query(`UPDATE tasks SET fk_familycode = ${req.user.familycode} WHERE isnull(fk_familycode)`)
        req.flash('success', 'The user deleted successfully')
        res.redirect(redirectPath)
    } catch (error) {
        console.log(error)
        req.flash('danger', 'Something went wrong. Try again')
        res.redirect(redirectPath)
    }
}

module.exports = controller