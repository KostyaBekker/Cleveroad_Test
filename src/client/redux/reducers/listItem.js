import * as firebase from 'firebase';
import { LISTITEM, ADDITEM, DELETEITEM, EDITITEM } from '../actionTypes';

const initialState = [

];
export default (state = initialState, action) => {
  switch (action.type) {
    case LISTITEM: {
      state = action.payload;
      // console.log('reducer', action.payload);
      return state;
    }
    case ADDITEM: {
      // console.log('reducer', action.payload);
      return state;
    }
    case EDITITEM: {
      console.log('EDITITEM');
      console.log('reducer', action.payload);
      // elem = action.payload;
      return state;
    }
    case DELETEITEM: {
      // console.log('DELETEITEM');
      // console.log('reducer', action.payload);
      return state;
    }
    default:
      return state;
  }
};
