import { combineReducers } from 'redux';
import login from './login';
import listItem from './listItem';

export default combineReducers({ login, listItem });
