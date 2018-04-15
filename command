
multi:
ganache-cli -a 1015 -g 1e-15 -p 8545 --db /home/zhiguo/application/database/db

single:
ganache-cli -a 15 -g 1e-15 -p 8545 --db /home/zhiguo/application/database

web3.eth.getBalance(web3.eth.accounts[1])


truffle compile

truffle migrate

truffle test

======test signature============
var account = web3.eth.accounts[0]
var sha3Msg = web3.sha3("abc")
var signedData = web3.eth.sign(account, sha3Msg)



