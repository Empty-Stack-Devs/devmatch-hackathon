function sendIC() {
    let id = document.querySelector("#parent input").value;

    sendGetRequest(`${BACKEND_ADDRESS}/audit/audit/${id}`, (r) => {

        console.log(r);
        let response = JSON.parse(r);
        let md = JSON.parse(r).result.metadata
        md = JSON.parse(md)
        console.log(response.result == null);

        if (response.result == null) {
            document.querySelector("#wrongID").innerHTML = 'Medical ID does not exist!';
        } else {
            localStorage.setItem('medical_id', id);
            localStorage.setItem('name', md['name'])
            localStorage.setItem('age', md['age'])
            localStorage.setItem('gender', md['gender'])
            localStorage.setItem('nationality', md['nationality'])
            localStorage.setItem('bloodtype', md['bloodtype'])
            localStorage.setItem('height', md['height'])
            localStorage.setItem('weight', md['weight'])
            localStorage.setItem('date_list', md['date'])
            localStorage.setItem('activity_list', md['activity'])
            localStorage.setItem('status_list', md['status'])
            window.location.href = './user.html';
        }
    })
}
