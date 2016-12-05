const express = require('express')
const httpProxy = require('http-proxy')
const nunjucks = require('nunjucks')

const app = express()
const apiV1Proxy = httpProxy.createProxyServer()

app.use(express.static('public'))

nunjucks.configure('views', {
  autoescape: true,
  cache: true,
  express: app
})

app.get('/', (req, res) => res.render('index.html'))
app.get('/documentation/v1', (req, res) => res.render('docsV1.html'))
app.get('/documentation/v2', (req, res) => res.render('docsV2.html'))

app.get('/api/v1/*', (req, res) => {
  apiV1Proxy.web(req, res, { target: 'https://punkapi.com', secure: false })
})

const getPort = process.env.PORT || 3333

const server = app.listen(getPort, function (error) {
  if (error) throw error
  console.info(`Listening on localhost:${server.address().port}`)
})
