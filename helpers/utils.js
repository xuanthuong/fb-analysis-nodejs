const moment = require('moment-timezone');

EMAIL_RGX = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
PHONE_RGX = /\d{10,11}/gim

const _getSubSentence = (inputSentence, len) => {
  return inputSentence.split(' ').slice(0, len).join(' ')
}

const _formatDateTime = (datetime) => {
  return moment(datetime).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY H:mm:ss');
}

const _getPhoneNumber = (text) => {
  return text.match(PHONE_RGX)
}

const _getEmail = (text) => {
  return text.match(EMAIL_RGX)
}

module.exports = {
  formatDateTime: _formatDateTime,
  getPhoneNumber: _getPhoneNumber,
  getEmail: _getEmail,
}