import { combineReducers } from 'redux'

import bikesReducer from './bikesReducer'

const reducers = combineReducers ({
    bikes: bikesReducer
});

export default reducers;

