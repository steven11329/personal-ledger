import React from 'react';
import currency from 'currency.js';

import ChargeTypeFilter from './ChargeTypeFilter';
import DateFilter from './DateFilter';
import AddItemDialog from './AddItemDialog';

import {
  openDB,
  getItemsByDate,
  getItemTypesMap,
} from './Database';

import "react-datepicker/dist/react-datepicker.css";
import './css/Record.scss';

class Record extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const nextMonthFirstDay = new Date(`${today.getFullYear()}/${(today.getMonth() + 1) % 12 + 1}/01`);
    this.state = {
      startDate: new Date(`${today.getFullYear()}/${today.getMonth() + 1}/01`),
      endDate: new Date(nextMonthFirstDay.getTime() - 1),
      itemTypesMap: new Map(),
      items: [],
      isSearching: false,
      filterSign: [true, true, true, true, true, true],
      isShowAddItemDialog: false,
    }
    this.handleDateFilterChange = this.handleDateFilterChange.bind(this);
    this.handleChargeTypeFilterChange = this.handleChargeTypeFilterChange.bind(this);
    this.typeFilter = this.typeFilter.bind(this);
    this.creatDataRow = this.creatDataRow.bind(this);
    this.handleClickSearch = this.handleClickSearch.bind(this);
    this.handleClickOpenAddItemDialog = this.handleClickOpenAddItemDialog.bind(this);
    this.handleClickCloseAddItemDialog = this.handleClickCloseAddItemDialog.bind(this);
    this.handleAddItemOnchange = this.handleAddItemOnchange.bind(this);
  }

  handleDateFilterChange(dateObj) {
    this.setState({
      startDate: dateObj.startDate,
      endDate: dateObj.endDate,
    });
  }

  handleChargeTypeFilterChange(isCheckedArray) {
    this.setState({
      filterSign: isCheckedArray,
    });
  }

  handleClickSearch() {
    this.setState({
      isSearching: true,
    });
  }

  handleClickOpenAddItemDialog() {
    this.setState({
      isShowAddItemDialog: true,
    });
  }

  handleClickCloseAddItemDialog() {
    this.setState({
      isShowAddItemDialog: false,
    });
  }

  componentDidUpdate() {
    const { startDate, endDate, isSearching } = this.state;
    if (isSearching) {
      getItemsByDate(startDate, endDate).then((items) => {
        this.setState({
          items: this.typeFilter(items),
          isSearching: false
        });
      });
    }
  }

  componentDidMount() {
    const { startDate, endDate } = this.state;
    openDB().then(() => {
      getItemTypesMap().then((itemTypesMap) => {
        getItemsByDate(startDate, endDate).then((items) => {
          this.setState({
            itemTypesMap,
            items,
          });
        });
      });
    });
  }

  typeFilter(items) {
    const { filterSign } = this.state;
    return items.filter((item) => filterSign[item.type - 1]);
  }

  handleAddItemOnchange() {
    this.setState({
      isSearching: true,
    });
  }

  creatDataRow() {
    const { itemTypesMap, items } = this.state;
    if (items.length === 0) {
      return (
        <tr>
          <td colSpan={4} style={{ textAlign: "center" }}>尚無資料</td>
        </tr>
      );
    }
    return items.map((item, i) => {
      const type = itemTypesMap.get(item.type);
      let labelStyle = '';
      let icon = null;
      let money = (item.type === 1) ? item.number : item.number * -1;
      switch (item.type) {
        case 1:
          labelStyle = 'income';
          icon = <i className="fas fa-dollar-sign"></i>
          break;
        case 2:
          labelStyle = 'food';
          icon = <i className="fas fa-hamburger"></i>
          break;
        case 3:
          labelStyle = 'clothes';
          icon = <i className="fas fa-tshirt"></i>
          break;
        case 4:
          labelStyle = 'residence';
          icon = <i className="fas fa-home"></i>
          break;
        case 5:
          labelStyle = 'traffic';
          icon = <i className="fas fa-car"></i>
          break;
        case 6:
          labelStyle = 'entertainments';
          icon = <i className="fas fa-laugh-beam"></i>
          break;
      }
      return (
        <tr key={`data-row-${i}`}>
          <td className="ledger-table__date-data">{item.createDate.toLocaleDateString()}</td>
          <td className="ledger-table__name-data">{item.name}</td>
          <td className="ledger-table__money-data">{currency(money, { precision: 0 }).format()}</td>
          <td className="ledger-table__type-data">
            <div className={`ledger-table__label ${labelStyle}`}>
              {icon} {type}
            </div>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { isShowAddItemDialog } = this.state;
    return (
      <>
        <div className="ledger-filter">
          <DateFilter onChange={this.handleDateFilterChange} />
          <ChargeTypeFilter onChange={this.handleChargeTypeFilterChange} />
          <div className="button button--lightgreen noselect" onClick={this.handleClickSearch}>
            <i className="fas fa-search"></i>
            <span className="button__name">{'搜尋'}</span>
          </div>
          <div className="button button--lightblue noselect" onClick={this.handleClickOpenAddItemDialog}>
            <i className="fas fa-plus"></i>
            <span className="ledger-filter__button__name">{'新增'}</span>
          </div>
        </div>
        <div className="ledger-table">
          <table>
            <thead>
              <tr>
                <th className="ledger-table__date-header">日期</th>
                <th className="ledger-table__name-header">帳目名稱</th>
                <th className="ledger-table__money-header">金額</th>
                <th className="ledger-table__type-header">類型</th>
              </tr>
            </thead>
            <tbody>
              {this.creatDataRow()}
            </tbody>
          </table>
        </div>
        <AddItemDialog
          show={isShowAddItemDialog}
          onCancel={this.handleClickCloseAddItemDialog}
          onChange={this.handleAddItemOnchange}
        />
      </>
    );
  }
}

export default Record;