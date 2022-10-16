import _ from 'lodash';

import {
    FETCH_HOLIDAYS,
    FETCH_HOLIDAY,
    CREW_ONE_BENCH,
    CREW_TWO_BENCH,
    CREW_THREE_BENCH,
    CREW_FOUR_BENCH,
    CREW_FIVE_BENCH,
    CREW_SIX_BENCH,
    CREW_SEVEN_BENCH,
    CREW_EIGHT_BENCH,
    CREW_NINE_BENCH,
    CREATE_DAY,
    NAME_TOGGLE
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOLIDAYS:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_HOLIDAY:
            return { ...state, [action.payload.id]: action.payload };
        case NAME_TOGGLE:
            return {...state, [action.payload.id]: action.payload };
        case CREW_ONE_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_TWO_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_THREE_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_FOUR_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_FIVE_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_SIX_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_SEVEN_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_EIGHT_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREW_NINE_BENCH:
            return { ...state, [action.payload.id]: action.payload };
        case CREATE_DAY:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};

        
