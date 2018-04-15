var VerifySignature = artifacts.require("./VerifySignature.sol");

module.exports = function(deployer) {
  deployer.deploy(VerifySignature);
  //deployer.autolink(); // for linking imports of other contracts
};
