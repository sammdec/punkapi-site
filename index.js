const express = require('express')
const nunjucks = require('nunjucks')

const app = express()
const isDev = process.env.NODE_ENV !== 'production'

app.use(express.static('public'))

nunjucks.configure('views', {
  autoescape: true,
  watch: isDev,
  express: app
})

app.get('/', (req, res) => res.render('index.html'))
app.get('/documentation/v1', (req, res) => res.render('docsV1.html'))
app.get('/documentation/v2', (req, res) => res.render('docsV2.html'))

const getPort = process.env.PORT || 3333

const server = app.listen(getPort, function (error) {
  if (error) throw error
  console.info(`Listening on http://localhost:${server.address().port}`)
})
