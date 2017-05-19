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
  // console.log('addItem ran')
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
  // console.log('showUploadedData id ', id)
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + id,
    method: 'GET'
  })
}

const uploadOwners = function () {
  return $.ajax({
    url: config.apiOrigin + '/uploadowners',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const userFolders = function (owner) {
  return $.ajax({
    url: config.apiOrigin + '/folders/' + owner,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const folderDocuments = function (path, owner) {
  return $.ajax({
    url: config.apiOrigin + '/uploads/folder/' + path + '/' + owner,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}
const updateItem = function (id, data) {
  // console.log('updateItem data ', data)
  // console.log('updateItem id ', id)
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
  destroyItem,
  uploadOwners,
  userFolders,
  folderDocuments
}
