'use strict'

const ui = require('./ui.js')
const uploadsApi = require('./api.js')
// const getFormFields = require('../../../lib/get-form-fields')

// function to get data from backend in order to load the home page
const onShowAllUploads = function () {
  console.log('on Show All Uploads Ran')
  uploadsApi.showAllUploads()
    .then(onShowHomePage)
    .catch(console.log)
}

const onAddItem = function (event) {
  event.preventDefault()
  let data = new FormData(event.target)
  console.log('onAddItem data: ', data)

  uploadsApi.addItem(data)
    .then(console.log)
    .catch(console.log)
}

// onShowHomePage will build the home page view and attach the event listeners.
// The code is here because events.js is driving all of the functionality
// also, if the addHomePageHandlers were in ui.js, we would end up with
// circular required.
const onShowHomePage = function (data) {
  ui.showHomePage(data)
  addHomePageHandlers()
}
const addHomePageHandlers = function () {
  $('#add-item').on('submit', onAddItem)
  console.log('addHomePageHandlers function ran')
}

module.exports = {

  onShowAllUploads
}
