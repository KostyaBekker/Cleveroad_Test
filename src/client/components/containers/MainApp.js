import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import { login } from '../../redux/actionsLogin';
import { listItem } from '../../redux/actionsCreatItem';
import { deleteItem } from '../../redux/actionsCreatItem';
import { editItem } from '../../redux/actionsCreatItem';

import './main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
  }

  addItem = () => {
    document.querySelector('.link').click();
  };

  editElem = (item, keyItem) => {
    this.props.editItem(item, keyItem);
    // document.querySelector('.link').click();
  };

  addItem11 = () => {
    this.props.listItem();
  };

  deleteElem = (keyItem) => {
    this.props.deleteItem(keyItem);
  };

  renderContent = (renderListItem) => {
    // console.log(renderListItem);
    const keys = Object.keys(renderListItem);
    // console.log(keys);
    return (
      <div className="main__content">
        {keys.map((item, index) => {
          return (
            <div
              className="main__content__elem"
              key={ index }
            >
              <div
                className="main__content__photo"
              >
              </div>
              <div
                className="main__content__item"
              >
                <h1>{renderListItem[item].header}</h1>
                <span>{renderListItem[item].aboutItem}</span>
                <span>
                  Цена: 
                  {renderListItem[item].price}
                </span>
                <span
                  style={{
                    display: renderListItem[item].percentDiscount ? 'block' : 'none',
                    color: 'red'
                  }}
                >
                  Скидка: 
                  {renderListItem[item].percentDiscount}
                  %
                </span>
                <span
                  style={{
                    display: renderListItem[item].percentDiscount ? 'block' : 'none',
                    color: 'red'
                  }}
                >
                  До: 
                  {renderListItem[item].endDateDiscount}
                </span>
                <div
                  className="main__content__item__buttonBlock"
                >
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.editElem(renderListItem[item], item)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => this.deleteElem(item)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })
        }
      </div>
    );
  };

  render() {
    const { renderListItem } = this.props;
    console.log(renderListItem);
    return (
      <div>
        <Button
              variant="contained"
              onClick={() => this.addItem11()}
            >
            Add item
            </Button>
        <div className="main__header">
          <div className="logo__block">
            {this.props.user.name}
          </div>
          <div>
            <h1>Catalog Items</h1>
          </div>
          <div className="select__block">
            <Button
              variant="contained"
              onClick={() => this.addItem()}
            >
            Add item
            </Button>
            <Link className="link" to="/creat__item" />
          </div>
        </div>
        {this.renderContent(renderListItem)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login,
  renderListItem: state.listItem
});

export default connect(
  mapStateToProps,
  { login, listItem, deleteItem, editItem }
)(Main);
