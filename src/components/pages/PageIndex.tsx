import React, { useState } from "react";
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
  const [filteredData, setFilteredData] = useState<PredictedData[]>(props.predictionData!);
  const updateDataSamples = (changedDataSamples : PredictedData[]) => {
    setFilteredData(changedDataSamples);
  }
  return ( <>
    <div className="PageIndex">
      <AppNavBar/>
      <PageContent>
        <DataTable predictionData={filteredData} updateData={updateDataSamples}/>
        <GraphChart predictionData={filteredData}/>
      </PageContent>
    </div>
    </>
  );
}
export default PageIndex;