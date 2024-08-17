const BACKEND_ADDRESS = `https://service-testnet.maschain.com/api`;
const CONTRACT_ADDRESS = `0x495b83b532f0dc5896dc2E2b5D9C77A2ad078b06`;
const WALLET_ADDRESS = `0xf3ECa03cFe85EF8289525BA33c58685A34a90Cb2`;

const CLIENT_ID = 'd6a7a54ceee3cb39e3aaf0bf9b0d602d1c1a4385a2c8972ab79dccc0d6754ae2';
const CLIENT_SECRET = 'sk_e6d5c1fb3ae8a0d74c303d0d2391bd7b7ff4e138bf0c0a86c201c9ea7746654b'; // dont push to prod

async function sendGetRequest(url, func) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if ((this.readyState == 4) && (this.status == 200)) {
            func(this.responseText);
        }
    }

    http.open("GET", url, true);
    http.setRequestHeader('client_id', CLIENT_ID);
    http.setRequestHeader('client_secret', CLIENT_SECRET);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.send();
}

async function sendPostRequest(url, body, func) {
    var http = new XMLHttpRequest();
    http.onload = function() {
        if ((this.readyState == 4) && (this.status == 200)) {
            func(this.responseText);
        }
    }

    http.open("POST", url, true);
    http.setRequestHeader('client_id', CLIENT_ID);
    http.setRequestHeader('client_secret', CLIENT_SECRET);
    http.setRequestHeader("Content-Type", "application/json");
    // using text/plain overcomes needing to send a OPTION request as a preflight request (preflight request sent automatically to check if actual request is safe to send)
    http.send(body)
}


function fetchCookie(name) {
    var result = undefined;
    document.cookie.split(';').forEach(element => {
        let x = element.trim().split("=");
        if (x[0] == name) {
            result = x[x.length - 1];
        }
    });
    return result;
}

function fetchLocalStorage(key) {
    let result = localStorage.getItem(key);
    if (result === null) {
        return null;
    }

    result = JSON.parse(result);
    let d = result["expiry"];
    let current = getEpochUnixGMT();

    if (d > current) {
        // console.log(getEpochUnixGMT());
        localStorage.setItem(key, JSON.stringify({
            "data": result["data"],
            "expiry": getEpochUnixGMT() + (14 * 86400)
        }));
        // 14 days till expiry
        return result["data"];
    }

    localStorage.removeItem(key);
    return null;
}

function setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify({
        "data": value,
        "expiry": getEpochUnixGMT() + (14 * 86400)
    }));
}

function getEpochUnixLocal(millis=false) {
    // get epoch unix at local
    let t = new Date();
    let f = t.getTime() - t.getTimezoneOffset();
    return Math.floor(f / (millis ? 0 : 1000));
}

function getEpochUnixGMT(millis=false) {
    // get epoch unix at gmt
    // 0 (GMT)  3600 (GMT+01:00)    7200 (GMT+02:00)

    return Math.floor((new Date()).getTime() / (millis ? 0 : 1000));
    // apparently thats it?
}

function clampValue(i, min, max) {
    return Math.max(Math.min(i, max), min);
}

function formatDateTime(d) {
    // 23/5/24 19:15 GMT+8
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit',

        minute: '2-digit',
        hour: 'numeric',
        hour12: false,

        timeZoneName: 'short'
    }).format(d)
}
