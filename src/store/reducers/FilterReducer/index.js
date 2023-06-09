import filterConstants from "./constants";

const initialState = {
    filters: [],
    auxData: null,
};

const filterReducer = (state = initialState, { type, payload }) => {
    const typesObj = {
        [filterConstants.SET_DATA_FILTERS]: () => ({
            ...payload
        }),
        [filterConstants.SET_FILTER_ACTIVE]: () => {
            const filters = state.filters.map(filter => {
                const isActive = filter.filterName === payload;
                return {
                    ...filter,
                    isActive
                };
            });
            return {
                auxData: state.auxData,
                filters
            };
        },
    };

    return (type in typesObj) ? typesObj[type]() : state;

};

export default filterReducer;