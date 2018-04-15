module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8546,
    network_id: "*" // Match any network id
  },
  networks: {
    development: {
      host: "localhost",
      port: 8546,
      network_id: "*", // Match any network id
      //from: "0xe4a09733ef75081c08f2881463862f7b78d8fa58",
      gas: 3000000000,//6721976,
    }
  }
};
