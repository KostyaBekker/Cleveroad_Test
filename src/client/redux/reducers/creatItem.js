import { ADDITEM, ACTIONADDITEM, DELETEITEM, EDITITEM, ACTIONEDITITEM } from '../actionTypes';

const initialState = {
  header: '',
  aboutItem: '',
  price: '',
  percentDiscount: '',
  endDateDiscount: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
  type: 'add',
  keyItem: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDITEM: {
      // state = action.payload;
      return state;
    }
    case ACTIONADDITEM: {
      state = action.payload;
      return state;
    }
    case EDITITEM: {
      // console.log('EDITITEM');
      // console.log('reducer', action.payload);
      // state = action.payload;
      return state;
    }
    case ACTIONEDITITEM: {
      // console.log('EDITITEM');
      // console.log('reducer', action.payload);
      state = action.payload;
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
