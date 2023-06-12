const getSkills = (state=[], action) => {
    switch (action.type) {
        case 'SET_SKILLS_LIST':
            return action.payload;
        default:
            return state;
    }
}

export default getSkills;