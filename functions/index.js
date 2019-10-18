const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const admin = require('firebase-admin')
require('firebase/firestore')
require('firebase/auth')

var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'graduation-task-d7fc3.firebaseapp.com',
  databaseURL: 'https://graduation-task-d7fc3.firebaseio.com',
  projectId: 'graduation-task-d7fc3',
  storageBucket: 'graduation-task-d7fc3.appspot.com',
  messagingSenderId: '755416615184',
  appId: '1:755416615184:web:4105f566a4aaf89ab3fd95'
}
// Initialize Firebase
admin.initializeApp(firebaseConfig)
const db = admin.firestore()

// admin.initializeApp(functions.config().firebase)
/*
const challonge = require('challonge')
const client = challonge.createClient({
  apiKey: 'THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU'
})
*/
const express = require('express')
const request = require('superagent')
const cors = require('cors')

const REGION_TOKYO = 'asia-northeast1'
const app = express()

const whitelist = ['https://graduation-task-d7fc3.web.app', 'https://graduation-task-d7fc3.firebaseapp.com']

const corsConfig = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
// app.use(express.json())
app.use(cors(corsConfig))

app.get('/api', async (req, res) => {
  const date = new Date()
  const hours = (date.getHours() % 12) + 1 // London is UTC + 1hr;
  await res.json({ bongs: 'BONG '.repeat(hours) })
})

app.get('/api/show', async (req, res) => {
  await request.get('https://n18011:THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU@api.challonge.com/v1/tournaments.json')
    .accept('application/json')
    .end((err, resp) => {
      res.json(resp.body)
    })
})

app.get('/api/events', async (req, res) => {
  const events = []
  await db.collection('events').where('status.nowhold', '==', true).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.id, '=>', doc.data())
        events.push(
          {
            ...doc.data(),
            id: doc.id
          })
      })
    })
  res.json(events)
}
)

exports.bigben = functions.region(REGION_TOKYO).https.onRequest(app)

/*
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('helloWorld!')
})

exports.events = functions.https.onRequest(async (req, res) => {
  await client.tournaments.show({
    id: 'n18011test',
    callback: (err, data) => {
      console.log(err)
      res.send(data)
    }
  })
})

exports.tournamentsCreate = functions.https.onRequest((req, res) => {
  client.tournaments.create({
    tournament: {
      name: 'functionTest',
      url: 'functionTest',
      tournamentType: 'single elimination'
    },
    callback: (err, data) => {
      console.log(err, data)
    }
  })
})
*/
