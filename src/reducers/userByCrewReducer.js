import {
    FETCH_USER_BY_CREW
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_USER_BY_CREW:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

        
