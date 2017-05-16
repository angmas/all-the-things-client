'use strict'

const ui = require('./ui.js')

// function to evoke the page view builder function in ui file
const onShowHomePage = function () {
  ui.showHomePage()
  addHomePageHandlers()
}

const addHomePageHandlers = function () {
  console.log('addHomePageHandlers function ran')
}

module.exports = {
  onShowHomePage
}
