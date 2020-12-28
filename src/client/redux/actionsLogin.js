import * as firebase from 'firebase';
import { useDispatch } from 'react-redux';

import {
  LOGIN,
} from './actionTypes';

const login = ( name, password ) => {

  // Создание аккаунта пользователя
  // firebase.auth().createUserWithEmailAndPassword(input, password);

  // Поверка есть ли такой пользователь в базе
  return function (dispatch) {
    return firebase.auth().signInWithEmailAndPassword(name, password)
      .then(response => {

        // console.log(response)
        const user = {
          name: name,
          password,
          isValid: true,
          massage: ''
        };
        dispatch({ type: LOGIN, payload: user })
    })
    .catch((error) => {
      // console.log(error.message)
      const errorMassage = error.message;
      const user = {
        name: name,
        password,
        isValid: false,
        massage: errorMassage
      };
      dispatch({ type: LOGIN, payload: user })
    });
};
};

export default login;
