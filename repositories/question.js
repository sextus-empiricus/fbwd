const { readFile, writeFile } = require('fs/promises')
const uuid = require('uuid')
const { CustomException } = require('../exceptions/custom.exception')

const makeQuestionRepository = fileName => {
  const getQuestions = async () => {
    return await loadQuestions()
  }

  const getQuestionById = async questionId => {
    return findElementById(await loadQuestions(), questionId) ?? null
  }

  const addQuestion = async question => {
    const newQuestion = {
      ...question,
      id: uuid.v4(),
      answers: question.answers ?? []
    }
    const questionsUpdated = [...(await loadQuestions()), newQuestion]
    await updateQuestions(questionsUpdated)
    return { createdQuestionId: newQuestion.id }
  }

  const getAnswers = async questionId => {
    const targetedQuestion = findElementById(await loadQuestions(), questionId)
    if (!targetedQuestion) return []
    return targetedQuestion.answers
  }

  const getAnswer = async (questionId, answerId) => {
    const targetedQuestion = findElementById(await loadQuestions(), questionId)
    if (!targetedQuestion)
      throw new CustomException('Provided id not match any question', 409)
    return findElementById(targetedQuestion.answers, answerId) ?? null
  }

  const addAnswer = async (questionId, answer) => {
    const questions = await loadQuestions()
    const targetedQuestion = findElementById(questions, questionId)
    if (!targetedQuestion)
      throw new CustomException('Provided id not match any question', 409)
    const newAnswer = { ...answer, id: uuid.v4() }
    targetedQuestion.answers.push(newAnswer)
    const questionsUpdated = [
      ...questions.filter(el => el.id !== questionId),
      targetedQuestion
    ]
    await updateQuestions(questionsUpdated)
    return {
      updatedQuestionId: targetedQuestion.id,
      createdAnswerId: newAnswer.id
    }
  }

  //utility fns:
  const fsOptionsObj = { encoding: 'utf-8' }

  const loadQuestions = async () => {
    const fileContent = await readFile(fileName, fsOptionsObj)
    return JSON.parse(fileContent)
  }
  const updateQuestions = async array => {
    await writeFile(fileName, JSON.stringify(array), fsOptionsObj)
  }
  const findElementById = (array, id) => {
    return array.filter(el => el.id === id)[0]
  }

  return {
    getQuestions,
    getQuestionById,
    addQuestion,
    getAnswers,
    getAnswer,
    addAnswer
  }
}

module.exports = { makeQuestionRepository }
