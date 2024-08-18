// birth year, gender, nationality, blood type, height, weight, doctor
// epoch unix, activity, status

let medical_id = fetchLocalStorage('medical_id');
let metadata = {};

document.querySelector("#medical-id").innerHTML = medical_id;

sendGetRequest(`${BACKEND_ADDRESS}/audit/audit/${medical_id}`, (r) => {
    let response = JSON.parse(r);

    metadata = JSON.parse(response.result.metadata);
})

function updateUserInfo() {
    
}
