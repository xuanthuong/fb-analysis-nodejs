const getIndexView = (req, res) => {
    //res.send("Home page")
    const model = {
        user: {
            name: 'thuongtran',
            email: 'thuong.tran@dounets.com'
        },
        title: 'Homepage'
    }
    //res.render('home')
    res.render('home', model)
}

const getContactView = (req, res) => {
    res.render('contact')
}

const getAddUserView = (req, res) => {
    res.render('add-user')
}

module.exports = {
    getIndexView,
    getContactView,
}