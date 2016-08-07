// Prescription Contract

contract Prescription
{

    address doctor_id;
    address patient_id;

    struct Details {
        string drug;
        uint dose;
        uint freq;
        uint num_days;
    }

    Details p_details;

	function Prescription() {
		doctor_id = msg.sender;
		p_details.drug = "default drug";
		p_details.dose = 500;
		p_details.freq = 2;
		p_details.num_days = 7;
	}

    function set_drug(string drug) {p_details.drug = drug;}
    function set_dose(uint dose) {p_details.dose = dose;}
    function set_freq(uint freq) {p_details.freq = freq;}
    function set_num_days(uint num_days) {p_details.num_days = num_days;}

    function get_drug() constant returns (string) { return p_details.drug;}
    function get_dose() constant returns (uint) { return p_details.dose;}
    function get_freq() constant returns (uint) { return p_details.freq;}
    function get_num_days() constant returns (uint) { return p_details.num_days;}

    function() returns (string){return "fallback function";
    }
}


