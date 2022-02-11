const connection = require('../../database')
const controller = {}

const redirectPath = '/tasks'

controller.renderFamilyTasks = async (req, res) => {
    const tasks = await connection.query(`select * from tasks where fk_familycode = ${req.user.familycode}`)
    res.render('user/familyTasks', {
        tasks
    })
}

controller.SaveTask = async (req, res) => {
    const { title, body, importance } = req.body
    const newTask = {
        title, 
        body,
        importance,
        status: 'incomplete',
        fk_familycode: req.user.familycode 
    }
    console.log(newTask)
    try {
        await connection.query('insert into tasks set ?', [newTask])
        req.flash('success', 'The task was saved successfully')
        res.redirect(redirectPath)
    } catch (error) {
        console.log(error)
        req.flash('danger', 'Something went wrong. Try again')
    }
}

module.exports = controller