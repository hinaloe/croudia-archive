const {Router} = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')
const router = Router()

const appId = require('../../config/oauth')

const client = axios.create({
  baseURL: 'https://api.croudia.com/'
})

router.use(bodyParser.json())
router.post('/oauth/token', (req, res) => {
  let token
  client.post('/oauth/token', {
    grant_type: 'authorization_code',
    code: req.body.code,
    client_id: appId.app_id,
    client_secret: appId.app_secret
  }).then(resp => {
    token = resp.data
    return client.get('/account/verify_credentials.json', {
      headers: {
        Authorization: `Bearer ${token.access_token}`
      }
    })
  }).then(account => {
    console.log(token)
    token.account = account.data
    res.json(token)
  }).catch(err => {
    console.error(err)
    res.status(500).json({
      error: err.message || 'error'
    })
  })
})

router.get('/user_timeline', (req, res) => {
  const params = {include_entities: true, count: 200, user_id: req.query.user_id}
  if (req.query.max_id) {
    params.max_id = req.query.max_id
  }
  client.get('/2/statuses/user_timeline.json', {
    params,
    headers: {
      Authorization: `Bearer ${req.query.access_token}`
    }
  }).then(r => {
    res.json(r.data)
  }).catch(err => {
    console.error(err)
    res.status(500).json({
      error: err.message || 'error'
    })
  })
})

module.exports = router
