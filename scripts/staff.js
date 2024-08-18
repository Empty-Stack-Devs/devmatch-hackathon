function inputData() {
    let nameU = document.querySelector("#nama").value;
    let ageU = document.querySelector("#age").value;
    let genderU = document.querySelector("#sex").value;
    let nationalityU = document.querySelector("#nationality").value;
    let bloodtypeU = document.querySelector("#blood").value;
    let heightU = document.querySelector("#height").value;
    let weightU = document.querySelector("#weight").value;
    let dateU = document.querySelector("#date").value;
    let activityU = document.querySelector("#activity").value;
    let userType = document.querySelector("#user").value;

    const RAW_DATA = `
        "wallet_address":"${WALLET_ADDRESS}",
        "contract_address":"${CONTRACT_ADDRESS}",
        "metadata":{
            "name": "${nameU}",
            "age": "${ageU}",
            "gender": "${genderU}",
            "nationality": "${nationalityU}",
            "bloodtype": "${bloodtypeU}",
            "height": "${heightU}",
            "weight": "${weightU}",
            "date": "${dateU}",
            "activity": "${activityU}",
            "user": "${userType}"
        },
        "file": null,
        "callback_url": "https://postman-echo.com/post?"
    `;

    sendGetRequest(`${BACKEND_ADDRESS}/audit/audit/`, RAW_DATA , (r) => {
        console.log(r);
        
        let hash = JSON.parse(r).result.transactionHash;
        document.querySelector("#doc-page").innerHTML = `
            <p>${hash}</p>
            `
    });
}

// [02/02/2222, 0/0/0002]