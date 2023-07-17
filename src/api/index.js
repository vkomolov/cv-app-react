import { getLocalForage, setLocalForage, initAxios } from "./funcs";

/**
 * @param {string} path: url to data to be fetched
 * @param {number} timeLimit: time limits for storing in localStorage (days)
 * @param {string} extension: optional type of the data received from http request
 * @returns {Promise} of the fetched data. Catch will be used outside
 */
export const getAndStore = async ( path, timeLimit=1, extension="json" ) => {
    const dataName = path.split("/").slice(-1)[0];

    let localData = await getLocalForage( dataName, timeLimit );
    if ( localData ) { //it returns obj or false
        return localData.data;
    }

    const config = {};
    if (extension === "blob") {
        config.responseType = "blob";
    }

    return await initAxios(path, config)
        .then( async data => {
            const storedData = await setLocalForage( dataName, data );
            return storedData.data;
        } );
};

/**
 * it takes the property names of the given object and returns the array of the property names except given is args
 * @param {Object} data: the given object with the property names: "personal", "experience", "education"
 * @param {String[]} exceptions: the array of properties to be excluded from reducing...
 * @returns {String[]} the array of the properties to be filtered by...
 */
export function getFilters(data, exceptions=[]) {
    if (!data || !Object.keys(data).length) {
        return [];
    }

    return Object.keys(data).reduce((acc, key) => {
        if (exceptions.includes(key)) {
            return acc;
        }
        return acc.concat(key);
    }, []);
}

/**
 *
 * @param {null|Object} auxData
 * @param {Array} filterNames
 * @param {string} filterActive
 * @returns {null|{asideData: Object, contentData: Object}}
 */
export function prepareData(auxData, filterNames, filterActive) {

    if (!auxData || !filterActive || !filterNames.length || !filterNames.includes(filterActive)) {
        return null;
    }

    const getDataActive = getFuncDataActive(auxData, filterActive);
    if (!getDataActive) {
        console.error(`Could not retrieve data by filter ${ filterActive }`);
        return null;
    }

    const fullName = auxData?.fullName || null;
    const photoUrl = auxData?.photoUrl || null;

    const asideData = {
        data: getDataActive("aside"),
        fullName,
        photoUrl,
        filterActive,
        filterNames,
    };
    const contentData = {
        data: getDataActive("content"),
        filterActive
    };

    return {
        asideData,
        contentData
    };

    /**
     * @param {Object} data
     * @param {string} filterActive: the name of the active filter
     * @returns {null|Function}
     */
    function getFuncDataActive(data, filterActive) {
        if (!data || !Object.keys(data).length || !(filterActive in data)) {
            return null;
        }

        const dataFiltered = data[filterActive];
        return (prop) => {
            if (prop in dataFiltered) {
                return dataFiltered[prop];
            }
            console.error(`property ${ prop } is not found in given data at hooks/index.js: prepareData: getFuncDataActive`);
            return null;
        };
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
    let requestId = null; //request animation identificator
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

    requestId = requestAnimationFrame(function measure(time) {
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
            //new animation after previous animation is fulfilled
            requestId = requestAnimationFrame(measure);
        } else {
            //if fulfilled, then to replace the scrolling element to the initial not visible position
            //only in case of isInfinite === true
            if (isInfinite) {
                refreshTextPos();
                startTime = null;
                requestId = requestAnimationFrame(measure);
            } else {
                cancelAnimationFrame(requestId);
                requestId = null;
            }
        }
    });
};

/**
 * @param {HTMLElement} htmlElement to animate opacity from 0 to 1
 * @param {number} duration of the animation
 * @returns {function(): void}
 */
export function initOpacityAnimation(htmlElement, duration) {
    let animeStart = null;
    htmlElement.style.opacity = "0";

    let reqId = requestAnimationFrame(function anime(timeStamp){
        if (!animeStart) animeStart = timeStamp;
        let progress = (timeStamp - animeStart) / duration;
        if (progress > 1) progress = 1;

        htmlElement.style.opacity = `${ progress }`;

        if (progress < 1) {
            reqId = requestAnimationFrame(anime);
        } else {
            cancelAnimationFrame(reqId);
        }
    });

    return () => cancelAnimationFrame(reqId);
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}