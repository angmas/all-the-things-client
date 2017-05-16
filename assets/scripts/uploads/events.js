'use strict'

const ui = require('./ui.js')

// function to evoke the page view builder function in ui file
const onShowLandingPage = function () {
  ui.showLandingPage()
  addLandingPageHandlers()
}

const addLandingPageHandlers = function (){
  console.log('addLandingPageHandlers function ran')
}

module.exports = {
  onShowLandingPage
}
