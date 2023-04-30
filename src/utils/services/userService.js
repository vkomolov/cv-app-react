///utils
import { getLocalStorage, setLocalStorage, initAxios } from "./index";

/**
 * @async
 * @param {string} dataPath: url to the source for fetching data
 * @param {function} dataHandle for fetching and storing data
 * @returns {Object} data fetched or taken from the localStore
 */
export function getAndRenderData(dataPath, dataHandle) {
    return dataHandle(dataPath, 1, "json")
        .then(data => {
            /**
             * on fetching the data it takes data['photoUrl'] which is {string} and additionally fetches
             * the blob from this url, then reading by File-Reader it re-sets the value of data['photoUrl'] and
             * finally returns the updated data
             */
            if (data["photoUrl"]) {
                return dataHandle(data["photoUrl"], 1, "blob")
                    .then(objUrl => ({
                        ...data,
                        photoUrl: objUrl,
                    }));
            }
            return data;
        })
}

/**
 * it accumulates the array with the filter objects for the state
 * @param { Object } data
 * @returns {Array}
 */
export function handleData(data) {
    if (Object.keys(data).length) {
        const filterArr = Object.keys(data).reduce((acc, key) => {
            if (key !== "fullName" && key !== "photoUrl") {
                const isActive = acc.length === 0;
                return acc.concat({
                    filterName: key,
                    isActive,
                });
            }
            return acc;
        }, []);

        if (!filterArr.length) {
            throw new Error("no filters found in given data...");
        }

        return filterArr;

    }
    else {
        throw new Error("no correct data received...");
    }
}

export const getAndStore = async ( path, timeLimit=1, extension="json" ) => {
    const dataName = path.split("/").slice(-1)[0];

    let localData = getLocalStorage( dataName, timeLimit );
    if ( localData ) { //it returns obj or false
        //log(localData, "getting data at local storage: ");
        return localData.data;
    }

    return await initAxios(path, extension)
        .then( data => {
            setLocalStorage( dataName, data );
            //log(data, "data after setting localStorage:");
            return data;
        } )
};


///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}