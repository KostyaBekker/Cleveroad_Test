import { LISTITEM } from '../actionTypes';

const initialState = [

];
export default (state = initialState, action) => {
  switch (action.type) {
    case LISTITEM: {
      state = action.payload;
      // console.log('reducer', action.payload);
      return state;
    }
    default:
      return state;
  }
};