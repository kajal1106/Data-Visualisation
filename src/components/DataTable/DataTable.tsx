import React, { useState } from "react";
import { PredictedData } from "../../types/base.types";
import IconRefresh from "../Icon/IconRefresh";
import IconUp from "../Icon/IconUp";
import './DataTable.scss'

type DataTableProps = {
  predictionData?: PredictedData[],
  updateData?: (arg0 : PredictedData[]) => void,
  refreshFilterData?: () => void
}
const DataTable : React.FC<DataTableProps> = props => {
  const [sortValue, setSortedValue] = useState('');
  const [sortMetric, setSortMetric] = useState('');

  const sortMetrics = () => {
    const currentData = [...props.predictionData];
    let sortedData : PredictedData[] = [];
    if(sortMetric === 'asc' || sortMetric === '') {
    sortedData = currentData?.sort((a, b) => (
      (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
    ));
    setSortMetric('desc');
    }
    else if(sortMetric === 'desc') {
      sortedData = currentData?.sort((a, b) => (
        (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)
      ));
      setSortMetric('asc');
    }
    props.updateData!(sortedData!);
  }
  const sortValues = () => {
    const currentData = [...props.predictionData];
    let sortedData : PredictedData[] = [];
    if(sortValue === 'asc' || sortValue === '') {
    sortedData = currentData?.sort((a, b) => (
      (a.values[a.values.length - 1] > b.values[b.values.length - 1]) ? 1 : ((b.values[b.values.length - 1] > a.values[a.values.length - 1]) ? -1 : 0)
    ));
    setSortedValue('desc');
    }
    else if(sortValue === 'desc') {
      sortedData = currentData?.sort((a, b) => (
        (a.values[a.values.length - 1] < b.values[b.values.length - 1]) ? 1 : ((b.values[b.values.length - 1] < a.values[a.values.length - 1]) ? -1 : 0)
      ));
      setSortedValue('asc');
    }
    props.updateData!(sortedData!);
  };

  const handleOnChange = (id:number) => {
    let newArray = props.predictionData?.map((dataSample : PredictedData) => 
      dataSample.id === id ? {...dataSample, checked: !dataSample.checked} : dataSample
    );
    props.updateData!(newArray!);
  };
  return (
    <div className="DataTable">
      <table>
        <thead>
          <tr>
            <th className="Filter">Filter to view graph
              <button onClick={props.refreshFilterData}>
                <IconRefresh className="IconRefresh"/>
              </button>
            </th>
            <th className="SortMetric">
              <button onClick={sortMetrics}>Metric<IconUp className={
                sortMetric === '' ? 'IconUp' : 
                sortMetric === 'asc' ? 'IconDown' : 
                sortMetric === 'desc' ? 'IconUp' : 
                ''} />
              </button>
            </th>
            <th className="SortValue">
              <button onClick={sortValues}>Value<IconUp className={
                sortValue === '' ? 'IconUp' : 
                sortValue === 'asc' ? 'IconDown' : 
                sortValue === 'desc' ? 'IconUp' : 
                ''} /></button>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.predictionData?.map((dataSample :PredictedData , index:any) =>  
           dataSample.values[dataSample.times.length - 1] !== 0  &&
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
  );

}

export default DataTable;