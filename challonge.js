/*
const challonge = require('challonge')

const client = challonge.createClient({
  apiKey: 'THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU'
})

client.tournaments.show({
  id: 'n18011Test',
  callback: (err, data) => {
    console.log(err, data)
  }
})
*/
import 'whatwg-fetch'
fetch('https://api.challonge.com/v1/tournaments/n18011Test.json', {
  headers: {
    api_key: 'THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU'
  }
})
  .then(res => {
    return res.json()
  })
  .then(json => {
    console.log(JSON.stringify(json))
  })
