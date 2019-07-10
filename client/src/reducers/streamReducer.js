export default (state = {}, action) => {
    //convert object to array, each

    if (action.type === "FETCH_STREAMS") {
        //convert array to object
        const mapMyArray = (array, param) =>
            Object.assign(
                {},
                ...array.map(index => ({ [index[param]]: index }))
            );

        return { ...state, ...mapMyArray(action.payload, "_id") };

        //when data change, reducer will be updated
    } else if (action.type === "FETCH_STREAM") {
        return { ...state, [action.payload._id]: action.payload };
    } else if (action.type === "CREATE_STREAM") {
        return { ...state, [action.payload._id]: action.payload };
    } else if (action.type === "EDIT_STREAM") {
        return { ...state, [action.payload._id]: action.payload };
    } else if (action.type === "DELETE_STREAM") {
        let newState = Object.assign({}, state);
        delete newState[action.payload];
        return newState;
    }

    return state;
};
