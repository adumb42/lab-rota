import {
    LOGIN_PASSWORD
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN_PASSWORD:
            return { ...state, ...action.payload };
        default:
            return state;
    }
};

        
