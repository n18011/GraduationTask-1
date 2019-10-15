const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
/*
const challonge = require('challonge')
const client = challonge.createClient({
  apiKey: 'THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU'
})
*/
const express = require('express')
const request = require('superagent')
const app = express()

app.get('/api', (req, res) => {
  const date = new Date()
  const hours = (date.getHours() % 12) + 1 // London is UTC + 1hr;
  res.json({ bongs: 'BONG '.repeat(hours) })
})

app.get('/api/show', (req, res) => {
  request.get('https://n18011:THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU@api.challonge.com/v1/tournaments.json')
    .end((err, resp) => {
      res.json(resp)
    })
})

exports.bigben = functions.https.onRequest(app)

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
