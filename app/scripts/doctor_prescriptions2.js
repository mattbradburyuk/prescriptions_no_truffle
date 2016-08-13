
var ls_name = 'doctor_local_storage_test_1';
var row_count = 0;

window.onload = function(){
    
    load_prescriptions();
};


function load_prescriptions(){
    
    console.log("load prescriptions called");

    var my_json_str = localStorage.getItem(ls_name);

    var my_json = JSON.parse(my_json_str);

    var num_items = my_json.prescriptions.length

    console.log("my_json: ", my_json);
    console.log("my_json: ", my_json.prescriptions);
    console.log("num_items ", num_items);

    for (var i = 0; i < num_items;i++) {

        add_row(my_json.prescriptions[i].ref, my_json.prescriptions[i].hash);

    }
    
}

function add_row(ref, address){

    console.log("add_row called");

    var i = row_count;

    html_str = '<tr id="row_ref_' + i + '">' +
        '<td>' + ref  +'</td>'+
        '<td>' + address + '</td>' +
        '<td>'+  '<button id="row_button_'+ i + '" onclick="get_prescription(' + i + ')">View</button>' + '</td>'+
        '</td></tr>';
    // console.log(html_str);
    $('#my_table').append(html_str);

    row_count = row_count + 1;
}



function get_prescription(local_storage_ref) {

    console.log("get_prescription called");

    // var prescription_address = document.getElementById("prescription_address").value;

    var my_json_str = localStorage.getItem(ls_name);

    var my_json = JSON.parse(my_json_str);

    var prescription_address = my_json.prescriptions[local_storage_ref].hash;

    var prescription_ref = my_json.prescriptions[local_storage_ref].ref;

    document.getElementById("pres_ref").innerHTML = prescription_ref;


    // console.log("prescription_addres: ,", prescription_address);

    // *********** read in .json ***************************

    // var com_path = 'http://localhost:8000/contract/Prescription.json';
    var com_path = '../contracts/definition/Prescription.json';



    $.getJSON(com_path, function (json) { // this is clumsy, want to use promises to get linear flow
        // console.log(json.interface);

        var iface = JSON.parse(json.interface);    // interface needs to be in JSON not a string
        // console.log("interface: ", iface);

        var Prescription = web3.eth.contract(iface)

        // console.log("pres add: ",prescription_address);
        var pres = Prescription.at(prescription_address);
        // console.log("pres: ", pres)


        pres.get_drug.call(function(e,r){
            if(e){
                console.log("get_drug error")
            }else{
                var drug_element = document.getElementById("drug");
                drug_element.innerHTML = r;
            }
        })
        pres.get_dose.call(function(e,r){
            if(e){
                console.log("get_dose error")
            }else{
                var drug_element = document.getElementById("dose");
                drug_element.innerHTML = r;
            }
        })

        return;

        //
        // var dose_element = document.getElementById("dose");
        // dose_element.innerHTML = pres.get_dose.call();
    });
}