'use strict'

const showAllUploads = function () {
  return $.ajax({
    url: 'http://localhost:4741/uploads',
    method: 'GET'
  })
}

module.exports = {
  showAllUploads
}
