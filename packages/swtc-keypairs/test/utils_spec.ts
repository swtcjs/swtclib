// const assert = require('assert')

import { hexToBytes } from "../src/utils"

describe("utils", () => {
  it("hexToBytes - zero", () => {
    expect(hexToBytes("000000")).toEqual([0, 0, 0])
  })

  it("hexToBytes - DEADBEEF", () => {
    expect(hexToBytes("DEADBEEF")).toEqual([222, 173, 190, 239])
  })
})
