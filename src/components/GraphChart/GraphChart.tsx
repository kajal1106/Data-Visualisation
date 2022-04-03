import React from "react";
import { Line } from "react-chartjs-2";
import { PredictedData } from "../../types/base.types";
import './GraphChart.scss'
import { Chart, registerables } from 'chart.js';

type GraphChartProps = {
  predictionData?: PredictedData[]
}
const GraphChart : React.FC<GraphChartProps> = props => {
  Chart.register(...registerables); // register custom chart

  const dataSets = [];

  function getRandomColor() {
    var transparency = '0.5'; // 50% transparency
    var color = 'rgba(';
    for (var i = 0; i < 3; i++) {
      color += Math.floor(Math.random() * 255) + ',';
    }
    color += transparency + ')'; // add the transparency
    return color;
  }
  // eslint-disable-next-line array-callback-return
  props.predictionData?.map((dataSample : PredictedData) => {
    if(dataSample.values[dataSample.times.length - 1] !== 0 && dataSample.checked) {
      dataSets.push(
      {
        label: dataSample.name, 
        data: dataSample.values,
        borderWidth: 1,
        backgroundColor: getRandomColor(),
        borderColor: getRandomColor(),
        "pointStyle": "circle",
        "pointRadius": 5,
        "pointHoverRadius": 10,
        fill: true,
      });
    }
  });
  // console.log(dataSets);
  // dataset to show the data in the graph
  const sampleData = {
    labels:['0', '5', '15', '25', '35', '45', '55'],
    datasets: dataSets.length !== 0 ? dataSets : [{label:'',data:[]}]
  };
  const options: any = {
    responsive: true,
    plugins: {
      transitions: {
        show: {
          animations: {
            x: {
              from: 0
            },
            y: {
              from: 0
            }
          }
        },
        hide: {
          animations: {
            x: {
              to: 0
            },
            y: {
              to: 0
            }
          }
        }
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 35,
          fontSize: 20,
          usePointStyle: true,
        }
      },
    }
  }

  return (
    <div className="GraphChart">
      <h3>Line Chart of the metric and the value</h3>
      <Line data={sampleData} options={options}/>
    </div>
  );

}

export default GraphChart;