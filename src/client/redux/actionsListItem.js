import * as firebase from 'firebase';

import {
  LISTITEM,
} from './actionTypes';

const listItem = () => {
  const db = firebase.database();
  const name = db.ref('listItem');
  
  return function (dispatch) {
    return name.on('value', (elem) => { 
      const listItem = elem.val();
      dispatch({ type: LISTITEM, payload: listItem })
    });
  }
};

export default listItem;
