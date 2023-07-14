///node_modules
import axios  from "axios";
import localforage from "localforage";

/**
 * @description It gets async localForage by name, validating by the time limit in days;
 * If the time limit is expired, then to return false;
 * If the LocalForage does not exist then to return false;
 * Else to return data;
 * @async
 * @param { string } name of the LocalStorage data;
 * @param { number } [timeLimit=1]: number of days;
 * @returns { object | boolean } the data, stored in the LocalStorage... or false,
 * if its not found or expired by time
 * */
export async function getLocalForage(name, timeLimit=1) {
    const storage = await localforage.getItem( name );

    log(storage, "storage from localforage: ");

    if (storage) {
        const creationDate = storage.creationDate;
        const currentDate = Date.now();
        if (((currentDate - creationDate)/1000/60/60/24) > timeLimit) {
            return false;
        }
        return storage;
    }
    return false;
}

/**@description it receives the data and update it with the current Date
 * and sets the localForage;
 * @async
 * @param {string} name The name of the LocalStorage to be set
 * @param {Object} data which is fetched
 * */
export async function setLocalForage(name="localData", data) {
    const dataWithDate = {
        data,
        creationDate: Date.now()
    };

    return await localforage.setItem(name, dataWithDate);
}

/**
 * It gets the LocalStorage by name, validating by the time limit in days;
 * If the time limit is expired, then to return false;
 * If the LocalStorage does not exist then to return false;
 * Else to return the data;
 * @param { string } name of the LocalStorage data;
 * @param { number } [timeLimit=1]: number of days;
 * @returns { object | boolean } the data, stored in the LocalStorage...
 * or false, if its not found or expired by time
 * */
export function getLocalStorage( name, timeLimit=1 ) {
    const storage = localStorage.getItem( name );
    let innData;
    if ( storage ) {
        innData = JSON.parse( storage );
        const creationDate = innData.creationDate;
        const currentDate = Date.now();
        if (((currentDate - creationDate)/1000/60/60/24) > timeLimit) {
            return false;
        }
        return innData;
    }
    return false;
}

/**@description it receives the data and update it with the current Date
 * and sets the localStorage;
 * @param {string} name The name of the LocalStorage to be set
 * @param {Object} data which is fetched
 * */
export function setLocalStorage( name="localData", data ) {
    //log(data, "setting localStorage Data");

    const dataWithDate = {
        data,
        creationDate: Date.now()
    };
    localStorage.setItem(name, JSON.stringify( dataWithDate ));
}

export async function initAxios(url, config={}) {
    try {
        //if Object.keys(config).length === 0 then axios will use the default method: "get" with responseType: "json"
        const resp = await axios({
            url,
            ...config,
        });

        if (config.responseType && config.responseType === "blob") {
            return await readFileAsDataUrl(resp.data);
        }
        return resp.data;

    } catch (error) {
        if (error.response) {
            console.error("The request was made and the server responded with a status code out of the range of 2xx",
                error.response);
            throw error;
        } else if (error.request) {
            console.error("The request was made but no response was received", error.request);
            throw error;
        } else {
            console.error("Something happened in setting up the request that triggered an Error", error.stack);
            throw error;
        }
    }
}

/**@description it utilizes FileReader methods to read the file / blob as DataURL;
 * @async
 * @param {blob} file Blob or File
 * @returns {string} base64 encoded URL format
 * */
async function readFileAsDataUrl( file ) {
    return new Promise( (resolve, reject) => {
        let fileReader = new FileReader();
        fileReader.onloadend = event => resolve(event.target.result);
        fileReader.onerror = error => reject(error);

        const res = fileReader.readAsDataURL(file);

        log(res, "image in readAsDataUrl:");

        return res;
    });
}

/**@description Converts the Date format to yyyy-mm-dd String
 * @param {string} date to localString
 * @param {string} delimiter '-' for joining in String
 * @returns {string} Date with the delimiter
 * */
export function dateFormat(date, delimiter) {
    let innDate = new Date(date);
    let month = ("0" + (innDate.getMonth() + 1)).slice(-2); //if 2 digits then without 0
    let day = ("0" + innDate.getDate()).slice(-2);
    return [innDate.getFullYear(), month, day].join(delimiter);
}

/**@description: Rounds the Number to the necessary precision
 * @param: {number} num number to be rounded
 * @param: {number} decimal Number of decimals (100 - (2 decimals), 1000 (3 decimals) etc..
 * @returns: {number} Number rounded with necessary precision
 * */
export function numFormat(num, decimal) {
    return Math.round(num * decimal)/decimal;
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}