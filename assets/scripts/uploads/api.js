'use strict'

const config = require('../config')
const store = require('../store')

const showAllUploads = function () {
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    method: 'GET'
  })
}

const addItem = function (data) {
  console.log('addItem ran')
  return $.ajax({
    url: config.apiOrigin + '/uploads',
    dataType: 'json',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data,
    contentType: false,
    processData: false
  })
}

const showUploadedData = function (id) {
  console.log('showUploadedData id ', id)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + id,
    method: 'GET'
  })
}

const updateItem = function (id, data) {
  console.log('updateItem data ', data)
  console.log('updateItem id ', id)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const destroyItem = function (id) {
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  showAllUploads,
  addItem,
  showUploadedData,
  updateItem,
  destroyItem
}
