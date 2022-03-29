import {
    UPDATE_USER,
    FETCH_USER,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return { ...state, ...action.payload };
        case FETCH_USER:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

        
