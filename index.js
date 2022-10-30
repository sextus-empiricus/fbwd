const express = require('express')
const { urlencoded, json } = require('body-parser')
const makeRepositories = require('./middleware/repositories')
const { questionsRouter } = require('./routes/questions.router')

const STORAGE_FILE_PATH = 'questions.json'
const PORT = 3000

const app = express()

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(makeRepositories(STORAGE_FILE_PATH))

app.get('/', (_, res) => {
  res.json({ message: 'Welcome to responder!' })
})

app.use('/questions', questionsRouter)

app.listen(PORT, () => {
  console.log(`Responder app listening on port ${PORT}`)
})
