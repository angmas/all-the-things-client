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
  uploadsApi.uploadOwners()
    .then(data => {
      // sort users in alphabetical order by email
      data.users.sort((a, b) => alphaSort(a.email, b.email))
      // put the current user as the first item in the array
      data.users = putCurrentUserFirst(data.users)
      onShowHomePage(data)
    })
    .catch(console.log)
}
// function to put current user first in the array
const putCurrentUserFirst = (userArray) => {
  const currentUser = userArray.find(user => user.id === store.user.id)
  const index = userArray.indexOf(currentUser)
  if (index > -1) {
    currentUser.isCurrentUserFolder = true
    userArray.splice(index, 1)
    userArray.unshift(currentUser)
  }
  return userArray
}

// function to sort in alphabetical order ignoring case
const alphaSort = (a, b) => {
  return a.toLowerCase() > b.toLowerCase()
}
const onAddItem = function (event) {
  event.preventDefault()
  const data = new FormData(event.target)
  console.log('onAddItem data: ', data)

  uploadsApi.addItem(data)
    .then(onFileUploaded)
    .then(() => {
      $('body').removeClass('modal-open')
    })
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
    .then(onShowUpdateModal)
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
    .then(() => {
      $('body').removeClass('modal-open')
    })
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

// Show modal where user can upload a file
const onShowUploadModal = function () {
  console.log('onShowUploadModal')
  $('#add-item-modal').modal({ show: true })
}

const onCloseUploadModal = function () {
  $('#add-item')[0].reset()
}

// Show modal where user can update the title of a file
const onShowUpdateModal = function () {
  console.log('onShowUpdateModal')
  $('#update-item-modal').modal({ show: true })
}

const onCloseUpdateModal = function () {
  $('#update-item')[0].reset()
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
    .then(data => {
      data.folders.sort().reverse()
      onShowHomePage(data)
    })
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
    // if the user has deleted all the files in a folder
    // just reload the whole list of users since it would be
    // difficult to figure out which view to load
    if (data.uploads.length === 0) {
      onShowAllUploads()
      // if they still have files to show, just reload the list of files
    } else {
      data.uploads = data.uploads.map(upload => {
        upload.isImage = isImage(upload.url)
        upload.createdAt = moment(upload.createdAt).format('LLL')
        upload.updatedAt = moment(upload.updatedAt).format('LLL')
        return upload
      })
      data.uploads.sort((a, b) => dateSort(a.createdAt, b.createdAt))
      onShowHomePage(data)
    }
  })
  .catch(console.error)
}
const dateSort = (a, b) => {
  return a < b
}

// function to clear out modals when close button is clicked
const onClosePassModal = function () {
  $('.pass-success-message').hide()
  $('.old-password-mismatch-message').hide()
  $('#change-password')[0].reset()
}

// open file in new window or tab
const onOpenFile = (e) => {
  const target = $(e.target)
  const url = target.closest('td').data('url')
  window.open(url, '_blank')
}

// check if the file is an image type
const isImage = (url) => {
  const imageTypes = ['png', 'jpg', 'jpeg']
  const ext = url.split('.').pop().toLowerCase()
  return imageTypes.indexOf(ext) !== -1
}

const addHomePageHandlers = function () {
  $('.delete-button').on('click', onDeleteUpload)
  $('.user-folder').on('click', onUserFolder)
  $('.folder').on('click', onDateFolder)
  $('#user-view').on('click', onShowAllUploads)
  $('#user-folders').on('click', onUserFolderBreadcrumb)
  $('#add-item').on('submit', onAddItem)
  $('#sign-out').on('submit', onSignOut)
  $('.update-button').on('click', onUpdateUpload)
  $('#update-item').on('submit', onUpdateItem)
  $('.close-update-modal').on('click', onCloseUpdateModal)
  $('#show-users').on('click', onShowAllUploads)
  $('#change-pwd-option').on('click', onShowChangePasswordModal)
  $('#sign-out-option').on('click', onShowSignOut)
  $('.cls-pass-modal').on('click', onClosePassModal)
  $('#add-upload-button').on('click', onShowUploadModal)
  $('.close-upload-modal').on('click', onCloseUploadModal)
  $('.file-path').on('click', onOpenFile)
  $('[data-toggle="tooltip"]').tooltip()
}

module.exports = {
  onShowLandingPage,
  onShowAllUploads
  // uploadHandlers
}
