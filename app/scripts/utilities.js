var ls_name = 'doctor_local_storage_test_1';

function remove_local_storage(){
    console.log("reset_local_storage called");
    localStorage.removeItem(ls_name);
    
}
