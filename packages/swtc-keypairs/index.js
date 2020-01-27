"use strict"

if (process.env.NODE_ENV === "production") {
  module.exports = require("./dist/keypairs.cjs.prod.js")
} else {
  module.exports = require("./dist/keypairs.cjs.js")
}
