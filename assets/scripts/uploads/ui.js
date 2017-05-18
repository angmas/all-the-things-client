'use strict'

const showHomePageTemplate = require('../templates/home-page.handlebars')
const showLandingPageTemplate = require('../templates/landing-page.handlebars')
const showChangePwdTemplate = require('../templates/change-password-view.handlebars')
const showSignOutTemplate = require('../templates/sign-out-view.handlebars')
const store = require('../store')

// function to build the page view
const showHomePage = function (data) {
  $('.body-content').empty()
  console.log('show home page function run')
  console.log(data)
  data.folder = store.folder || ''
  console.log(data.folder)
  $('.body-content').append(showHomePageTemplate(
    // set the different keys that are needed
    // if the key doesnt exist in the data then it just wont be used
    {
      uploads: data.uploads,
      users: data.users,
      folders: data.folders,
      user: data.user,
      folder: data.folder
    }
  ))
}

// function to build the landing page
const showLandingPage = function () {
  console.log('showLandingPage')
  $('.body-content').empty()
  $('.body-content').append(showLandingPageTemplate())
  console.log('show home page function ran')
}

// function to fill the update upload form
const fillUpdateUpload = function (data) {
  console.log('fillUpdateUpload ', data)
  $('#update-upload-title').val(data.upload.title)
  $('#update-item').attr('data-id', data.upload.id)
}

// function to show the change password form
const showChangePassword = function () {
  console.log('showChangePassword')
  $('.body-content').empty()
  $('.body-content').append(showChangePwdTemplate())
  console.log('show change password function ran')
}

// function to show the sign out form
const showSignOut = function () {
  console.log('showSignOut')
  $('.body-content').empty()
  $('.body-content').append(showSignOutTemplate())
  console.log('show sign out function ran')
}

module.exports = {
  showHomePage,
  showLandingPage,
  fillUpdateUpload,
  showChangePassword,
  showSignOut
}
