'use strict'

const _ = require('lodash/fp')
const BN = require('../bn')

const client = require('./client')

const Hcm2 = function (config, denominations) {
  this.initialized = false
  this.config = config
  this.fiatCode = null
  this.denominations = denominations
  this._throttledError = _.throttle(2000, err => this.emit('error', err))
  this.type = 'HCM2'
  this.dispenseLimit = 20
}

// Validator

Hcm2.prototype.setFiatCode = function setFiatCode (code) {
  return this.fiatCode = code
}

Hcm2.prototype.lightOn = function lightOn () {
  console.log('HCM2: light on')
}

Hcm2.prototype.lightOff = function lightOff () {
  console.log('HCM2: light off')
}

Hcm2.prototype.enable = function enable () { }

Hcm2.prototype.disable = function disable () { }

Hcm2.prototype.close = function close (cb) {
  return cb()
}

Hcm2.prototype.refresh = function refresh (cb) {
  return cb()
}

Hcm2.prototype.stack = function stack () {
  return client.deposit()
}

Hcm2.prototype.lowestBill = function lowestBill (fiat) {
  const bills = _.values(this._denominations())
  const filtered = bills.filter(bill => fiat.lte(bill))
  if (_.isEmpty(filtered)) return BN(_.min(bills))
  return BN(_.min(filtered))
}

Hcm2.prototype.highestBill = function highestBill (fiat) {
  const bills = _.values(this._denominations())
  const filtered = bills.filter(bill => fiat.gte(bill))
  if (_.isEmpty(filtered)) return BN(-Infinity)
  return BN(_.max(filtered))
}

Hcm2.prototype.hasDenominations = function hasDenominations () {
  return _.isNil(this.denominations)
}

Hcm2.prototype._denominations = function _denominations () {
  if (this.denominations) return this.denominations
  client.getDenominations(this)
    .then(res => {
      // handle denominations
    })
    .catch(console.error)
}

// Dispenser



module.exports = {

}
