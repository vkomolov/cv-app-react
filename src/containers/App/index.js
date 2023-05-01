import React, { useState, useEffect } from "react";
import "./App.scss";
import ScrollingText from "../ScrollingText";
import AsideBar from "../AsideBar";
import ContentBar from "../ContentBar";
import AlertBlock from "../../components/AlertBlock";

import { getAndRenderData, handleData, getAndStore } from "../../utils/services/userService";

const jsonUrl = "./asset/pData/cv.json";
const scrollingText = "To realize the CV App with React, dynamically constructing " +
    "the Components from the fetched JSON file, which then to be temporally stored in the localStorage for 24 hours. " +
    "To make git branches of the realisations: using state drilling, using stateless functions on hooks and " +
    "using Redux and Router, which will be merged as the final version. "
    + "The link to the code is available in the section \"Experience\"... ";

const alertStateDefault = {
    alertType: null,
    alertContent: []
};

export default function App() {
    const [dataFilters, setDataFilters] = useState([]);
    const [stateData, setStateData] = useState({});
    const [alertState, setAlertState] = useState({
        alertType: "loading",       //    could be "loading", "error" or "null"
        alertContent: ["loading"]   //    the array of strings
    });

    //using componentDidMount Effect for one initial update of the states
    useEffect(() => {
        log("useEffect didMount...");
        getAndRenderData(jsonUrl, getAndStore)
            .then(auxData => {
                const filterArr = handleData(auxData);

                setTimeout(() => {
                    setStateData(Object.assign(stateData, auxData));
                    setDataFilters([...filterArr]);
                    alertClear();
                }, 1000);
            })
            .catch(e => {
            console.error(e.message, "catching error:");
            //if alertType is already "error" and added new error content, then to concat the content

            dispatchAlert("error", e.message);
        })
    /*eslint react-hooks/exhaustive-deps:0*/
    //for only componentDidMount effect
    }, []);

    useEffect(() => {
        log("updating");
    });


    log("rendering inside App");


    let dataActive, fullName, photoUrl, asideData, contentData;
    const isNotError = alertState.alertType !== "error";

    const scrollingTextData = {
        text: scrollingText,
        duration: 50000,
        isFinite: true,
    };

    if (Object.keys(stateData).length && dataFilters.length) {
        const filterActive = getFilterActive(dataFilters);
        const filterNames = getFilterNames(dataFilters);
        dataActive = getDataActive(stateData, filterActive);
        fullName = stateData.fullName;
        photoUrl = stateData.photoUrl;

        asideData = {
            data: dataActive("aside"),
            fullName,
            photoUrl,
            filterActive,
            filterNames,
            setFilterActive,
        };
        contentData = {
            data: dataActive("content"),
            filterActive
        }
    }

    function dispatchAlert(type, ...content) {
        const alertContent = alertState.alertType === type
            ? alertState.alertContent.concat(...content)
            : [...content];

        setAlertState({
            alertType: type,
            alertContent
        });
    }

    function alertClear() {
        setAlertState({ ...alertStateDefault });
    }

    /**
     * @param {Object[]} dataFilters
     * @returns {null|string}
     */
    function getFilterActive(dataFilters) {
        if (!dataFilters.length) {
            return null;
        }
        return dataFilters.find(filter => !!filter.isActive).filterName;
    }


    /**
     *
     * @param { HTMLElement } target with onClick event
     */
    function setFilterActive({ target }) {
        const filterArr = getFilterNames(dataFilters);
        const filterNameSet = target.dataset.filter;
        const filterActive = getFilterActive(dataFilters);

        if (!filterArr.includes(filterNameSet)) {
            dispatchAlert("error", "no such filter in the App...");
        } else {
            if (filterNameSet !== filterActive) {
                setDataFilters((prevDataFilters) => {
                    return prevDataFilters.map(filter => {
                        const isActive = filter.filterName === filterNameSet;

                        return {
                            filterName: filter.filterName,
                            isActive
                        };
                    });
                });

                //starting page from the initial position
                window.scrollTo(0, 0);
            }
        }
    }

    /**
     *
     * @param {Object} data
     * @param {string} filterActive
     * @returns {null|Function}
     */
    function getDataActive(data, filterActive) {
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

    /**
     *
     * @param {Object[]} dataFilters
     * @returns {null|Array}
     */
    function getFilterNames(dataFilters) {
        if (!dataFilters.length) {
            return null;
        }
        return dataFilters.map(filter => filter.filterName);
    }

    return (
        <>
            {
                isNotError
                && Object.keys(stateData).length
                && <ScrollingText data={ scrollingTextData } />
            }
            <div className="totalWrapper">
                { alertState.alertType && <AlertBlock { ...{ alertState } } /> }
                { isNotError && asideData && <AsideBar {...{ asideData }} /> }
                { isNotError && contentData && <ContentBar {...{ contentData }} /> }
            </div>
        </>
    );
}

/*export default class App extends Component {
    constructor(props) {
        super(props);

        this.alertStateDefault = {
            alertType: null,
            alertContent: []
        };

        this.state = {
            dataFilters: [], //   would be taken from the fetched data
            alertState: {
                alertType: "loading", //    could be "loading", "error" or "null"
                alertContent: ["loading"] //    the array of strings
            }
        };

        this._data = null;
        //this.dispatchAlert = this.dispatchAlert.bind(this);
        this.setFilterActive = this.setFilterActive.bind(this);
    }

    /!**@async
     * @function
     * @description: it is the main start method, which is initiated right after the App is mounted
     * @param {string} dataPath url to the source for fetching data
     *!/
     getAndRenderData(dataPath) {
        return getAndStore(dataPath, 1, "json")
            .then(data =>{
                /!**
                 * on fetching the data it takes data['photoUrl'] and additionally fetches the blob from this url,
                 * then reading by File-Reader it re-sets the value of data['photoUrl'] and finally returns the
                 * updated data
                 *!/
                if (data["photoUrl"]) {
                    return getAndStore(data["photoUrl"], 1, "blob")
                        .then(objUrl => ({
                            ...data,
                            photoUrl: objUrl,
                        }));
                }
                return data;

            });
    }

    /!**@function
     * @param {string} type: 'error', 'loading'... to be scaled
     * @param {...string} content
     * @example
     * dispatchAlert("error", "text" | Error.message());
     *!/
    dispatchAlert(type, ...content) {
        this.setState({
            alertState: {
                alertType: type,
                alertContent: [
                    ...content
                ],
            }
        });
    }

    /!**
     * it sets the alert state to the initial values
     *!/
    alertClear() {
        this.setState({
            alertState: {
                ...this.alertStateDefault,
            }
        })
    }

    /!**
     * it sets this.state.dataFilters and this.state.alertState with the data received
     * @param {Object} data which is fetched or taken from the localStore
     * @private
     *!/
    _handleData(data={}) {
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

            if (filterArr.length) {
                this._data = data;
                this.setState({
                    dataFilters: [
                        ...filterArr
                    ],
                    alertState: {
                        ...this.alertStateDefault,
                    }
                });
            } else {
                this.dispatchAlert("error", "no filters found in given data...");
            }
        } else {
            this.dispatchAlert("error", "no correct data received...");
        }
    }

    /!**
     * @description it returns the array of the filters` names
     * @returns {null|*[]}
     *!/
    _getFilterNames() {
        if (!this.state.dataFilters.length) {
            return null;
        }
        return this.state.dataFilters.map(filter => filter.filterName);
    }

    /!**
     * @description it returns the active filter name
     * @returns { null|string }
     *!/
    _getFilterActive() {
        if (!this.state.dataFilters.length) {
            return null;
        }
        return this.state.dataFilters.find(filter => !!filter.isActive).filterName;
    }

    /!**
     *
     * @param { HTMLElement } target: selected filter name to be active
     *!/
    setFilterActive({ target }) {
        const filterArr = this._getFilterNames();
        const filterNameSet = target.dataset.filter;
        const filterActive = this._getFilterActive();

        if (!filterArr.includes(filterNameSet)) {
            this.dispatchAlert("error", "no such filter in the App...");
        } else {
            if (filterNameSet !== filterActive) {
                this.setState(prevState => ({
                    dataFilters: [
                        ...prevState.dataFilters.map(filter => {
                            const isActive = filter.filterName === filterNameSet;

                            return {
                                filterName: filter.filterName,
                                isActive
                            }
                        })
                    ]
                }));
                //starting page from the initial position
                window.scrollTo(0, 0);
            }
        }
    }

    /!**
     *
     * @returns { null|Function }
     * @private
     *!/
    _getDataActive() {
        if (!this._data) {
            return null;
        }
        const filterActive = this._getFilterActive();
        const dataFiltered = this._data[filterActive];
        return (prop) => {
            if (prop in dataFiltered) {
                return dataFiltered[prop];
            }
            console.error(`property ${ prop } is not found at App.js: _getDataActive`);
            return null;
        };
    }

    render() {
        let fullName, photoUrl, asideData, contentData;
        const { alertState } = this.state;
        const isNotError = alertState.alertType !== "error";
        const dataActive = this._getDataActive();
        const scrollingTextData = {
            text: scrollingText,
            duration: 50000,
            isFinite: true,
        };

        if (this._data) {
            fullName = this._data.fullName;
            photoUrl = this._data.photoUrl;
            const filterActive = this._getFilterActive();
            const filterNames = this._getFilterNames();

            asideData = {
                data: dataActive("aside"),
                fullName,
                photoUrl,
                filterActive,
                filterNames,
                setFilterActive: this.setFilterActive,
            };
            contentData = {
                data: dataActive("content"),
                filterActive
            }
        }

        /!**
         * @description
         * if this.state.alertState.alertType !== null then to show AlertBlock
         * if asideData (or contentData) !== null (if fetched data) and if this.state.alertState.alertType !== "error"
         * then to show AsideBar (or ContentBar): they will be shown at other alerts or if no alerts...
         * condition isNotError acts as a protector against looping of render when an error is dispatched by one of the
         * Components without interactive events...
         *!/
        return (
            <Fragment>
                { isNotError && this._data && <ScrollingText data={ scrollingTextData } /> }
                <div className="totalWrapper">
                    { alertState.alertType && <AlertBlock { ...{ alertState } } /> }
                    { isNotError && asideData && <AsideBar {...{ asideData }} /> }
                    { isNotError && contentData && <ContentBar {...{ contentData }} /> }
                </div>
            </Fragment>
        );
    }

    componentDidMount() {
        /!**
         * at this stage to get the data from the localStorage or to fetch it from the server and record it to the
         * localStorage
         *!/
        this.getAndRenderData(jsonUrl)
            .then(data => {
                setTimeout(() => {
                    this._handleData(data);
                }, 1000);
            })
            .catch(e => {
                console.error(e.message);
                this.dispatchAlert("error", e.message)
            });
    }
}*/

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}