'use strict'
const store = require('../store.js')

const successSignUp = (data) => {
  console.log(data)
  $('#sign-up')[0].reset()
  $('.password-mismatch-message').hide()
  $('.acct-success-message').show()
}

const failureSignUp = (error) => {
  console.error(error)
  $('#sign-up')[0].reset()
  $('.password-mismatch-message').show()
  $('.acct-success-message').hide()
}

const signInSuccess = (data) => {
  store.user = data.user
  console.log(store)
  $('#sign-in')[0].reset()
  return
}

const signInFail = (error) => {
  console.error(error)
  $('#sign-in')[0].reset()
  $('.password-mismatch-message').show()
}

const signOutSuccess = () => {
  store.user = null
  console.log(store)
  $('#sign-out-response').text('User has signed out!')
}

const changePasswordSuccess = () => {
  $('.old-password-mismatch-message').hide()
  $('.pass-success-message').show()
  $('#change-password')[0].reset()
  console.log('Password Successfully Changed.')
}

const changePasswordFail = (error) => {
  console.error('change pass', error)
  $('#change-password')[0].reset()
  $('.old-password-mismatch-message').show()
  $('.pass-success-message').hide()
}

const failure = (error) => {
  console.error(error)
}

module.exports = {
  failure,
  signInSuccess,
  signInFail,
  signOutSuccess,
  changePasswordSuccess,
  changePasswordFail,
  failureSignUp,
  successSignUp
}
