import { combineReducers } from 'redux';
import holidayReducer from './holidayReducer';
import dateReducer from './dateReducer';
import userReducer from './userReducer';
import passwordReducer from './passwordReducer';

export default combineReducers({
    holidays: holidayReducer,
    dates: dateReducer,
    users: userReducer,
    passwords: passwordReducer
});

