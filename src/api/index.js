///api
import { getLocalStorage, setLocalStorage, initAxios } from "./funcs";

/**
 * @param {string} path: url to data to be fetched
 * @param {number} timeLimit: time limits for storing in localStorage (days)
 * @param {string} extension: optional type of the data received from http request
 * @returns {Promise} of the fetched data. Catch will be used outside
 */
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

/**
 *
 * @param data
 * @returns {Array}
 */
export function getFilters(data) {
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


/**
 * @description it inits the scrolling text, which is wrapped in the parent at fixed position top of the window.
 * @param {HTMLElement} elem: with text should have its own wrapper, parentElement in DOM,
 * for elem is positioned to its wrapper
 * @param {number} duration in milliseconds for scrolling all the text through the length of its wrapper
 * @param {boolean} isInfinite: if true, the text starts scrolling infinitely
 */
export const initScrollingText = (elem, duration, isInfinite = false) => {
    let startTime = null;
    const textWrapper = elem.parentElement;
    const distanceGap = 10;
    const initialLeft = textWrapper.offsetWidth + distanceGap + "px";

    elem.style.left = initialLeft;  //setting elem with text out of the visible bouderies of the parentElement

    const initialLeftNum = parseInt(elem.style.left);
    const distance = elem.offsetWidth + textWrapper.offsetWidth + distanceGap;

    const refreshTextPos = () => {
        elem.remove();
        elem.style.left = initialLeft;
        textWrapper.append(elem);
    };

    requestAnimationFrame(function measure(time) {
        if (!startTime) {
            startTime = time;
        }
        //getting the percentage of time, passed from startTime...
        let progress = (time - startTime)/duration;   //from 0 to 1
        if (progress > 1) {
            progress = 1;
        }

        //getting the portion of distance to animate
        let shift = distance * progress;
        elem.style.left = (initialLeftNum - shift) + "px";

        if (progress < 1) {
            requestAnimationFrame(measure);
        } else {
            //if fulfilled, then to replace the scrolling element to the initial not visible position
            //only in case of isInfinite === true
            if (isInfinite) {
                refreshTextPos();
                startTime = null;
                requestAnimationFrame(measure);
            }
        }
    });
};