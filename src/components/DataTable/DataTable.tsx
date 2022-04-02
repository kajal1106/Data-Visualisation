import React from "react";
import { PredictedData } from "../../types/base.types";
import './DataTable.scss'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
type DataTableProps = {
  predictionData?: PredictedData[],
  updateData?: (arg0 : PredictedData[]) => void
}
const DataTable : React.FC<DataTableProps> = props => {
  const handleOnChange = (id:number) => {
    let newArray = props.predictionData?.map((dataSample : PredictedData) => 
      dataSample.id === id ? {...dataSample, checked: !dataSample.checked} : dataSample
    );
    props.updateData!(newArray!);
  };
  return (
    <>
    <div className="DataTable">
      <table>
        <thead>
          <tr>
            <th>Filter to view graph</th>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {props.predictionData?.map((dataSample :PredictedData , index:any) =>  
            <tr key={index}>
              <td>
              <input
                type="checkbox"
                checked={dataSample.checked}
                onChange={() => handleOnChange(dataSample.id)}
              />
              </td>
              <td className="MetricColumn">
                {dataSample.name}
              </td>
              <td>
                {dataSample.values[dataSample.times.length - 1]}
              </td>
            </tr>
          )}
        </tbody>
      </table>     
    </div>
     </>
  );

}

export default DataTable;