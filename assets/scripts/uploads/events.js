'use strict'

const ui = require('./ui.js')
const uploadsApi = require('./api.js')
const authEvents = require('../auth/events.js')
// const getFormFields = require('../../../lib/get-form-fields')
const getFormFields = require('../../../lib/get-form-fields')

// function to get data from backend in order to load the home page
const onShowAllUploads = function () {
  console.log('on Show All Uploads Ran')
  uploadsApi.showAllUploads()
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
    .then(ui.fillUpdateUpload)
    .catch(console.log)
}

const onUpdateItem = function (event) {
  event.preventDefault()
  let data = getFormFields(event.target)
  console.log('onUpdateItem data: ', data)
  // let id = $(this).attr('data-id')
  console.log('onUpdateItem this ', this)
  let id = $(this).attr('data-id')
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

// onShowHomePage will build the home page view and attach the event listeners.
// The code is here because events.js is driving all of the functionality
// also, if the addHomePageHandlers were in ui.js, we would end up with
// circular required.
const onShowHomePage = function (data) {
  ui.showHomePage(data)
  addHomePageHandlers()
  authEvents.addHandlers()
  uploadHandlers()
}
const addHomePageHandlers = function () {
  $('#add-item').on('submit', onAddItem)
  console.log('addHomePageHandlers function ran')
}

const uploadHandlers = function () {
  // Click pencil to view update upload view
  $('.glyphicon-pencil').on('click', onUpdateUpload)
  $('.delete-button').on('click', onDeleteUpload)
  $('#update-item').on('submit', onUpdateItem)
}

module.exports = {
  onShowAllUploads,
  uploadHandlers
  // onUpdateItem
}
