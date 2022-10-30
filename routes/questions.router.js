const express = require('express')
const { QuestionsController } = require('../controllers/questions.controller')

const questionsRouter = express.Router()

questionsRouter
  .post('/', QuestionsController.addQuestion)
  .get('/', QuestionsController.getQuestions)
  .get('/:questionId', QuestionsController.getQuestionById)

  .post('/:questionId/answers', QuestionsController.addAnswer)
  .get('/:questionId/answers', QuestionsController.getAnswers)
  .get('/:questionId/answers/:answerId', QuestionsController.getAnswer)

module.exports = { questionsRouter }
