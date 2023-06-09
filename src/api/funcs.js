///node_modules
import axios  from "axios";

/**
 * It gets the LocalStorage by name, validating by the time limit in days;
 * If the time limit is expired, then to return false;
 * If the LocalStorage does not exist then to return false;
 * Else to return the data;
 * @param { string } name of the LocalStorage data;
 * @param { number } [timeLimit=1]: number of days;
 * @returns { object | boolean } the data, stored in the LocalStorage... or false, if its not found or expired by time
 * */
export function getLocalStorage( name, timeLimit=1 ) {
    const storage = localStorage.getItem( name );
    let innData;
    if ( storage ) {
        innData = JSON.parse( storage );
        const creationDate = new Date(innData.creationDate);
        const currentDate = new Date();
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
        creationDate: new Date()
    };
    localStorage.setItem(name, JSON.stringify( dataWithDate ));
}

/**@description It prepares the params and returns axios with the params, depending on the arguments:
 * - if the second argument 'ext' is Object, then to use method 'POST" with the key 'data' in params and the
 * following object as the value;
 * - if the second optional argument is String, then to use method 'GET' with the key 'responseType' and the following
 * expecting value;
 * - if the third optional argument 'innDataParams' is Object then to append it to params for axios;
 * @param {string} url of the data source
 * @param {(Object|string)} [ext='json'] can be data for post method or string with the expecting 'responseType'
 * @param {Object} [inDataParams] - optional params for the request is null by default
 * @example initAxios('someUrl', {someObject: values}, {id: 'someId'}) : POST request with the object and params
 * @example initAxios('someUrl', 'blob') - GET request with responseType = 'blob'
 * */
export function initAxios(url, ext = "json", inDataParams = null) {
    let getOrPostKey, getOrPostValue, method, paramsOut;

    //eliminating possible 'null' of ext
    if (ext && typeof ext === "object") {
        getOrPostKey = "data";
        getOrPostValue = ext;
        method = "POST";
    } else {
        getOrPostKey = "responseType";
        getOrPostValue = ext;
        method = "GET";
    }

    paramsOut = {
        url,
        method,
        [getOrPostKey]: getOrPostValue,
    };

    //if additional params are given, then to append them to 'params';
    if (inDataParams && typeof inDataParams === "object") {
        paramsOut.params = inDataParams;
    }

    return axios(paramsOut)
    /**
     * @function for processing the response fetched
     * @param {Object} resp
     * @param {Object} [resp.data] - if GET request, it receives 'data' property;
     * @returns {Promise} if responseType === blob, then to use FileReader by the inner func: {@link readFileAsDataUrl}
     * (URL.createObjectURL lives till window is closed, and is worthless in LocalStorage)...
     * else to return resp.data on GET request or resp on POST request;
     */
        .then(resp => {
            //if it is method GET and 'responseType' property exists...
            if (paramsOut.responseType) {
                if (paramsOut.responseType === "blob") {
                    //return URL.createObjectURL(resp.data); //it is alive till window closes...
                    return readFileAsDataUrl(resp.data);
                }
                return resp.data;
            }
            return resp;
        });
}
//  catch will be taken outer

/**@description it utilizes FileReader methods to read the file / blob as DataURL;
 * @async
 * @param {blob} file Blob or File
 * @returns {string} base64 encoded URL format
 * */
async function readFileAsDataUrl( file ) {
    return await new Promise( resolve => {
        let fileReader = new FileReader();
        fileReader.onload = event => resolve(event.target.result);

        return fileReader.readAsDataURL(file);
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