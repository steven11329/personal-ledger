import React from 'react';

import './css/Main.scss';

import Summary from './Summary';
import MonthsChart from './MonthsChart';
import ChargeTypesPieChart from './ChargeTypesPieChart';
import {
  openDB,
  getItemsByYear,
  getItemsToday,
} from './Database';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      incomes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      charges: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      incomeToday: 0,
      chargeToday: 0,
      chargeByTypeYear: [0, 0, 0, 0, 0],
    }
  }
  componentDidMount() {
    openDB().then(() => {
      let incomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let charges = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      let incomeToday = 0;
      let chargeToday = 0;
      let chargeByTypeYear = [0, 0, 0, 0, 0];

      getItemsByYear().then((items) => {
        items.forEach(item => {
          if (item.type === 1) {
            incomes[item.createDate.getMonth()] += item.number;
          } else {
            charges[item.createDate.getMonth()] += item.number;
            chargeByTypeYear[item.type - 2] += item.number;
          }
        });
        this.setState({
          incomes,
          charges,
          chargeByTypeYear,
        });
      });

      getItemsToday().then((items) => {
        items.forEach(item => {
          if (item.type === 1) {
            incomeToday += item.number;
          } else {
            chargeToday += item.number;
          }
        });
        this.setState({
          incomeToday,
          chargeToday,
        });
      });
    });
  }

  render() {
    const {
      incomes,
      charges,
      incomeToday,
      chargeToday,
      chargeByTypeYear,
    } = this.state;

    const sumOfIncome = incomes.reduce((preValue, currValue) => preValue += currValue, 0);
    const sumOfCharge = charges.reduce((preValue, currValue) => preValue += currValue, 0);

    const currentMonthIndex = new Date().getMonth();
    return (
      <>
        <Summary prefix='今年' income={sumOfIncome} charge={sumOfCharge} />
        <Summary prefix='本月' income={incomes[currentMonthIndex]} charge={charges[currentMonthIndex]} />
        <Summary prefix='本日' income={incomeToday} charge={chargeToday} />
        <MonthsChart incomes={incomes} charges={charges} />
        <ChargeTypesPieChart data={chargeByTypeYear}/>
      </>
    );
  }
}

export default Main;