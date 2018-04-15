var VerifySignature = artifacts.require("./VerifySignature.sol")

//var Web3 = require('web3')
//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

contract('VerifySignature', (accounts) => {
  var address = accounts[0]
  
  it('ecrecover result matches address', async function() {
    var instance = await VerifySignature.deployed()
    var msg = "blockchain"

    var h = web3.sha3(msg)
    var sig = web3.eth.sign(address, h).slice(2)
    var r = `0x${sig.slice(0, 64)}`
    var s = `0x${sig.slice(64, 128)}`
    var v = web3.toDecimal(sig.slice(128, 130)) + 27

    console.log("example--account: " + address)
    console.log("example--sha3(message): " + h)
    console.log("example--Signed data: " + sig)

    var result = await instance.ecrecoverDirect.call(h, r, s, v)
    console.log("example--result: " + result)
    assert.equal(result, address)
  })
})
