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

            log(data, "data:");

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
     *
     * @param {Object[]} filters: this.state.dataFilters as Array of Objects
     * @param {Object} innData: this._data as Object
     * @returns {null|Object} returns the Object from this._data, taken from the target property, or null
     */
    dataFiltered(filters, innData) {
        if (!filters.length || !innData) {
            log("empty...");
            return null;
        }

        /**
         * @description it returns the name of the active filter
         */
        const filterActive = filters.find(filter => !!filter.isActive).filterName;
        log(filterActive, "filterActive");

        if (!innData[filterActive]) {
            console.error(`no "${ filterActive }" is found in the given data at App.js this.dataFiltered...`);
            return null;
        }

        return innData[filterActive];
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

    render() {
        log("render...");

        const { alertState, dataFilters } = this.state;
        const dataActive = this.dataFiltered(dataFilters, this._data);
        const { aside, content } = dataActive || {};

        return (
            <div className="totalWrapper">
                { !!alertState.alertType && <AlertBlock { ...{ alertState } } /> }
                { !!aside && <AsideBar data={ aside }/> }
                { !!content &&  <ContentBar data={ content } /> }
            </div>
        );
    }
}

///////////////// dev
// eslint-disable-next-line no-unused-vars
function log(it, comments="value: ") {
    console.log(comments, it);
}