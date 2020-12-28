import { LISTITEM } from '../actionTypes';

const initialState = [

];
export default (state = initialState, action) => {
  switch (action.type) {
    case LISTITEM: {
      // console.log('reducer', action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};
