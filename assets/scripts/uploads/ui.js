'use strict'

const showHomePageTemplate = require('../templates/home-page.handlebars')

// function to build the page view
const showHomePage = function (data) {
  console.log(data)
  $('.body-content').empty()
  $('.body-content').append(showHomePageTemplate({uploads: data.uploads}))
  console.log('show home page function run')
}

module.exports = {
  showHomePage
}
