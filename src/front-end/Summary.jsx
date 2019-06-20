import React from 'react';
import { Link } from 'react-router-dom';
import currency from 'currency.js';

import './css/Summary.scss';

class Summary extends React.PureComponent {
  render() {
    const { prefix, income, charge } = this.props;
    return (
      <div className="summary">
        <div className="summary-title">
          {prefix}
        </div>
        <div className="summary-content">
          <div className="summary-income-block">
            <strong>{`收入`}</strong>
            <div className="income">{currency(income, { precision: 0 }).format()}</div>
          </div>
          <div className="summary-charge-block">
            <strong>{`花費`}</strong>
            <div className="charge">{currency(charge, { precision: 0 }).format()}</div>
          </div>
          <div className="summary-balance-block">
            <strong>{`結餘`}</strong>
            <div className={(income - charge) >= 0 ? null : 'balance--negative'}>{currency(income - charge, { precision: 0 }).format()}</div>
          </div>
        </div>
      </div>
    );
  }
}

Summary.defaultProps = {
  prefix: '本日',
  income: 0,
  charge: 0,
}

export default Summary;