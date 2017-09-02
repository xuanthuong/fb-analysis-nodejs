const express = require('express')
const path = require('path')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')

const router = require('./routes/routes')
const apiRouter = require('./routes/api-routers')

const app = express()
const port = 8085

const NODE_ENV = process.env.NODE_ENV || 'developement'
if (NODE_ENV == 'developement'){
    dotenv.load({path: path.join(__dirname, '..', '.env')})
}

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, 'public'), {maxAge: 315360000}))

app.use('/', router)
app.use('/contact', router)
app.use('/api', apiRouter)  

const url = 'mongodb://localhost:27017/fanpages'
const MongoClient = mongodb.MongoClient
MongoClient.connect(url, (err, db) => {
    if (err) {
        console.log('Unable to connect the mongoDB server. Error:', err)
    } else {
        console.log('A database connection established to', url)
        app.listen(port, () => {
        console.log(`Server is running at https://localhost:${port}`)
    })
    db.close()
    }
})