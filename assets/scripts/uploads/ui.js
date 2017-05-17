'use strict'

const showHomePageTemplate = require('../templates/home-page.handlebars')

// function to build the page view
const showHomePage = function (data) {
  console.log(data)
  $('.body-content').empty()
  $('.body-content').append(showHomePageTemplate({uploads: data.uploads}))
  console.log('show home page function run')
}

// function to fill the update upload form
const fillUpdateUpload = function (data) {
  console.log('fillUpdateUpload ', data)
  $('#update-upload-title').val(data.upload.title)
  $('#update-item').attr('data-id', data.upload.id)
}

module.exports = {
  showHomePage,
  fillUpdateUpload
}
