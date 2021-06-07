const _ = require('lodash/fp')
const got = require('got')

const billCodes = require('./bill-ids')

function setDenomination (context, code) {
  return fetch('setDenominations', {
    LDN: context.config.device,
    noteIDs: [
      {
        noteId: 1,
        denomCode: billCodes[code].code
      }
    ]
  })
}

function deposit (context) {
  return fetch('deposit', {
    LDN: context.config.device,
    testNotes: false,
    excludeRoom1A: false,
    excludeRoom2A: false,
    excludeRoom3A: false,
    excludeRoom4A: false,
    excludeRoom5A: false,
    excludeRoom1B: true,
    excludeRoom1C: true,
    excludeRoomURJB: false
  })
}

function reset (context) {
  return fetch('reset', {
    LDN: context.config.device
  })
}

function getDenominations (context) {
  return fetch('getInfo', {
    LDN: context.config.device
  })
    .then(res => _.pick([
      'CassDenom1A',
      'CassDenom1B',
      'CassDenom1C',
      'CassDenom2A',
      'CassDenom3A',
      'CassDenom4A',
      'CassDenom5A',
    ], res))
}

function fetch (method, params) {
  return Promise.resolve(true)
    .then(() => {
      const data = {
        jsonrpc: 2.0,
        method,
        params,
        id: uuid.v4()
      }

      return got({
        method: 'post',
        url: `http://localhost:8081`,
        data: JSON.stringify(data)
      })
    })
    .then(r => {
      const res = JSON.parse(r.result)
      if (res.error) throw res.error
      return res
    })
    .catch(err => {
      throw new Error(_.join(' ', [
        'json-rpc::axios error:',
        JSON.stringify(_.get('message', err, '')),
        JSON.stringify(_.get('response.data.error', err, ''))
      ]))
    })
}

module.exports = {
  setDenomination,
  deposit,
  reset,
  getDenominations
}
