function doctor_test(){
    
    console.log("doctor test")
}


function create_new_prescription() {

    var drug_json;
    var definition_file = "Prescription.json";
    var instance_file = "instance_of_Prescription.json";


    // var con_path = '../contracts/definition/Prescription.json';
    // console.log("con_path: ", con_path);
    //
    // $.getJSON(con_path, callback);
    //
    // function callback(e, r) {
    //     if (e) {
    //         console.log(e)
    //     } else {
    //         console.log(r)
    //     }
    // }

    // get contract values from screen

    get_contract_vals()
        .then(read_in_json)
        .then(end_success, end_error);


    // deploy new contract

    // record address

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

            function callback(contract, textStatus) {
                if(textStatus == 'success') {
                    console.log("textStatus: ",textStatus)
                    resolve(contract);
                } else {
                    console.log("textStatus: ",textStatus)
                    reject()
                }
            }
        });
    }

    function unlock_acc(pass_through) {
        console.log("unlock_acc called");
        return new Promise(function (resolve, reject) {

            web3.personal.unlockAccount(web3.eth.accounts[0], 'mattspass', callback);  // unlock accounts

            function callback(e, r) {
                if (e) {
                    reject("unlock_acc error");
                } else {
                    console.log(" --->account unlocked\n");
                    resolve(pass_through);
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