'use strict'

const uploadUi = require('./ui.js')
const uploadsApi = require('./api.js')
const authApi = require('../auth/api.js')
const authUi = require('../auth/ui')

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')

// USER AUTHENTICATION ACTIONS //
const onSignUp = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.signUp(data)
  .then(authUi.successSignUp)
  .catch(authUi.failureSignUp)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.signIn(data)
  .then(authUi.signInSuccess)
  .then(onShowAllUploads)
  .catch(authUi.signInFail)
}

const onSignOut = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.signOut(data)
  .then(authUi.signOutSuccess)
  .catch(authUi.fail)
}

const onChangePassword = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  authApi.changePassword(data)
  .then(authUi.changePasswordSuccess)
  .catch(authUi.changePasswordFail)
}

// UPLOAD CRUD ACTIONS //

// function to get data from backend in order to load the home page
const onShowAllUploads = function () {
  console.log('on Show All Uploads Ran')
  uploadsApi.uploadOwners()
    .then(onShowHomePage)
    .catch(console.log)
}

const onAddItem = function (event) {
  event.preventDefault()
  const data = new FormData(event.target)
  console.log('onAddItem data: ', data)

  uploadsApi.addItem(data)
    .then(onShowAllUploads)
    .catch(console.log)
}

// Show data about the upload in the update upload form
const onUpdateUpload = function () {
  event.preventDefault()
  // Select data-id from target row
  const id = $(this).attr('data-id')
  console.log('onUpdateUpload id', id)
  console.log(this)
  uploadsApi.showUploadedData(id)
    .then(uploadUi.fillUpdateUpload)
    .catch(console.log)
}

const onUpdateItem = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('onUpdateItem data: ', data)
  console.log('onUpdateItem this ', this)
  const id = $(this).attr('data-id')
  console.log(id)
  uploadsApi.updateItem(id, data)
    .then(onShowAllUploads)
    .catch(console.log)
}

const onDeleteUpload = function () {
  const id = $(this).attr('data-id')
  console.log('on Delete Upload ran', this)
  uploadsApi.destroyItem(id)
    .then(onShowAllUploads)
    .catch(console.log)
}

// RENDER VIEW ACTIONS //
const onShowLandingPage = function () {
  console.log('onShowLandingPage')
  uploadUi.showLandingPage()
  addLandingPageHandlers()
}

const addLandingPageHandlers = function () {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
}

// onShowHomePage will build the home page view and attach the event listeners.
// The code is here because events.js is driving all of the functionality
// also, if the addHomePageHandlers were in ui.js, we would end up with
// circular required.
const onShowHomePage = function (data) {
  uploadUi.showHomePage(data)
  addHomePageHandlers()
}

const onUserFolder = function (e) {
  const target = $(e.target)
  console.log(target.data('id'))
  const id = target.data('id')
  console.log(target.text())
  console.log(target.data('store'))
  if (!target.data('store')) {
    store.folder = target.text()
  }
  uploadsApi.userFolders(id)
    .then(onShowHomePage)
    .catch(console.error)
}

const onDateFolder = function (e) {
  const target = $(e.target)
  const id = target.data('id')
  const path = target.text()
  uploadsApi.folderDocuments(path, id)
    .then(onShowHomePage)
    .catch(console.error)
}

const addHomePageHandlers = function () {
  // Click pencil to view update upload view
  $('.glyphicon-pencil').on('click', onUpdateUpload)
  $('.delete-button').on('click', onDeleteUpload)
  $('#update-item').on('submit', onUpdateItem)
  $('.user-folder').on('click', onUserFolder)
  $('.folder').on('click', onDateFolder)
  $('#user-view').on('click', onShowAllUploads)
  $('#user-folders').on('click', onUserFolder)
  $('#add-item').on('submit', onAddItem)
  $('#sign-out').on('submit', onSignOut)
  $('#change-password').on('submit', onChangePassword)
  $('.update-button').on('click', onUpdateUpload)
  $('#show-users').on('click', onShowAllUploads)
}

module.exports = {
  onShowLandingPage,
  onShowAllUploads
  // uploadHandlers
}
