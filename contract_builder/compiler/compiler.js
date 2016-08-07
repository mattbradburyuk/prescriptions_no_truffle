// *********** import requirements  ***********

var config = require("../../dapp_config.js")
var decomment = require('decomment');
var fs = require('fs');
var solc = require('solc');
var Web3 = require('web3');
var jayson = require('jayson');
var commandLineArgs = require('command-line-args');

// ************* read in commandline options

var cli = commandLineArgs([
    {name: 'command', alias: 'c', type: String, defaultValue: 'default', description: 'the command'}
]);

var options = cli.parse();

console.log('starting with options:',JSON.stringify(options));

return;

// *********** set up web3 and rpc client  ****************

var client = jayson.client.http('http://192.168.99.100:8541');

const web3  = new Web3();
setProvider(web3, config.rpc.host, config.rpc.port);

function setProvider(web3, gethHost, gethPort) {
    var url = 'http://'+gethHost+':'+gethPort;
    console.log('web3 connect to:',url);
    web3.setProvider(new web3.providers.HttpProvider(url));
}
// check connection objects
// console.log(web3._requestManager.provider.host);
// console.log(client.options.host)




// Get from command line
// Put into an array

// ************* Colapse .sol file *****************



