const fetch = require('node-fetch')
const url = 'https://api.challonge.com/v1/tournaments/jwwfxitk.json?api_key=THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU'
var list = []
fetch(url)
  .then(res => {
    return res.json()
  })
  .then(json => {
    list.push(json)
    console.log(list)
  })

export { list }
