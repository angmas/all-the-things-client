'use strict'

const showHomePageTemplate = require('../templates/home-page.handlebars')
const showLandingPageTemplate = require('../templates/landing-page.handlebars')

// function to build the page view
const showHomePage = function (data) {
  $('.body-content').empty()
  console.log('show home page function run')
  console.log(data)
  $('.body-content').append(showHomePageTemplate(
    // set the different keys that are needed
    // if the key doesnt exist in the data then it just wont be used
    {
      uploads: data.uploads,
      users: data.users,
      folders: data.folders,
      user: data.user
    }
  ))
}

// function to build the landing page
const showLandingPage = function () {
  console.log('showLandingPage')
  $('.body-content').empty()
  $('.body-content').append(showLandingPageTemplate())
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
  showLandingPage,
  fillUpdateUpload
}
