pragma solidity ^0.4.10;

contract VerifySignature{

  //验签数据入口函数
  function verifyByHashAndSig(bytes32 hash, bytes signature) returns (address){
    bytes memory signedString = signature;

    bytes32  r = bytesToBytes32(slice(signedString, 0, 32));
    bytes32  s = bytesToBytes32(slice(signedString, 32, 32));
    byte  v1 = slice(signedString, 64, 1)[0];
    uint8 v = uint8(v1) + 27;
    return ecrecoverDirect(hash, r, s, v);
  }

  //将原始数据按段切割出来指定长度
  function slice(bytes memory data, uint start, uint len) returns (bytes){
    bytes memory b = new bytes(len);

    for(uint i = 0; i < len; i++){
      b[i] = data[i + start];
    }

    return b;
  }

  //bytes转换为bytes32
  function bytesToBytes32(bytes memory source) returns (bytes32 result) {
    assembly {
        result := mload(add(source, 32))
    }
  }

  //使用ecrecover恢复公匙
  function ecrecoverDirect(bytes32 hash, bytes32 r, bytes32 s, uint8 v) returns (address addr){
     /* prefix might be needed for geth only
     * https://github.com/ethereum/go-ethereum/issues/3731
     */
     bytes memory prefix = "\x19Ethereum Signed Message:\n32";
     hash = sha3(prefix, hash);
     
     addr = ecrecover(hash, v, r, s);
  }


}
