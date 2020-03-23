import {combineReducers} from 'redux';
import * as todolist from './todolist.js';
const rootReducer=combineReducers({...todolist});
export default rootReducer;
 