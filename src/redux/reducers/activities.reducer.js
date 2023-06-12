const activitiesReducer = (state=[], action) => {
    switch (action.type) {
        case 'REDUCER/STORE_ACTIVITES_LIST':
            return [...state, action.payload];
        default:
            return state;
    }
}

export default activitiesReducer;