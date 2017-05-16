'use strict'

const showHomePageTemplate = require('../templates/home-page.handlebars')

// function to build the page view
const showHomePage = function () {
  $('.body-content').empty()
  $('.body-content').append(showHomePageTemplate)
  console.log('show home page function run')
}

module.exports = {
  showHomePage
}
