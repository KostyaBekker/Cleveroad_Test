import * as firebase from 'firebase';
import {
  LISTITEM,
  ADDITEM,
  DELETEITEM,
  EDITITEM,
} from './actionTypes';

export const listItem = () => {
  const db = firebase.database();
  const name = db.ref('listItem');
  return function (dispatch) {
    return name.on('value', (elem) => { 
      const listItem = elem.val();
      dispatch({ type: LISTITEM, payload: listItem })
    });
  }
};

export const addItem = (header, aboutItem, price, percentDiscount, endDateDiscount) => {
  // const createRid = () => {
  //   const time = new Date().getTime();
  //   return `${time}`;
  // };
  // const randomValue = createRid();

  // -MPZ2UnTEAceztovD-o7

  const db = firebase.database();
  db.ref('listItem').push({
    header,
    aboutItem,
    price,
    percentDiscount,
    endDateDiscount
  });

  console.log('addItem');
  // const addItem = {
  //   header: header,
  // };

  return {
    type: ADDITEM,
    payload: addItem
  };
};

export const editItem = (elem, keyItem) => {

  console.log('edittem', elem, keyItem);
  const item = {
    // header: item.header,
    // aboutItem: item.aboutItem,
    // price: item.price,
    // percentDiscount: item.percentDiscount,
    // endDateDiscount: item.endDateDiscount,
  };

  firebase.database().ref(`listItem/${keyItem}`).set({
    header: 'name',
    aboutItem: 'email',
    price: 'email',
    percentDiscount: 'email',
    endDateDiscount: 'email'
  });

  return {
    type: EDITITEM,
    payload: item
  };
};

export const deleteItem = (keyItem) => {

  console.log('deleteItem', keyItem);
  const db = firebase.database();

  // let key = "-LlouZxkW1N3Llt6h5nm"
  db.ref(`listItem/${keyItem}`).remove();

  // db.ref('listItem').push({
  //   header,
  //   aboutItem,
  //   price,
  //   percentDiscount,
  //   endDateDiscount
  // });

  return {
    type: DELETEITEM,
    payload: deleteItem
  };
};
