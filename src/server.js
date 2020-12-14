const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const { v4: uuid } = require ('uuid')
const querystring = require('querystring')

const app = express()
const staticPages = path.resolve(__dirname, '..', 'public')

const STATE_KEY = 'spotify_auth_state'
const SCOPE = 'user-read-private user-read-email'
const CLIENT_ID = 'f7755628beaf47cfb35f15c94e01ac18'
const REDIRECT_URI = 'http://localhost:8888/callback'  //temporary

// add midlewares to express
app.use(express.static(staticPages))
    .use(cors())
    .use(cookieParser())

// endpoint login (chama o login e manda um cookie)
app.get('/login', (req, res) => {
    const state = uuid()
    res.cookie(STATE_KEY, state)

//request user authorization to access his Spotify
    res.redirect('https://accounts.spotify.com/authorize?' + querystring.stringify({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state: state
    }))
})


// starting the server
app.listen(8888, ()=>{
    console.log('Servidor pronto, escutando na porta 8888')
})