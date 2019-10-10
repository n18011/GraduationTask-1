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
