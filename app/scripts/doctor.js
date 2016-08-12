

function create_new_prescription() {

    var drug_json;
    var definition_file = "Prescription.json";
    var iface;
    var bc;
    var contract_obj;
    var ls_name = 'doctor_local_storage_test_1'


    //
    get_contract_vals()
        .then(read_in_json)
        .then(make_contract_obj)
        .then(deploy_contract)
        .then(store_contract_locally)
        .then(log_out_local_storage)
        .then(end_success, end_error);




// reset_local_storage();


// // test out local storage
// reset_local_storage("hi")
//     .then(json_to_file_stub)
//     .then(store_contract_locally)
//     .then(log_out_local_storage)
//     .then(json_to_file_stub)
//     .then(store_contract_locally)
//     .then(log_out_local_storage)
//     .then(json_to_file_stub)
//     .then(store_contract_locally)
//     .then(log_out_local_storage)
//     .then(reset_local_storage)
//     .then(log_out_local_storage)
//     .then(end_success,end_error);


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
            // console.log("contract_json.interface: ", contract_json.interface)
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

            // console.log("bc: ", bc);

            contract_obj.new(
                {
                    from: web3.eth.accounts[0],
                    data: bc,
                    gas: 3000000
                }, callback_x)

            function callback_x(e,contract) {
                // console.log("callback_x called");
                if (e) {
                    console.log("contract_obj.new error");
                    reject(e);
                } else {

                    if (typeof contract.address != 'undefined') {
                        console.log(' ---> Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);


                        var json_to_storage = { hash: contract.address, ref: "ref_1"};
                        console.log(" ---> contract deployed\n");
                        resolve(json_to_storage);
                    }
                }
            }
        });
    }


    function store_contract_locally(json_to_file){
        console.log("store_contract_locally called");
        return new Promise(function (resolve,reject){

            var ls = localStorage.getItem(ls_name);
            var my_json;

            if(ls == ""){
                my_json = {prescriptions: [json_to_file]}

            } else {
                var index;
                my_json = JSON.parse(ls);
                index = my_json.prescriptions.length;
                my_json.prescriptions[index] = json_to_file;
            }
            localStorage.setItem(ls_name, JSON.stringify(my_json));
            resolve("finished");

        });
    }
    

    // ********* end of promise chain markers **********

    function end_success(result) {
        console.log("End result: ---> ", result); // "Stuff worked!"
    }

    function end_error(err) {
        console.log("End error: ---> ", err); // Error: "It broke"
    }

    // ********** utilities and stubs ****************

    function json_to_file_stub() {
        console.log("json_to_file_stub called");
        return new Promise(function (resolve, reject){
            var address = '0x12c073fff4c2109c234285ff590a539f77338aac'
            var json_stub = { hash: address, ref: "ref_1"};
            resolve(json_stub);
        })
    }

    function log_out_local_storage(pass_through){
        console.log("log_out_local_storage called");
        return new Promise(function (resolve, reject){

            var ls = localStorage.getItem(ls_name);

            if(ls == ""){
                console.log("local_storage is empty for ", ls_name);
                resolve(pass_through);
            } else {

                var my_json = JSON.parse(ls);
                var len = my_json.prescriptions.length;
                for (var i = 0; i < len; i++) {
                    console.log(my_json.prescriptions[i]);
                }
                resolve(pass_through);
            }
        });
    }

    function reset_local_storage(pass_through){
        console.log("reset_local_storage called");
        return new Promise(function(resolve,reject){

            localStorage.setItem(ls_name, "");
            resolve(pass_through)

        })
    }

    function init_local_storage(input_json){
        console.log("int_local_storage called");
        return new Promise(function(resolve,reject){

            var my_json = {prescriptions: [ input_json]};
            localStorage.setItem(ls_name, JSON.stringify(my_json));
            resolve("finish")
        });
    }




    // ********* end of create_new_prescription() function ***********
}


