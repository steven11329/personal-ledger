import React from 'react';

import './css/MonthsChart.scss';

class ChargeTypesPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartDOM = null;
    this.chart = null;
    this.drawChart = this.drawChart.bind(this);
  }

  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.props.data;
      this.chart.update();
    }
  }

  render() {
    return (
      <div className="chart-panel">
        <canvas width="480" height="270" className="charge-type-pie-chart" ref={(el) => { this.chartDOM = el; }}></canvas>
      </div>
    );
  }

  drawChart() {
    let ctx = this.chartDOM;
    let data = {
      labels: ['食', '衣', '住', '行', '娛樂'],
      datasets: [{
        data: this.props.data,
        backgroundColor: ['pink', 'orange', 'rgb(202, 202, 0)', 'lightgreen', 'lightblue'],
      },
      ],
    }

    let options = {
      title: {
        display: true,
        text: "2019 年度支出類型占比"
      },
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map(data => {
              sum += data;
            });
            let percentage = parseInt((value * 100 / sum)) + "%";
            return percentage;
          },
          color: 'black',
        }
      }
    }

    import(/* webpackChunkName: "chartjs" */ 'chart.js').then(({ default: ChartJS }) => {
      ChartJS.defaults.global.defaultFontFamily = `'Noto Sans TC', 'Microsoft JhengHei', sans-serif`;
      import(/* webpackChunkName: "chartjs-plugin-datalabels" */ 'chartjs-plugin-datalabels').then(({ default: ChartDataLabels }) => {
        ChartJS.plugins.unregister(ChartDataLabels);
        this.chart = new ChartJS(ctx,
          {
            type: 'pie',
            data,
            plugins: [ChartDataLabels],
            options,
          }
        );
      });
    });
  }
}

ChargeTypesPieChart.defaultProps = {
  data: [0, 0, 0, 0, 0],
}

export default ChargeTypesPieChart;