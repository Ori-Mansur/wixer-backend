'use strict'
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb+srv://ori:wixer@cluster0-3ra1q.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// const config= require('config')
// Connection URL
const url1 = (false && process.env.NODE_ENV === 'production')? 
    'mongodb+srv://theDbUser:camay2019@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority' 
    : 'mongodb://localhost:27017';

// Database Name
const dbName = 'wixer';

var dbConn = null;

async function connect() {
    if (dbConn) return dbConn;
    try {
        const client = await MongoClient.connect(url, {useNewUrlParser: true});
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch(err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}


async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

module.exports = {
    getCollection
}