"use strict"

import { EventEmitter } from "events"
import utils from "swtc-utils"

/**
 * request server and account info without secret
 * @param remote
 * @param command
 * @constructor
 */
class Request extends EventEmitter {
  protected message
  private _remote
  private _command
  private _filter
  constructor(remote, command, filter = (v) => v) {
    super()
    this._remote = remote
    this._command = command
    this._filter = filter
    // directly modify message is supported
    this.message = {}
  }

  public submit(callback) {
    for (const key in this.message) {
      if (this.message[key] instanceof Error) {
        return callback(this.message[key].message)
      }
    }
    this._remote._submit(this._command, this.message, this._filter, callback)
  }

  public selectLedger(ledger) {
    if (typeof ledger === "string" && ~utils.LEDGER_STATES.indexOf(ledger)) {
      this.message.ledger_index = ledger
    } else if (Number(ledger)) {
      this.message.ledger_index = Number(ledger)
    } else if (/^[A-F0-9]+$/.test(ledger)) {
      this.message.ledger_hash = ledger
    } else {
      this.message.ledger_index = "validated"
    }
    return this
  }
}

export { Request }
