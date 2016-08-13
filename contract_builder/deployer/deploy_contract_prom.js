/*
async functions: 

    read_in_json
    
    unlock account
    
    check if mining + switch on + set switch_on_mining
    
    send contract in
    
    write json 
    
    toggle mining off if required

 */

var config = require("../deployer_config.js")
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
// console.log('web3 connect to:',url);
web3.setProvider(new web3.providers.HttpProvider(url));
// console.log('rpc connect to:',url);
var rpc_client = jayson.client.http(url);

// check connection objects
// console.log(web3._requestManager.provider.host);
// console.log(rpc_client.options.host)

// ********** execute Promise chain ***************

var switch_on_mining;

var file = options.file;

read_in_json()
    .then(unlock_acc)
    .then(toggle_mining_on)
    // .then(pass_though)
    .then(deploy_contract)
    .then(pass_though)
    .then(toggle_mining_off)
    .then(write_json_to_file)
    .then(end_success,end_error)

// ********** define promises ******************

function read_in_json(){
    console.log("read_in_json called");
    return new Promise(function(resolve,reject){

        console.log(" ---> Reading in .json..... from file: ", file);
        com_path = '../compiled/' + file;

        jsonfile.readFile(com_path, callback);

        function callback(e,r) {
            if (e) {
                reject("read_in_json error");
            } else {
                console.log(" ---> json read in\n");
                resolve(r);
            }
        }
    });
}

function unlock_acc(pass_through){
    console.log("unlock_acc called");
    return new Promise(function (resolve,reject){

        web3.personal.unlockAccount(web3.eth.accounts[0],'mattspass', callback);  // unlock accounts
        
        function callback(e,r) {
            if (e) {
                reject("unlock_acc error");
            } else {
                console.log(" --->account unlocked\n");
                resolve(pass_through);
            }
        }
    });
}

function deploy_contract(contract_json){
    console.log("deploy_contract called");
    return new Promise(function(resolve,reject){

        var iface = JSON.parse(contract_json.interface);    // interface needs to be in JSON not a string
        // console.log("interface: ", iface);

        var bc = contract_json.bytecode;
        // console.log("bytecode: ", bc);

        var contract_obj = web3.eth.contract(iface);

        contract_obj.new(
            {
                from: web3.eth.accounts[0],
                data: bc,
                gas: 3000000
            }, callback_x)

        function callback_x(e,contract) {
            if (e) {
                console.log("contract_obj.new error");
                reject("deploy_contract error");
            } else {
                
                if (typeof contract.address != 'undefined') {
                    console.log(' ---> Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                    
                    var json_to_file = {"address": contract.address, "tx_hash": contract.transactionHash};
                    console.log(" ---> contract deployed\n");
                    resolve(json_to_file);
            }
        }
    }});
}

function write_json_to_file(json_to_file){
    console.log("write_json_to_file called");
    return new Promise(function (resolve,reject){

        // console.log("Reading in .json..... from file: ", file);
        com_path = '../deployed/' +'instance_of_'+ file;

        jsonfile.writeFile(com_path, json_to_file, callback);

        function callback(e,r) {
            if (e) {
                reject("write_json_to_file error");
            } else {
                console.log(" ---> json written to file\n");
                resolve("success !!!");
            }
        }
    });
}



// ********* toggling mining **********

function toggle_mining_on(pass_through){
    console.log("toggle_mining_on called");
    return new Promise(function (resolve, reject){

        if (web3.eth.mining) {
            console.log(" ---> Already mining\n")
            switch_on_mining = false;
            resolve(pass_through);
        }else{
            switch_on_mining = true
            rpc_client.request('miner_start', [], callback);
        }

        function callback(e,r) {
            if (e) {
                reject("toggle_mining_on error");
            } else {
                console.log(" ---> mining switched on\n")
                resolve(pass_through);
            }
        }
    });
}

function toggle_mining_off(pass_through){
    console.log("toggle_mining_off called");
    return new Promise(function (resolve, reject){

        if(switch_on_mining){
            
            rpc_client.request('miner_stop', [], callback);
        }else{
            console.log(" --> leave mining as was\n");
            resolve(pass_through);
        }
        
        function callback(e,r) {
            if (e) {
                reject("toggle_mining_on error");
            } else {
                console.log(" ---> Switching off mining\n")
                resolve(pass_through);
            }
        }
    });
}


// ********* pass_through logger **********

function pass_though(val) {
    console.log("pass_through called");
    console.log(" ---> val:  ",val);
    return val
}


// *********end of promise chain markers **********

function end_success(result) {
    console.log("End result: ---> ",result); // "Stuff worked!"
}
function end_error(err) {
    console.log("End error: ---> ",err); // Error: "It broke"
}



