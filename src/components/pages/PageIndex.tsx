import { ConsoleIcon } from "evergreen-ui";
import React, { useEffect, useState } from "react";
import { PredictedData } from "../../types/base.types";
import AppNavBar from "../AppNavBar/AppNavBar";
import DataTable from "../DataTable/DataTable";
import GraphChart from "../GraphChart/GraphChart";
import PageContent from "../PageContent/PageContent";
import './PageIndex.scss';

type PageReportIndexProps = {
  predictionData?: any
}

const PageIndex : React.FC<PageReportIndexProps> = props =>{
  const [originalData, setData] = useState<PredictedData[]>();
  const [filteredData, setFilteredData] = useState<PredictedData[]>(props.predictionData!);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(()=>{
      fetchData().then(() => {
        return;
      })}, 1500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const fetchData = async() => {
    const response = await fetch("/express_backend");
    let id = 1;
    await response.json()
    .then(data => {
      const dataSamples : PredictedData[] = [];
      const allData = data.current.data.HDT1;
      for (let key in data.current.data.HDT1) {
        if(typeof(allData[key].values) === 'object') {
          dataSamples.push({
            id: id,
            name: key,
            times: allData[key].times,
            values: allData[key].values,
            checked: false
          });
          id++;
        }
      }
      setData(dataSamples);
      setFilteredData(dataSamples);
      setLoading(false);
    });
  };

  const updateDataSamples = (changedDataSamples : PredictedData[]) => {
    setFilteredData(changedDataSamples);
  }
  const refreshFilterData = () => {
    setFilteredData(originalData);
  }

  return ( <>
    <div className="PageIndex">
      <AppNavBar/>
      {isLoading && <div className="loading"><div></div></div>}
      {!isLoading &&
      <PageContent>
        <DataTable predictionData={filteredData} updateData={updateDataSamples} refreshFilterData={refreshFilterData}/>
        <GraphChart predictionData={filteredData}/>
      </PageContent>
}
    </div>
    </>
  );
}
export default PageIndex;