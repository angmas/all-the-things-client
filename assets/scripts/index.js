'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./uploads/events.js')
// const authEvents = require('./auth/events.js')

$(() => {
  setAPIOrigin(location, config)
  events.onShowLandingPage()
  // events.onShowAllUploads()
})

// Bring in login events
// $(() => {
//   authEvents.addHandlers()
// })

// Submit update form
// $(() => {
//   $('#update-item').on('submit', events.onUpdateItem)
// })

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
