





function get_prescription() {

    console.log("get_prescription called");

    var prescription_address = document.getElementById("prescription_address").value;

    // console.log("prescription_addres: ,", prescription_address);

    // *********** read in .json ***************************

    console.log("Reading in .json.....");

    // var com_path = 'http://localhost:8000/contract/Prescription.json';
    var com_path = '../contract/Prescription.json';



    $.getJSON(com_path, function (json) {
        // console.log(json.interface);

    // *********** deploy contract *****************

        var iface = JSON.parse(json.interface);    // interface needs to be in JSON not a string
        // console.log("interface: ", iface);
        
        var Prescription = web3.eth.contract(iface)

        // console.log("pres add: ",prescription_address);
        var pres = Prescription.at(prescription_address);



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