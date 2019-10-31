// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const functions = require('firebase-functions')

const express = require('express')
const app = express()
const REGION_TOKYO = 'asia-northeast1' // functionのリージョンhostingと同じ

const cors = require('cors')

const client = require('./challonge-client.js')
/*
const whitelist = [ // functionsとの通信を許可するドメインリスト
  'https://graduation-task-d7fc3.web.app',
  'https://graduation-task-d7fc3.firebaseapp.com',
  'https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net'
]

const corsConfig = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsConfig)) // 制限付きcors
*/
app.use(cors({})) // 全許可cors

/*
 * Tonamentsのmethod一覧
 */

app.route('/tournaments')
// トーナメント一覧を参照
  .get(async (req, res) => {
    await client.tournaments.index({
      callback: (err, data) => {
        if (err) {
          console.log(err)
          res.json(err)
        } else {
          res.json(data)
        }
      }
    })
  })

// 新規トーナメントを作成
  .post(async (req, res) => {
    const tournament = req.body.tournament
    await client.tournaments.create({
      tournament,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else {
          console.log(req.body)
          res.json(data)
        }
      }
    })
  })

app.route('/tournaments/:tournament')
// :tournamentのトーナメントを参照(:tournamentはtournament.url)
  .get(async (req, res) => {
    const id = req.params.tournament
    await client.tournaments.show({
      id,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournamentのトーナメント情報の更新(:tournamentはtournament.url)*req.bodyにobjが必要
  .put(async (req, res) => {
    const id = req.params.tournament
    const tournament = req.body.tournament
    await client.tournaments.update({
      id,
      tournament,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournamentのトーナメントを削除(:tournamentはtournament.url)
  .delete(async (req, res) => {
    const id = req.params.tournament
    await client.tournaments.destroy({
      id,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournamentのトーナメントをスタート
app.post('/tournaments/:tournament/start', async (req, res) => {
  const id = req.params.tournament
  await client.tournaments.start({
    id,
    callback: (err, data) => {
      if (err) {
        console.log(err); res.json(err)
      } else { res.json(data) }
    }
  })
})

// :tournamentのトーナメントを終了
app.post('/tournaments/:tournament/finalize', async (req, res) => {
  const id = req.params.tournament
  await client.tournaments.finalize({
    id,
    callback: (err, data) => {
      if (err) {
        console.log(err); res.json(err)
      } else { res.json(data) }
    }
  })
})

// :tournamentのトーナメントをリセット
app.post('/tournaments/:tournament/reset', async (req, res) => {
  const id = req.params.tournament
  await client.tournaments.reset({
    id,
    callback: (err, data) => {
      if (err) {
        console.log(err); res.json(err)
      } else { res.json(data) }
    }
  })
})

// :tournamentのトーナメントを開始する?
app.post('/tournaments/:tournament/process_check_ins', async (req, res) => {
  const id = req.params.tournament
  await client.tournaments.processCheckIns({
    id,
    callback: (err, data) => {
      if (err) {
        console.log(err); res.json(err)
      } else { res.json(data) }
    }
  })
})

// :tournamentのトーナメントを中止する?
app.post('/tournaments/:tournament/abort_check_in', async (req, res) => {
  const id = req.params.tournament
  await client.tournaments.abortCheckIns({
    id,
    callback: (err, data) => {
      if (err) {
        console.log(err); res.json(err)
      } else { res.json(data) }
    }
  })
})

/*
 * Matchesのmethod一覧
 */

// :tournament中の試合一覧を参照
app.get('/tournaments/:tournament/matches', async (req, res) => {
  const id = req.params.tournament
  await client.matches.index({
    id,
    callback: (err, data) => {
      if (err) {
        console.log(err); res.json(err)
      } else { res.json(data) }
    }
  })
})

app.route('/tournaments/:tournament/matches/:match_id')
// :tournament中の試合詳細を参照
  .get(async (req, res) => {
    const id = req.params.tournament
    const matchId = req.params.match_id
    await client.matches.show({
      id,
      matchId,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournament中の試合詳細を更新
  .put(async (req, res) => {
    const id = req.params.tournament
    const matchId = req.params.match_id
    const match = req.body.match
    await client.matches.update({
      id,
      matchId,
      match,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

/*
 * Participantsのmethod一覧
 */

app.route('/tournaments/:tournament/participants')
// :tournament中のプレイヤー一覧を参照
  .get(async (req, res) => {
    const id = req.params.tournament
    await client.participants.index({
      id,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournament中のプレイヤーを新規作成
  .post(async (req, res) => {
    const id = req.params.tournament
    const participant = req.body.participant
    await client.participants.create({
      id,
      participant,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

app.route('/tournaments/:tournament/participants/:participant_id')
// :tournament中のプレイヤー詳細を参照
  .get(async (req, res) => {
    const id = req.params.tournament
    const participantId = req.params.participant_id
    await client.participants.show({
      id,
      participantId,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournament中のプレイヤー詳細を更新
  .put(async (req, res) => {
    const id = req.params.tournament
    const participantId = req.params.participant_id
    const participant = req.body.participant
    await client.participants.update({
      id,
      participantId,
      participant,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournament中のプレイヤー詳細を削除
  .delete(async (req, res) => {
    const id = req.params.tournament
    const participantId = req.params.participant_id
    await client.participants.destroy({
      id,
      participantId,
      callback: (err, data) => {
        if (err) {
          console.log(err); res.json(err)
        } else { res.json(data) }
      }
    })
  })

// :tournament中のプレイヤーをランダムに割り振る?
app.post('/tournaments/:tournament/participants/randomize', async (req, res) => {
  const id = req.params.tournament
  await client.participants.randomize({
    id,
    callback: (err, data) => {
      if (err) {
        console.log(err); res.json(err)
      } else { res.json(data) }
    }
  })
})
/*
// トーナメント一覧を参照
app.get('/tournaments', async (req, res) => {
  await client.tournaments.index({
    callback: (err, data) => {
      if (err) {
        console.log(err)
      }
      res.json(data)
    }
  })
})
app.get('/', async (req, res) => {
  const date = new Date()
  const hours = (date.getHours() % 12) + 1 // London is UTC + 1hr;
  await res.json({ bongs: 'BONG '.repeat(hours) })
})
*/

exports.api = functions.region(REGION_TOKYO).https.onRequest(app)
