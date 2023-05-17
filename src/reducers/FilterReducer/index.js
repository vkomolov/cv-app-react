import filterConstants from "./constants";

const initialState = [];

const filterReducer = (state = initialState, { type, payload }) => {
    const filtersState = [...state];

    const typesObj = {
        [filterConstants.SET_DATA_FILTERS]: () => ([
            ...payload
        ]),
        [filterConstants.SET_FILTER_ACTIVE]: () => {
            return filtersState.map(filter => {
                const isActive = filter.filterName === payload;
                return {
                    ...filter,
                    isActive
                };
            });
        },
    };

    return (type in typesObj) ? typesObj[type]() : filtersState;

};

export default filterReducer;