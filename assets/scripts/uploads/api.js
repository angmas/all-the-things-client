'use strict'
const config = require('../config')
const showAllUploads = function () {
  return $.ajax({
    url: 'http://localhost:4741/uploads',
    method: 'GET'
  })
}

const addItem = function (data) {
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'POST',
    data,
    contentType: false,
    processData: false
  })
}

module.exports = {
  showAllUploads,
  addItem
}
