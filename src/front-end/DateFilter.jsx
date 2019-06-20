import React from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale } from "react-datepicker";
import zh_TW from 'date-fns/locale/zh-TW';

import './css/DateFilter.scss';

registerLocale('zh-TW', zh_TW);

class DateFilter extends React.Component {
  constructor(props) {
    super(props);
    const today = new Date();
    const nextMonthFirstDay = new Date(`${today.getFullYear()}/${(today.getMonth() + 1) % 12 + 1}/01`);    
    this.state = {
      startDate: new Date(`${today.getFullYear()}/${today.getMonth() + 1}/01`),
      endDate: new Date(nextMonthFirstDay.getTime() - 1),
    }
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });

    this.props.onChange({
      startDate: date,
      endDate: this.state.endDate,
    });
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });

    this.props.onChange({
      startDate: this.state.startDate,
      endDate: date,
    });
  }

  render() {
    return (
      <div className="date-filter">
        {'從:'}
        <DatePicker
          locale='zh-TW'
          dateFormat="yyyy/MM/dd"
          className="date-filter__datepicker"
          selected={this.state.startDate}
          onChange={this.handleStartDateChange}
        />
        {'到:'}
        <DatePicker
          locale='zh-TW'
          dateFormat="yyyy/MM/dd"
          className="date-filter__datepicker"
          selected={this.state.endDate}
          onChange={this.handleEndDateChange}
        />
      </div>
    );
  }
}

DateFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default DateFilter;