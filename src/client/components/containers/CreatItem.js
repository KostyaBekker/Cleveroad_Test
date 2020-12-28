import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';

import { addItem } from '../../redux/actionsCreatItem';

import './creatItem.css';

// eslint-disable-next-line react/prefer-stateless-function
class CreatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header: '',
      showFailHeader: false,
      aboutItem: '',
      showFailAboutItem: false,
      price: '',
      showFailPrice: false,
      percentDiscount: '',
      endDateDiscount: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
      showFailDiscount: false,
      currentDate: new Date().toJSON().slice(0,10).replace(/-/g,'-'),
    };
  }

  hendelChangeSelect = (key, value) => {
    console.log(key, value);
    this.setState({ [key]: value });
    this.setState({ showFailHeader: false });
    this.setState({ showFailAboutItem: false });
    this.setState({ showFailPrice: false });
    this.setState({ showFailDiscount: false });

    // console.log(new Date().toJSON().slice(0,10).replace(/-/g,'-'));
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
    if (percentDiscount <= 0 && percentDiscount !== '') {
      this.setState({ showFailDiscount: true });
      isValidDiscount = false;
    }
    if (endDateDiscount < currentDate && endDateDiscount === currentDate) {
      isValidCurrentDate = false;
      console.log('Меньше текущей даты');
    }
    if (isValidHeader && isValidAboutItem && isValidPrice && isValidDiscount && isValidCurrentDate) {
      return true;
    }
  }

  addItem = (header, aboutItem, price, percentDiscount, endDateDiscount) => {
    if (this.isValid()) {
      this.props.addItem(header, aboutItem, price, percentDiscount, endDateDiscount);
      document.querySelector('.link').click();
    }
  };

  render() {
    console.log(this.props.creatElem);
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
      currentDate
    } = this.state;

    return (
      <div className="form__wrap__creatItem">
        <h3>Add item</h3>
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
        <Button
          size="small"
          className="creatItem__form"
          variant="outlined"
          component="label"
          style={{ display: 'flex', justifyContent: 'start', margin: '5px' }}
          onClick={() => this.addImg()}
        >
          Загрузить фото
        </Button>
        {/* <img src="URL" alt="альтернативный текст"> */}
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
        <span
          className={showFailDiscount ? 'isValidCreat' : 'validCreat'}
        >
          Процент скидки не может быть отрицательным числом.
        </span>
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
        <div className="creatItem__button__block">
          <Button
            size="small"
            variant="outlined"
            // disabled={
            //   !header
            //   || !price
            // }
            onClick={() => this.addItem(header, aboutItem, price, percentDiscount, endDateDiscount)}
          >
            add
          </Button>
        </div>
        <Link className="link" to="/main__app" />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  creatElem: state.listItem,
});

export default connect(
  mapStateToProps,
  { addItem }
)(CreatItem);
