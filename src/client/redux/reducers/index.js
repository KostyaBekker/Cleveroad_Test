import { combineReducers } from 'redux';
import login from './login';
import listItem from './listItem';
import creatItem from './creatItem';

export default combineReducers({ login, listItem, creatItem });
