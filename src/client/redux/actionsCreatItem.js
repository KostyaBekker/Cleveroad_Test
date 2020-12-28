import * as firebase from 'firebase';
import {
  ADDITEM,
  ACTIONADDITEM,
  DELETEITEM,
  ACTIONEDITITEM,
  EDITITEM,
} from './actionTypes';

export const addItem = (header, aboutItem, price, percentDiscount, endDateDiscount) => {

  const db = firebase.database();
  db.ref('listItem').push({
    header,
    aboutItem,
    price,
    percentDiscount,
    endDateDiscount
  });
  const item = {
    header: '',
    aboutItem: '',
    price: '',
    percentDiscount: '',
    endDateDiscount: '',
    type: 'add'
  };

  return {
    type: ADDITEM,
    payload: item
  };
};

export const actionAddItem = () => {
  const item = {
    header: '',
    aboutItem: '',
    price: '',
    percentDiscount: '',
    endDateDiscount: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
    type: 'add'
  };

  return {
    type: ACTIONADDITEM,
    payload: item
  };
};

export const editItem = (item) => {

  firebase.database().ref(`listItem/${item.keyItem}`).set({
    header: item.header,
    aboutItem: item.aboutItem,
    price: item.price,
    percentDiscount: item.percentDiscount,
    endDateDiscount: item.endDateDiscount,
  });

  return {
    type: EDITITEM,
    payload: item
  };
};

export const actionEditItem = (elem, keyItem) => {

  console.log('edittem', elem, keyItem);
  const item = {
    header: elem.header,
    aboutItem: elem.aboutItem,
    price: elem.price,
    percentDiscount: elem.percentDiscount,
    endDateDiscount: elem.endDateDiscount,
    type: 'edit',
    keyItem
  };

  // firebase.database().ref(`listItem/${keyItem}`).set({
  //   header: 'name',
  //   aboutItem: 'email',
  //   price: 'email',
  //   percentDiscount: 'email',
  //   endDateDiscount: 'email'
  // });

  return {
    type: ACTIONEDITITEM,
    payload: item
  };
};

export const deleteItem = (keyItem) => {
  // console.log('deleteItem', keyItem);
  const db = firebase.database();
  db.ref(`listItem/${keyItem}`).remove();

  return {
    type: DELETEITEM,
    payload: deleteItem
  };
};
