class QuestionsController {
  static async getQuestions(req, res) {
    const questions = await req.repositories.questionRepo.getQuestions()
    res.status(200).json(questions)
  }

  static async getQuestionById(req, res) {
    const { questionId } = req.params
    const targetedQuestion =
      await req.repositories.questionRepo.getQuestionById(questionId)
    console.log(targetedQuestion)
    res.status(200).json(targetedQuestion)
  }

  static async addQuestion(req, res) {
    const newQuestion = req.body
    const responseObj = await req.repositories.questionRepo.addQuestion(
      newQuestion
    )
    res.status(201).json(responseObj)
  }

  static async getAnswers(req, res) {
    const { questionId } = req.params
    const answers = await req.repositories.questionRepo.getAnswers(questionId)
    res.status(200).json(answers)
  }

  static async addAnswer(req, res) {
    const { questionId } = req.params
    const newAnswer = req.body
    const responseObj = await req.repositories.questionRepo.addAnswer(
      questionId,
      newAnswer
    )
    res.status(201).json(responseObj)
  }

  static async getAnswer(req, res) {
    const { questionId, answerId } = req.params
    const answer = await req.repositories.questionRepo.getAnswer(
      questionId,
      answerId
    )
    res.status(200).json(answer)
  }
}

module.exports = { QuestionsController }
