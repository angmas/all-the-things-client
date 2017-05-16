'use strict'

const ui = require('./ui.js')
const uploadsApi = require('./api.js')

// function to get data from backend in order to load the home page
const onShowAllUploads = function () {
  console.log('on Show All Uploads Ran')
  uploadsApi.showAllUploads()
    .then(ui.showHomePage)
    .catch(console.log)
}

const addHomePageHandlers = function () {
  console.log('addHomePageHandlers function ran')
}

module.exports = {

  onShowAllUploads
}
