import React from 'react';
import currency from 'currency.js';

import './css/MonthsChart.scss';

import ChartJS from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

class MonthsChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartDOM = null;
    this.chart = null;
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidUpdate() {
    this.chart.data.datasets[0].data = this.props.incomes;
    this.chart.data.datasets[1].data = this.props.charges;
    this.chart.update();
  }

  componentDidMount() {
    this.drawChart();
  }

  render() {
    return (
      <div className="chart-panel">
        <canvas width="480" height="270" className="months-chart" ref={(el) => { this.chartDOM = el; }}></canvas>
      </div>
    );
  }

  drawChart() {
    ChartJS.plugins.unregister(ChartDataLabels);
    let ctx = this.chartDOM;
    let data = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [
        {
          label: '收入',
          backgroundColor: 'lightgreen',
          borderWidth: 1,
          data: this.props.incomes
        },
        {
          label: '支出',
          backgroundColor: 'pink',
          borderWidth: 1,
          data: this.props.charges
        }
      ]
    }

    let options = {
      title: {
        display: true,
        text: "2019 年度收支"
      },
      scales: {
        xAxes: [{
          ticks: {
            callback: function (value, index, values) {
              return value + '月';
            }
          }
        }],
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: '元'
          },
          ticks: {
            callback: (value) => currency(value, { precision: 0 }).format(),
          }
        }]
      }
    }

    ChartJS.defaults.global.defaultFontFamily = `'Noto Sans TC', 'Microsoft JhengHei', sans-serif`;

    this.chart = new ChartJS(ctx,
      {
        type: 'bar',
        data,
        options,
      }
    );
  }
}

export default MonthsChart;