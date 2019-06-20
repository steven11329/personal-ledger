import React from 'react';
import PropTypes from 'prop-types';

import './css/ChargeTypeFilter.scss';

class ChargeTypeFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckedArray: [true, true, true, true, true, true, true],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { isCheckedArray } = this.state;
    let tempIsCheckedArray = isCheckedArray.map((c) => c);
    switch (event.target.name) {
      case 'charge-type-all':
        if (tempIsCheckedArray[0]) {
          tempIsCheckedArray = tempIsCheckedArray.map(() => false);
        } else {
          tempIsCheckedArray = tempIsCheckedArray.map(() => true);
        }
        break;
      case 'charge-type-1':
        tempIsCheckedArray[1] = !tempIsCheckedArray[1];
        break;
      case 'charge-type-2':
        tempIsCheckedArray[2] = !tempIsCheckedArray[2];
        break;
      case 'charge-type-3':
        tempIsCheckedArray[3] = !tempIsCheckedArray[3];
        break;
      case 'charge-type-4':
        tempIsCheckedArray[4] = !tempIsCheckedArray[4];
        break;
      case 'charge-type-5':
        tempIsCheckedArray[5] = !tempIsCheckedArray[5];
        break;
      case 'charge-type-6':
        tempIsCheckedArray[6] = !tempIsCheckedArray[6];
        break;
    }

    let isAllChecked = true;
    for (let i = 1; i < tempIsCheckedArray.length; i++) {
      if (tempIsCheckedArray[i] === false) {
        isAllChecked = false;
        break;
      } else {
        continue;
      }
    }
    
    tempIsCheckedArray[0] = isAllChecked;

    this.setState({
      isCheckedArray: tempIsCheckedArray,
    });

    this.props.onChange(tempIsCheckedArray.slice(1));
  }

  render() {
    const { isCheckedArray } = this.state;
    return (
      <div
        className="charge-type-filter"
        onChange={this.handleChange}
      >
        <label htmlFor="charge-type-all">
          <input
            type="checkbox"
            name="charge-type-all"
            id="charge-type-all"
            checked={isCheckedArray[0]}
            readOnly
          />
          全部
        </label>
        <label htmlFor="charge-type-1">
          <input
            type="checkbox"
            name="charge-type-1"
            id="charge-type-1"
            checked={isCheckedArray[1]}
            readOnly
          />
          收入
        </label>
        <label htmlFor="charge-type-2">
          <input
            type="checkbox"
            name="charge-type-2"
            id="charge-type-2"
            checked={isCheckedArray[2]}
            readOnly
          />
          食
        </label>
        <label htmlFor="charge-type-3">
          <input
            type="checkbox"
            name="charge-type-3"
            id="charge-type-3"
            checked={isCheckedArray[3]}
            readOnly
          />
          衣
        </label>
        <label htmlFor="charge-type-4">
          <input
            type="checkbox"
            name="charge-type-4"
            id="charge-type-4"
            checked={isCheckedArray[4]}
            readOnly
          />
          住
        </label>
        <label htmlFor="charge-type-5">
          <input
            type="checkbox"
            name="charge-type-5"
            id="charge-type-5"
            checked={isCheckedArray[5]}
            readOnly
          />
          行
        </label>
        <label htmlFor="charge-type-6">
          <input
            type="checkbox"
            name="charge-type-6"
            id="charge-type-6"
            checked={isCheckedArray[6]}
            readOnly
          />
          娛樂
        </label>
      </div>
    )
  }
}

ChargeTypeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default ChargeTypeFilter;