import React from "react";
import "./App.scss";
import AsideBar from "../AsideBar";
import ContentBar from "../ContentBar";
import AlertBlock from "../../components/AlertBlock";
import { getAndStore } from "../../utils/services/userService";

const jsonUrl = "./asset/pData/cv.json";

export default class App extends React.Component {
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

    /**@async
     * @function
     * @description: it is the main start method, which is initiated right after the App is mounted
     * @param {string} dataPath url to the source for fetching data
     */
     getAndRenderData(dataPath) {
        return getAndStore(dataPath, 1, "json")
            .then(data =>{
                /**
                 * on fetching the data it takes data['photoUrl'] and additionally fetches the blob from this url,
                 * then reading by File-Reader it re-sets the value of data['photoUrl'] and finally returns the
                 * updated data
                 */
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

    /**@function
     * @param {string} type: 'error', 'loading'... to be scaled
     * @param {...string} content
     * @example
     * dispatchAlert("error", "text" | Error.message());
     */
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

    /**
     * it sets the alert state to the initial values
     */
    alertClear() {
        this.setState({
            alertState: {
                ...this.alertStateDefault,
            }
        })
    }

    /**
     * it sets this.state.dataFilters and this.state.alertState with the data received
     * @param {Object} data which is fetched or taken from the localStore
     * @private
     */
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

    /**
     * @description it returns the array of the filters` names
     * @returns {null|*[]}
     */
    _getFilterNames() {
        if (!this.state.dataFilters.length) {
            return null;
        }
        return this.state.dataFilters.map(filter => filter.filterName);
    }

    /**
     * @description it returns the active filter name
     * @returns {null|string}
     */
    _getFilterActive() {
        if (!this.state.dataFilters.length) {
            return null;
        }
        return this.state.dataFilters.find(filter => !!filter.isActive).filterName;
    }

    /**
     *
     * @param {string} filterNameSet: selected filter name to be active
     */
    setFilterActive({ target }) {
        const filterArr = this._getFilterNames();
        const filterNameSet = target.dataset.filter;

        if (!filterArr.includes(filterNameSet)) {
            this.dispatchAlert("error", "no such filter in the App...");
        } else {
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
        }
    }

    render() {
        log("render...");
        log(this.state, "this.state:");

        let fullName, photoUrl, asideData, contentData;
        const { alertState } = this.state;
        const isNotError = alertState.alertType !== "error";

        if (this._data) {
            fullName = this._data.fullName;
            photoUrl = this._data.photoUrl;
            const filterActive = this._getFilterActive();
            const filterNames = this._getFilterNames();
            const dataActive = this._data[filterActive];

            asideData = {
                data: dataActive["aside"],
                fullName,
                photoUrl,
                filterActive,
                filterNames,
                setFilterActive: this.setFilterActive,
            };
            contentData = dataActive["content"];
        }

        return (
            <div className="totalWrapper">
                { alertState.alertType && <AlertBlock { ...{ alertState } } /> }
                { asideData && isNotError && <AsideBar {...{ asideData }} /> }
                { contentData && isNotError && <ContentBar {...{ contentData }} /> }
            </div>
        );
    }

    componentDidMount() {
        log("componentDidMount");

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
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}