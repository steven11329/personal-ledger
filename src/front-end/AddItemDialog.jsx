import React from 'react';
import PropTypes from 'prop-types';

import DatePicker, { registerLocale } from "react-datepicker";
import zh_TW from 'date-fns/locale/zh-TW';
import { addItem } from './Database';

registerLocale('zh-TW', zh_TW);

import './css/Dialog.scss';

class AddItemDialog extends React.Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this.state = {
      date: new Date(now.getTime() - now.getSeconds() * 1000),
      name: '',
      number: 1,
      type: 1
    }
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleClickCancel = this.handleClickCancel.bind(this);
    this.handleClickAddItem = this.handleClickAddItem.bind(this);
    this.handleNumberOnChange = this.handleNumberOnChange.bind(this);
    this.handleNameOnChange = this.handleNameOnChange.bind(this);
    this.handleTypeOnchange = this.handleTypeOnchange.bind(this);
  }

  handleDateChange(date) {
    this.setState({
      date,
    });
  }

  handleClickCancel() {
    this.props.onCancel();
  }

  handleClickAddItem(e) {
    const { date, name, number, type } = this.state;
    let item = {
      createDate: date,
      name,
      number,
      type,
    }

    addItem(item).then(() => {
      this.handleClickCancel();
      this.props.onChange();
    });
  }

  handleNumberOnChange(e) {
    this.setState({
      number: parseInt(e.target.value),
    });
  }

  handleNameOnChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  handleTypeOnchange(e) {
    this.setState({
      type: parseInt(e.target.value),
    });
  }

  render() {
    if (this.props.show) {
      return (
        <div className="dialog">
          <form className="dialog__item-dialog">
            <div className="dialog__title">
              <h2>新增帳目</h2>
            </div>
            <div className="dialog__input-row">
              <div>
                {'日期:'}
              </div>
              <div className="dialog__input-row__sub-row">
                <DatePicker
                  locale='zh-TW'
                  showTimeSelect
                  dateFormat="yyyy/MM/dd HH:mm"
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                  timeCaption='time'
                />
              </div>
            </div>
            <div className="dialog__input-row">
              <div>
                {'帳目名稱:'}
              </div>
              <div>
                <input type="text" value={this.state.name} onChange={this.handleNameOnChange} />
              </div>
            </div>
            <div className="dialog__input-row">
              <div>
                {'金額:'}
              </div>
              <div>
                <input type="number" min={1} value={this.state.number} onChange={this.handleNumberOnChange}/>
              </div>
            </div>
            <div className="dialog__input-row">
              <div>
                {'類型:'}
              </div>
              <div>
                <select name="type" value={this.state.type} onChange={this.handleTypeOnchange}>
                  <option value="1">收入</option>
                  <option value="2">食</option>
                  <option value="3">衣</option>
                  <option value="4">住</option>
                  <option value="5">行</option>
                  <option value="6">娛樂</option>
                </select>
              </div>
            </div>
            <div className="button button--lightblue noselect" onClick={this.handleClickAddItem}>
              <i className="fas fa-plus"></i>
              <span className="button__name">{'新增'}</span>
            </div>
            <div className="button noselect" onClick={this.handleClickCancel}>
              <i className="fas fa-trash"></i>
              <span className="button__name">{'取消'}</span>
            </div>
          </form>
        </div>
      );
    }

    return null;
  }
}

AddItemDialog.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default AddItemDialog;