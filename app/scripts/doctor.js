function doctor_test(){
    
    console.log("doctor test")
}


function create_new_prescription() {

    var drug_json;
    var definition_file = "Prescription.json";
    var iface;
    var bc;
    var contract_obj;
    var switch_on_mining;

    // get contract values from screen

    get_contract_vals()
        .then(read_in_json)
        .then(make_contract_obj)
        .then(deploy_contract)
        .then(end_success, end_error);

    // deploy new contract

    // record address
;
    // set contract values


// *********** set up promises *****************
// (must be in scope of called function to pass variables


    function get_contract_vals() {

        return new Promise(function (resolve, reject) {

            console.log("called get_contract_vals");
            var drug_json = JSON.parse('{"drug":"Asprin", "dose":"500ml"}')
            console.log(" ---> drug_json: ", drug_json);
            resolve();
        });
    }

    function read_in_json() {
        console.log("read_in_json called");
        return new Promise(function (resolve, reject) {


            var con_path = '../contracts/definition/' + definition_file ;
            // var con_path = '../contracts/definition/Prescription.json';
            // console.log("con_path: ", con_path);

            $.getJSON(con_path, callback); // note callback return order is different to web 3

            function callback(contract_json, textStatus) {
                if(textStatus == 'success') {
                    console.log("textStatus: ",textStatus)
                    console.log("contract_json: ", contract_json)
                    resolve(contract_json);
                } else {
                    console.log("textStatus: ",textStatus)
                    reject()
                }
            }
        });
    }

    function make_contract_obj(contract_json){

        return new Promise(function (resolve, reject){

            console.log("make_contract_obj called");
            console.log("contract_json.interface: ", contract_json.interface)
            iface = JSON.parse(contract_json.interface);
            bc = contract_json.bytecode;
            // contract_obj = web3.eth.contract(contract_json.interface);
            resolve();

        });
    }

    function deploy_contract(){

        return new Promise(function (resolve, reject){

            console.log("deploy_contract called");

            contract_obj = web3.eth.contract(iface);

            console.log("bc: ", bc);

            contract_obj.new(
                {
                    from: web3.eth.accounts[0],
                    data: bc,
                    gas: 3000000
                }, callback_x)

            function callback_x(e,contract) {
                console.log("callback_x called");
                if (e) {
                    console.log("contract_obj.new error");
                    reject(e);
                } else {

                    if (typeof contract.address != 'undefined') {
                        console.log(' ---> Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);

                        var json_to_file = {"address": contract.address, "tx_hash": contract.transactionHash};
                        console.log(" ---> contract deployed\n");
                        resolve(json_to_file);
                    }
                }
            }
        });
    }
    
    
    

// *********end of promise chain markers **********

    function end_success(result) {
        console.log("End result: ---> ", result); // "Stuff worked!"
    }

    function end_error(err) {
        console.log("End error: ---> ", err); // Error: "It broke"
    }


}