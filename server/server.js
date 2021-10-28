const express = require('express')
const SpotifyWebApi =  require('spotify-web-api-node')

const app = express();

app.post('/login', function (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3001',
        clientId: 'a0406b7aa4db4039bdec1d657470e353',
        clientSecret: '072f53a6584b4e61a96182335063f807'
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in,
        })
    })
    .catch(() => {
        res.sendStatus(404)
    })
})

app.listen(3002)