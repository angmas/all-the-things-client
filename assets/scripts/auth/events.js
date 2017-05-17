'use strict'

const api = require('./api')
const ui = require('./ui')
const getFormFields = require('../../../lib/get-form-fields.js')

const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signUp(data)
  .done(ui.successSignUp)
  .fail(ui.failureSignUp)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signIn(data)
  .done(ui.signInSuccess)
  .fail(ui.signInFail)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.signOut(data)
  .done(ui.signOutSuccess)
  .fail(ui.fail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
  .done(ui.changePasswordSuccess)
  .fail(ui.changePasswordFail)
}

const addHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
}

module.exports = {
  addHandlers
}
