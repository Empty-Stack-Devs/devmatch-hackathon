function sendIC() {
    let id = document.querySelector("#parent input").value;

    sendGetRequest(`${BACKEND_ADDRESS}/audit/audit/${id}`, (r) => {

        console.log(r);
        let response = JSON.parse(r);
        let md = JSON.parse(r).result.metadata
        md = JSON.parse(md)
        console.log(response.result == null);
        console.log(md)
        console.log(md['user'])
        console.log(md['date'])

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
            localStorage.setItem('userType', md['user'])

            if (md['user'] == "normal") { 
                window.location.href = './user.html';
            } else if (md['user'] == "staff") {
                document.querySelector("#doc-page").innerHTML = `
                    <p>Click here to access the staff page: </p>
                    <a href="staff.html">Staff Page</a>
                    `
            };
        }
    })
}

// normal user hash: 0x5ea86875dfc5a3f25a948d5061ca99a2bb2dd5e533b20f7f2744bf487bba783f
// doc has: 0x8b48defc20dc8ffe066ea1fdc46ad4612f98981fcd10173824eb54ebd9f38485