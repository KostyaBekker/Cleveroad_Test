import { ADDITEM, ACTIONADDITEM, DELETEITEM, EDITITEM, ACTIONEDITITEM } from '../actionTypes';

const initialState = {
  header: '',
  refPhoto: '',
  aboutItem: '',
  price: '',
  percentDiscount: '',
  endDateDiscount: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
  type: 'add',
  keyItem: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDITEM: {
      return state;
    }
    case ACTIONADDITEM: {
      return action.payload;
    }
    case EDITITEM: {
      return state;
    }
    case ACTIONEDITITEM: {
      return action.payload;
    }
    case DELETEITEM: {
      return state;
    }
    default:
      return state;
  }
};
