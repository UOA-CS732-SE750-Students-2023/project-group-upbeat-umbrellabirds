/**

Network request configuration
*/
import axios from "axios";
axios.defaults.timeout = 100000;
// Set the base URL for API requests
// axios.defaults.baseURL = "";

/**

HTTP request interceptor
*/
axios.interceptors.request.use(
(config) => {
// Convert request data to JSON string
// config.data = JSON.stringify(config.data);
config.headers = {
"Content-Type": "application/json; charset=utf-8",
};
return config;
},
(error) => {
return Promise.reject(error);
}
);
/**

HTTP response interceptor
*/
axios.interceptors.response.use(
(response) => {
if (response.data.errCode === 2) {
console.log("Session expired");
}
return response;
},
(error) => {
console.log("Request error:", error);
}
);
/**

Encapsulate the GET method
@param url The request URL
@param params The request parameters
@returns {Promise}
*/
export function get(url, params = {}) {
return new Promise((resolve, reject) => {
axios
.get(url, {
params: params,
})
.then((response) => {
landing(url, params, response.data);
resolve(response.data);
})
.catch((error) => {
reject(error);
});
});
}
/**

Encapsulate the POST method
@param url The request URL
@param data The request data
@returns {Promise}
*/
export function post(url, data) {
console.log(data, "data");
return new Promise((resolve, reject) => {
axios
.post(url, data)
.then(
(response) => {
// Close the progress bar
console.log(response, "response");
resolve(response.data);
},
(err) => {
reject(err);
}
);
});
}
/**

Encapsulate the PATCH method
@param url The request URL
@param data The request data
@returns {Promise}
*/
export function patch(url, data = {}) {
return new Promise((resolve, reject) => {
axios
.patch(url, data)
.then(
(response) => {
resolve(response.data);
},
(err) => {
msag(err);
reject(err);
}
);
});
}
/**

Encapsulate the PUT method
@param url The request URL
@param data The request data
@returns {Promise}
*/
export function put(url, data = {}) {
return new Promise((resolve, reject) => {
axios
.put(url, data)
.then(
(response) => {
resolve(response.data);
},
(err) => {
msag(err);
reject(err);
}
);
});
}
// Unified API interface, returning data
export default function request(fecth, url, param) {
return new Promise((resolve, reject) => {
switch (fecth) {
case "get":
console.log("Begin a GET request, URL:", url);
get(url, param)
.then(function (response) {
resolve(response);
})
.catch(function (error) {
console.log("GET request failed:", error);
reject(error);
});
break;
case "post":
post(url, param)
.then(function (response) {
resolve(response);
})
.catch(function (error) {
console.log("POST request failed:", error);
reject(error);
});
break;
default:
break;
}
});
}

/**

Display error messages
@param err The error object
*/
function msag(err) {
if (err && err.response) {
switch (err.response.status) {
case 400:
alert(err.response.data.error.details);
break;
case 401:
alert("Unauthorized, please login");
break;
case 403:
alert("Access denied");
break;
case 404:
alert("Request address not found");
break;
case 408:
alert("Request timeout");
break;
case 500:
alert("Internal server error");
break;
case 501:
alert("Service not implemented");
break;
case 502:
alert("Gateway error");
break;
case 503:
alert("Service unavailable");
break;
case 504:
alert("Gateway timeout");
break;
case 505:
alert("HTTP version not supported");
break;
default:
}
}
}
/**

Check the returned data
@param url The request URL
@param params The request parameters
@param data The response data
*/
function landing(url, params, data) {
if (data.code === -1) {
// Handle code -1 response
}
}



