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

const onUpdateItem = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log('onUpdateItem data: ', data)
  const id = '591b5d7ca9b7e77d54605d90' // take this out when we have full functionality
  uploadsApi.updateItem(data, id)
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
}
const addHomePageHandlers = function () {
  $('#add-item').on('submit', onAddItem)
  console.log('addHomePageHandlers function ran')
  $('#update-item').on('submit', onUpdateItem)
}

module.exports = {

  onShowAllUploads
}
