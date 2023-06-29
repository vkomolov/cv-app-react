import filterConstants from "./constants";

const initialState = {
    auxData: null,
};

const dataReducer = (state = initialState, { type, payload }) => {
    const typesObj = {
        [filterConstants.SET_DATA]: () => {
            return {
                ...state,
                auxData: payload,
            };
        },
    };

    return (type in typesObj) ? typesObj[type]() : state;

};

export default dataReducer;