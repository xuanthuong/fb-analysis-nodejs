const path = require('path')
const dotenv = require('dotenv')
const mongodb = require('mongodb')

const NODE_ENV = process.env.NODE_ENV || 'developement'
if (NODE_ENV == 'developement'){
    dotenv.load({path: path.join(__dirname, '..', '.env')})
}

process.env.DATABASE_URI = 'mongodb://localhost:27017/blueprint'
const MongoClient = mongodb.MongoClient

const db = {}

db.MongoClient = MongoClient

module.exports = db