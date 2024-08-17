function sendIC() {
    let id = document.querySelector("#parent input").value;

    sendGetRequest(`${BACKEND_ADDRESS}/audit/audit/${id}`, (r) => {

        console.log(r);
        let response = JSON.parse(r);
        console.log(response.result == null);

        if (response.result == null) {
            document.querySelector("#wrongID").innerHTML = 'Medical ID does not exist!';
        } else {
            setLocalStorage('medical_id', id);
            window.location.href = '/user.html';
        }
    })
}