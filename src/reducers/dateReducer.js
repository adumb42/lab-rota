const dateReducer = (state = {}, action) => {
    return action.state ? { ...state, ...action.state } : state
};

export default dateReducer;