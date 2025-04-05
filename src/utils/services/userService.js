///utils
import { getLocalStorage, setLocalStorage, initAxios } from "./index";

export const getAndStore = async ( path, timeLimit=1, extension="json" ) => {
    const dataName = path.split("/").slice(-1)[0];

    let localData = getLocalStorage( dataName, timeLimit );
    if ( localData && localData.data ) { //it returns obj or false
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
