function objToParams(obj: any): URLSearchParams {
    
    const params = new URLSearchParams();
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value !== undefined) {
                params.append(key, value);
            }
        }
    }
    return params;
}

/**
 * Get data from the UMS Service, returns a promise with the data
 * @param url The Service Method URL to get the data from.
 * @param parameters the parameters (as an object with name:value pairs) the request should be made with.
 */
export async function getData<T>(url: string, parameters?: {}): Promise<T> {
    
    let actualUrl = url;
    if (parameters) {
        const params = objToParams(parameters);
        actualUrl += "?" + params.toString();
    }

    return await fetch(actualUrl)
    .then((response) => {
        //check here if the server returns 401 unauthorized, ask to login again.
        if (response.status === 401) {
            return "unauthorized";
        } else if (response.status === 404) {
            return "NotFound";
        } else {
            return response.text();
        }
    })
    .then((text) => {
        if (text === "unauthorized") {
            throw new Error("unauthorized");
        } 
        else if (text === "NotFound") {
            throw new Error("NotFound");
        }

        if (text) {
            return JSON.parse(text);
        }
    }).then(res => res);
}

export async function postData<T>(url: string, parameters: {} = {}): Promise<T> {

    const actualUrl = url;

    const jsonToSend = JSON.stringify(parameters);

    //const toSendHeaders = new Headers();
    
    //toSendHeaders.append("Content-Type", "application/json");
    // toSendHeaders.append("Access-Control-Allow-Origin", "*");
    //toSendHeaders.append("Accept", "*/*");

    return await fetch(actualUrl, {
        //mode: "cors",
        method: "POST",
        body: jsonToSend,
        //headers: toSendHeaders
    })
    .then((response) => {
        //check here if the server returns 401 unauthorized, ask to login again.
        if (response.status === 401) {
            return "unauthorized";
        } else if (response.status === 404) {
            return "NotFound";
        } else {
            return response.text();
        }
    })
    .then((text) => {
        if (text === "unauthorized") {
            throw new Error("unauthorized");
        } 
        else if (text === "NotFound") {
            throw new Error("NotFound");
        }

        if (text) {
            return JSON.parse(text);
        }
    })
    .then((data: T) => data);
}

export async function postData2<T>(url: string, params: {} = {}) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    //xhr.setRequestHeader('Content-Type', 'application/json');
    //xhr.setRequestHeader('Access-Control-Allow-Origin', '*'); // Allow CORS

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
            return response;
        }
    };

    xhr.send(JSON.stringify(params));
    
}

export async function postDataWithFile<T>(url: string, parameters: any): Promise<T> {
    return await fetch(url, {
        method: "POST",
        body: parameters,
    })
    .then((response) => {
        //check here if the server returns 401 unauthorized, ask to login again.
        if (response.status === 401) {
            return "unauthorized";
        } else if (response.status === 404) {
            return "NotFound";
        } else {
            return response.text();
        }
    })
    .then((text) => {
        if (text === "unauthorized") {
            throw new Error("unauthorized");
        } 
        else if (text === "NotFound") {
            throw new Error("NotFound");
        }

        if (text) {
            return JSON.parse(text);
        }
    })
    .then((data: T) => data);
}