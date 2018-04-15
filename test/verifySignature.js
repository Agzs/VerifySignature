var VerifySignature = artifacts.require("./VerifySignature.sol");

contract('VerifySignature', function(accounts) {
    console.log(accounts);
    it("verify signature 成功！", function(done) {
        var account = accounts[0];
        var sha3Msg = web3.sha3("blockchain");
        /*
        console.log('1 '+ web3.sha3(web3.toHex('blockchain'))); 
        //0x948100b2466113dfb2b67ab686395aaf8935c612cc5316c01e30b5b354b646c9
        console.log('2 '+ web3.sha3(web3.toHex('blockchain'),{encoding:'hex'}));
        //0x7ee156df5091fbef71b96557542210a9c9ca851cc85aaf60026519b4aaccf491
        console.log('3 '+ web3.sha3('blockchain'));
        //0x7ee156df5091fbef71b96557542210a9c9ca851cc85aaf60026519b4aaccf491
        console.log('4 '+  web3.sha3(  unescape(encodeURIComponent('blockchain'))  ) ); 
        //to UTF8 //0x7ee156df5091fbef71b96557542210a9c9ca851cc85aaf60026519b4aaccf491
        console.log('5 '+  web3.sha3(  unescape(encodeURIComponent('blockchain')), {encoding:'hex'} ) ); 
        //to UTF8 //0x2f1437634f08e2b6324e0701d49075e39cfc34c1fca7c5111dc07b8150399176
        */
        var signedData = web3.eth.sign(account, sha3Msg);

        console.log("account: " + account);
        console.log("sha3(message): " + sha3Msg);
        console.log("Signed data: " + signedData);
        
        VerifySignature.new({ from: accounts[1] }).then(function(verifySignature) {
            verifySignature.verifyByHashAndSig.call(sha3Msg, signedData).then(function (addr) {
                console.log("    addr = %s", addr);
                assert.equal(addr, account, "Address doesn't match!")
                return  verifySignature.verifyByHashAndSig(sha3Msg, signedData);
                //return VerifySignature.verifyConsumerSignature.call();			  
            }).then( function (txid) {
                console.log("    verifySignature, txid = %s, mined at #%s block", txid.tx, txid.receipt.blockNumber);//txid is a object contains tx, receipt, logs. Can print ("%x", txid) to check.

                var sig = signedData.slice(2)
                var r = `0x${sig.slice(0, 64)}`
                var s = `0x${sig.slice(64, 128)}`
                var v = web3.toDecimal(sig.slice(128, 130)) + 27

                return verifySignature.ecrecoverDirect.call(sha3Msg, r, s, v);
            }).then(function (addr) {
                console.log("    DirectAddr = %s", addr);
                assert.equal(addr, account, "Address doesn't match!")
                done();  // to stop these tests earlier, move this up
            }).catch(done); 
        }).catch(done);
    });
});
