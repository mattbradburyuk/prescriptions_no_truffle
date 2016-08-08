
var config = require("../../dapp_config.js")
var Web3 = require('web3');
var jayson = require('jayson');
var commandLineArgs = require('command-line-args');
var jsonfile = require("jsonfile");


// ************* read in commandline options

var cli = commandLineArgs([
    {name: 'file', alias: 'f', type: String, defaultValue: 'all', description: 'file to compile'}
]);

try{
    var options = cli.parse();
    console.log('Starting with options:',JSON.stringify(options));
}
catch(e){
    console.log("error reading command line arguments, e: ", e);
    return;
}


// *********** set up web3 and rpc ****************

const web3  = new Web3();
var url = 'http://'+config.rpc.host+':'+config.rpc.port;
console.log('web3 connect to:',url);
web3.setProvider(new web3.providers.HttpProvider(url));
console.log('rpc connect to:',url);
var rpc_client = jayson.client.http(url);

// check connection objects
// console.log(web3._requestManager.provider.host);
// console.log(rpc_client.options.host)


// *********** read in .json ***************************

console.log("Reading in .json.....");

var file = options.file;

// read in from .json file
com_path = '../compiled/' + file;
var contract_json = jsonfile.readFileSync(com_path);

// console.log(contract)

// *********** deploy contract *****************

    
var iface = JSON.parse(contract_json.interface);    // interface needs to be in JSON not a string
// console.log("interface: ", iface);

var bc = contract_json.bytecode;
// console.log("bytecode: ", bc);


//check connection to a geth node
if (web3.isConnected()== false){
    console.log("Web3 not connected to node");
    return
}

web3.personal.unlockAccount(web3.eth.accounts[0],'mattspass');  // unlock accounts

var contract_obj = web3.eth.contract(iface);


// if mining is already on don't affect mining otherwise switch it on but switch off when deployed
var switch_on_mining
if (web3.eth.mining) {
    switch_on_mining = false
}else{
    switch_on_mining = true
    console.log("Switching on mining")
    rpc_client.request('miner_start', [], logResponse);
}



contract_obj.new(
    {
        from: web3.eth.accounts[0],
        data: bc,
        gas: 3000000
    }, function(e, contract){
        console.log("callback fired");

        if(e){
            console.log("error deploying: ", response)
            return;
        } else {

             // console.log('contract', contract);

            if (typeof contract.address != 'undefined') {
                console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                var fs = require('fs');

                console.log("file: ",file);
                
                var json_to_file = {"address": contract.address, "tx_hash": contract.transactionHash}; 
                
                // write to .json file
                com_path = '../deployed/' +'instance_of_'+ file;
                jsonfile.writeFileSync(com_path, json_to_file);
                
                if(switch_on_mining){
                    console.log("Switching off mining")
                    rpc_client.request('miner_stop', [], logResponse);
                }
                
                
            }
        }
    })





// ************* reusable response call back function ***************

function logResponse(err, response){
    if (err) {
        console.log('err: ',JSON.stringify(err));
    } else {
        console.log('response: ',JSON.stringify(response));
    }
}
