import React, { Component } from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { addItem, editItem } from '../../redux/actionsCreatItem';

import './creatItem.css';

// eslint-disable-next-line react/prefer-stateless-function
class CreatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: this.props.creatElem.header,
      refPhoto: this.props.creatElem.refPhoto,
      showFailHeader: false,
      aboutItem: this.props.creatElem.aboutItem,
      showFailAboutItem: false,
      price: this.props.creatElem.price,
      showFailPrice: false,
      percentDiscount: this.props.creatElem.percentDiscount,
      endDateDiscount: this.props.creatElem.endDateDiscount,
      showFailDiscount: false,
      currentDate: new Date().toJSON().slice(0, 10).replace(/-/g, '-'),
    };
  }

  hendelChangeSelect = (key, value) => {
    this.setState({ [key]: value });
    this.setState({ showFailHeader: false });
    this.setState({ showFailAboutItem: false });
    this.setState({ showFailPrice: false });
    this.setState({ showFailDiscount: false });
  };

  addImg = () => {
    document.querySelector('.inputFile').click();
  };

  isValid = () => {
    const { header, aboutItem, price, percentDiscount, endDateDiscount, currentDate } = this.state;
    let isValidHeader = true;
    let isValidAboutItem = true;
    let isValidPrice = true;
    let isValidDiscount = true;
    let isValidCurrentDate = true;

    if (!(header.length >= 20) || !(header.length <= 60)) {
      this.setState({ showFailHeader: true });
      // console.log('isValidHeader');
      isValidHeader = false;
    }
    if (aboutItem.length >= 200) {
      this.setState({ showFailAboutItem: true });
      isValidAboutItem = false;
    }
    if (price.length > 11 || price <= 0) {
      this.setState({ showFailPrice: true });
      isValidPrice = false;
    }
    if ((percentDiscount < 10 || percentDiscount > 90) && percentDiscount !== '') {
      this.setState({ showFailDiscount: true });
      isValidDiscount = false;
    }
    if (endDateDiscount < currentDate) {
      isValidCurrentDate = false;
      this.setState({ showFailDiscount: true });
    }
    if (isValidHeader && isValidAboutItem && isValidPrice && isValidDiscount && isValidCurrentDate) {
      return true;
    }
  }

  addItem = (header, aboutItem, price, percentDiscount, endDateDiscount, refPhoto) => {
    if (this.isValid()) {
      this.props.addItem(header, aboutItem, price, percentDiscount, endDateDiscount, refPhoto);
      document.querySelector('.link').click();
    }
  };

  editItem = (header, aboutItem, price, percentDiscount, endDateDiscount, refPhoto) => {
    if (this.isValid()) {
      const item = {
        header,
        refPhoto,
        aboutItem,
        price,
        percentDiscount,
        endDateDiscount,
        keyItem: this.props.creatElem.keyItem
      };
      this.props.editItem(item);
      document.querySelector('.link').click();
    }
  };

  renderTitle = (creatElem) => {
    if (creatElem.type === 'add') {
      return (
        <h3>Add item</h3>
      );
    }
    return (
      <h3>Edit item</h3>
    );
  };

  renderButton = (header, aboutItem, price, percentDiscount, endDateDiscount, creatElem, refPhoto) => {
    if (creatElem.type === 'add') {
      return (
        <div className="creatItem__button__block">
          <Button
            size="small"
            variant="outlined"
            disabled={
              !header
              || !price
            }
            onClick={() => this.addItem(header, aboutItem, price, percentDiscount, endDateDiscount, refPhoto)}
          >
            add
          </Button>
        </div>
      );
    }
    return (
      <div className="creatItem__button__block">
        <Button
          size="small"
          variant="outlined"
          disabled={
            !header
            || !price
          }
          onClick={() => this.editItem(header, aboutItem, price, percentDiscount, endDateDiscount, refPhoto)}
        >
          edit
        </Button>
      </div>
    );
  };

  render() {
    const { creatElem } = this.props;
    const {
      header,
      aboutItem,
      price,
      percentDiscount,
      endDateDiscount,
      showFailHeader,
      showFailAboutItem,
      showFailPrice,
      showFailDiscount,
      currentDate,
      refPhoto
    } = this.state;

    console.log(refPhoto);

    return (
      <div className="form__wrap__creatItem">
        {this.renderTitle(creatElem)}
        <TextField
          className="creatItem__form"
          label="Заголовок*"
          variant="outlined"
          size="small"
          onChange={e => this.hendelChangeSelect('header', e.target.value)}
          value={header}
        />
        <span
          className={showFailHeader ? 'isValidCreat' : 'validCreat'}
        >
          Необходимо от 20 до 60 символов.
        </span>
        <input
          type="file"
          style={{ display: 'none' }}
          className="inputFile"
        />
        <TextField
          className="creatItem__form"
          value={refPhoto}
          label="Вставить ссылку на фото"
          variant="outlined"
          size="small"
          onChange={e => this.hendelChangeSelect('refPhoto', e.target.value)}
        />
        <img
          src={refPhoto} 
          alt="альтернативный текст"
          style={{ width: '200px', height: '200px'}}
          className={refPhoto !== '' ? 'isShowRefPhoto' : 'showRefPhoto'}
        />
        <TextField
          className="creatItem__form"
          value={aboutItem}
          label="Описание товара"
          variant="outlined"
          size="small"
          multiline
          rows={2}
          onChange={e => this.hendelChangeSelect('aboutItem', e.target.value)}
        />
        <span
          className={showFailAboutItem ? 'isValidCreat' : 'validCreat'}
        >
          Привышен максимум в 200 символов.
        </span>
        <div className="creatItem__form__blockPrice">
          <FormControl variant="outlined" className="creatItem__form__price" size="small">
            <InputLabel htmlFor="outlined-adornment-amount">Цена*</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              value={price}
              onChange={e => this.hendelChangeSelect('price', e.target.value)}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              labelWidth={50}
            />
          </FormControl>
        </div>
        <span
          className={showFailPrice ? 'isValidCreat' : 'validCreat'}
        >
          Максимальное значение 99999999.99$.
        </span>
        <div className="creatItem__form__blockPrice">
          <FormControl variant="outlined" className="creatItem__form__price" size="small">
            <InputLabel htmlFor="outlined-adornment-amount1">Процент скидки</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount1"
              type="number"
              value={percentDiscount}
              onChange={e => this.hendelChangeSelect('percentDiscount', e.target.value)}
              startAdornment={<InputAdornment position="start">%</InputAdornment>}
              label="Процент скидки"
            />
          </FormControl>
        </div>
        <TextField
          size="small"
          className="creatItem__form"
          variant="outlined"
          label="Дата окончания скидки"
          type="date"
          defaultValue={currentDate}
          disabled={
            !percentDiscount
            || percentDiscount <= '0'
          }
          onChange={e => this.hendelChangeSelect('endDateDiscount', e.target.value)}
        />
        <span
          className={showFailDiscount ? 'isValidCreat' : 'validCreat'}
        >
          Процент скидки должно быть от 10% - 90% и дата окончания акции не может быть быть меньше текущей.
        </span>
        {this.renderButton(header, aboutItem, price, percentDiscount, endDateDiscount, creatElem, refPhoto)}
        <Link className="link" to="/main__app" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  creatElem: state.creatItem,
});

export default connect(
  mapStateToProps,
  { addItem, editItem }
)(CreatItem);
