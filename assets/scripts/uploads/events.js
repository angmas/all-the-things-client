'use strict'

const uploadUi = require('./ui.js')
const uploadsApi = require('./api.js')
const authApi = require('../auth/api.js')
const authUi = require('../auth/ui')
const moment = require('moment')

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
  .then(onShowLandingPage)
  .catch(authUi.fail)
}

const onChangePassword = function (event) {
  console.log('change password ran')
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
    .then(onFileUploaded)
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
    .then(onFileUpdated)
    .catch(console.log)
}

const onDeleteUpload = function () {
  const id = $(this).attr('data-id')
  console.log('on Delete Upload ran', this)
  uploadsApi.destroyItem(id)
    .then(onFileDeleted)
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

// clicking the change password button in the nav bar triggers the modal
const onShowChangePasswordModal = function () {
  console.log('onShowChangePassword')
  $('#password-modal').modal({ show: true })
  $('.pass-success-message').hide()
  $('.old-password-mismatch-message').hide()
  addChangePasswordHandlers()
}

// adds handler to the submit button in the modal
const addChangePasswordHandlers = function () {
  $('#change-password').on('submit', onChangePassword)
}

const onShowUploadModal = function () {
  console.log('onShowUploadModal')
  $('#add-item-modal').modal({ show: true })
}

const onCloseUploadModal = function () {
  $('#add-item')[0].reset()
}

const onShowSignOut = function () {
  console.log('onShowSignOut')
  uploadUi.showSignOut()
  addSignOutHandlers()
}

const addSignOutHandlers = function () {
  $('#sign-out').on('submit', onSignOut)
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
  const target = $(e.target).closest('tr')
  renderUserFolders(target)
}
const onUserFolderBreadcrumb = (e) => {
  const target = $(e.target)
  renderUserFolders(target)
}
const renderUserFolders = (target) => {
  const folder = target.data('folder')
  const id = target.data('id')
  store.folder = folder
  uploadsApi.userFolders(id)
    .then(onShowHomePage)
    .catch(console.error)
}
const onDateFolder = function (e) {
  const target = $(e.target).closest('tr')
  const id = target.data('id')
  const path = target.data('folder')
  renderFolderDocuments(path, id)
}

const onFileUpdated = function (e) {
  // when a file is updated, just reload the current folder view
  const id = store.user.id
  const path = $('#current-folder').text()
  renderFolderDocuments(path, id)
}
const onFileUploaded = function (e) {
  // make sure on upload we switch to the current user's view
  // so they can see their upload
  store.folder = store.user.email
  const id = store.user.id
  // also make sure we switch to the current date's folder
  // since its a new upload, that is where it will display
  const path = moment().format('MM-DD-YYYY')
  renderFolderDocuments(path, id)
}
const onFileDeleted = function (e) {
  // when a file is deleted, reload the view
  const id = store.user.id
  const path = $('#current-folder').text()
  renderFolderDocuments(path, id)
}
const renderFolderDocuments = (path, id) => {
  uploadsApi.folderDocuments(path, id).then((data) => {
    console.log(data)
    // if the user has deleted all the files in a folder
    // just reload the whole list of users since it would be
    // difficult to figure out which view to load
    if (data.uploads.length === 0) {
      onShowAllUploads()
      // if they still have files to show, just reload the list of files
    } else {
      onShowHomePage(data)
    }
  })
  .catch(console.error)
}

// function to clear out modals when close button is clicked
const onClosePassModal = function () {
  $('.pass-success-message').hide()
  $('.old-password-mismatch-message').hide()
  $('#change-password')[0].reset()
}

const addHomePageHandlers = function () {
  // Click pencil to view update upload view
  $('.glyphicon-pencil').on('click', onUpdateUpload)
  $('.delete-button').on('click', onDeleteUpload)
  $('#update-item').on('submit', onUpdateItem)
  $('.user-folder').on('click', onUserFolder)
  $('.folder').on('click', onDateFolder)
  $('#user-view').on('click', onShowAllUploads)
  $('#user-folders').on('click', onUserFolderBreadcrumb)
  $('#add-item').on('submit', onAddItem)
  $('#sign-out').on('submit', onSignOut)
  $('.update-button').on('click', onUpdateUpload)
  $('#show-users').on('click', onShowAllUploads)
  $('#change-pwd-option').on('click', onShowChangePasswordModal)
  $('#sign-out-option').on('click', onShowSignOut)
  $('.cls-pass-modal').on('click', onClosePassModal)
  $('#add-upload-button').on('click', onShowUploadModal)
  $('.close-upload-modal').on('click', onCloseUploadModal)
}

module.exports = {
  onShowLandingPage,
  onShowAllUploads
  // uploadHandlers
}
