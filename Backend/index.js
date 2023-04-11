const express = require('express')
const { MongoClient, ObjectId } = require('mongodb')
const mongodb = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const dbUrl = 'mongodb+srv://rohit10231:rohitkaranpujari@cluster0.kjynvxt.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(dbUrl)
const port = 6000

// getting all users information
app.get('/', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('User_registration')
        let users = await db.collection('users').find().toArray()
        res.status(200).send(users)
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// creating new user
app.post('/userSignUp', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('User_registration')
        await db.collection('users').insertOne(req.body)
        res.status(201).send({ message: 'User Registartion Successful', data: req.body })
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// editing user information
app.put('/updateUser/:email', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('User_registration')
        let user = await db.collection('users').updateOne({ email: req.params.email }, { $set: req.body })
        res.status(200).send({ message: 'User info updated successfully' })
    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

// user login
app.get('/userLogin/:email/:password', async (req, res) => {
    const client = await MongoClient.connect(dbUrl)
    try {
        const db = await client.db('User_registration')
        let user = await db.collection('users').findOne({ email: req.params.email, password: req.params.password })
        if (user) {
            res.status(200).send({ message: 'Login Successful', data: user })
        }
        else {
            res.status(400).send({ message: `User not found with email ${req.params.email} and password ${req.params.password}` })
        }

    }
    catch (error) {
        res.status(400).send({ message: 'Internal server error', error })
    }
    finally {
        client.close()
    }
})

app.listen(port, () => { console.log(`App listening on ${port}`) })
