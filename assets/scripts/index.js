'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const events = require('./uploads/events.js')
const authEvents = require('./auth/events.js')

$(() => {
  setAPIOrigin(location, config)
  events.onShowAllUploads()
})

// Bring in login events
$(() => {
  authEvents.addHandlers()
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')
