'use strict'

const config = require('../config')
const store = require('../store')

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

const updateItem = function (data, id) {
  return $.ajax({
    url: config.apiOrigin + '/uploads/' + id,
    method: 'PATCH',
    headers: {
      // Authorization: 'Token token=fP6hXbPt28OGabLGIndXyWl4nAxnOfi2tUtQqE0Il1M=--qJUP0kCCgZn8ga16VmfVuotyudz7W45Jw0VwxCait/A='
      // Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  showAllUploads,
  addItem,
  updateItem
}
