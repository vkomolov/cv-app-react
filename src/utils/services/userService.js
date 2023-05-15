///utils
import { getLocalStorage, setLocalStorage, initAxios } from "./index";

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
 * @description it prepares the data for AsideBar and ContentBar Components
 * @param {Object} innData: core data, fetched or taken from localStorage
 * @param {Object} filtersData taken from the state
 * @param {Object[]} filtersData.dataFilters: the array of filters
 * @param {function[]} filtersData.filterSetters: the array of functions which set the state dataFilters
 * @returns {null|{asideData: {Object}, contentData: {Object}}}
 */
export function prepareData(innData, filtersData) {
    if (!innData) {
        return null;
    }

    const { dataFilters, filterSetters } = filtersData;
    const [setFilterActive] = filterSetters;

    /**
     * useMemo just for demonstration of the hook: in other cases it`s used for performance optimizations
     * of heavy calculations
     */
    const filterActive = getFilterActive(dataFilters);
    const filterNames = getFilterNames(dataFilters);
    const getDataActive = getFuncDataActive(innData, filterActive);
    const fullName = innData.fullName;
    const photoUrl = innData.photoUrl;
    const asideData = {
        data: getDataActive("aside"),
        fullName,
        photoUrl,
        filterActive,
        filterNames,
        setFilterActive,
    };
    const contentData = {
        data: getDataActive("content"),
        filterActive
    };

    return {
        asideData,
        contentData
    };


    /** It returns the active filter name
     * @param {Object[]} dataFilters: the array of filters
     * @returns {null|string}
     */
    function getFilterActive(dataFilters) {
        if (!dataFilters.length) {
            return null;
        }
        return dataFilters.find(filter => !!filter.isActive).filterName;
    }

    /**
     * @param {Object} data
     * @param {string} filterActive: the name of the active filter
     * @returns {null|Function}
     */
    function getFuncDataActive(data, filterActive) {
        if (!Object.keys(data).length) {
            return null;
        }

        const dataFiltered = data[filterActive];
        return (prop) => {
            if (prop in dataFiltered) {
                return dataFiltered[prop];
            }
            console.error(`property ${ prop } is not found at App.js: getDataActive`);
            return null;
        };
    }

    /**It returns the array of the filters` names
     * @param {Object[]} dataFilters
     * @returns {null|Array}
     */
    function getFilterNames(dataFilters) {
        if (!dataFilters.length) {
            return null;
        }
        return dataFilters.map(filter => filter.filterName);
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

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}