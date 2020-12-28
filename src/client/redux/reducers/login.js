import { LOGIN } from '../actionTypes';

const initialState = {
  name: 'admin@i.ua',
  password: '12345678',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      // console.log('reducer', action.payload);
      return action.payload;
    }
    default:
      return state;
  }
};
