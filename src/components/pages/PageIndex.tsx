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
  const [originalData, setData] = useState<PredictedData[]>(); // original data from the server 
  const [filteredData, setFilteredData] = useState<PredictedData[]>(props.predictionData!);
  const [isLoading, setLoading] = useState(true); // set loading to true to show loading spinner
  const [apiRequest, setApiRequest] = useState(true); // set apiRequest to true to make api request 

  useEffect(() => {
    setTimeout(()=>{
      fetchData().then(() => {
        return;
      })}, 1500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const fetchData = async() => {
    try{
      // const response = await fetch("/getData"); // get data from api
      // switch between the response if you want to run the devServer.js locally.
      const response = await fetch("https://reference.intellisense.io/thickenernn/v1/referencia");
      let id = 1;
      await response.json() // parse response to json
      .then(data => {
        const dataSamples : PredictedData[] = []; // create array of data samples
        const allData = data.current.data.TK1; // get data from api
        for (let key in data.current.data.TK1) {
          if(typeof(allData[key].values) === 'object') { // check if data is an object
            dataSamples.push({ 
              id: id,
              name: key,
              times: allData[key].times,
              values: allData[key].values,
              checked: false
            }); // push data to dataSamples array
            id++;
          }
        }
        setData(dataSamples); 
        setFilteredData(dataSamples); 
        setLoading(false);
      });
    }
    catch(err){
      console.log('err');
      setApiRequest(false); // set apiRequest to false if there is an error
      window.alert('Unable to Retrieve the Data! Please Try Again!');
    }
  };

  const updateDataSamples = (changedDataSamples : PredictedData[]) => {
    setFilteredData(changedDataSamples); 
  }
  const refreshFilterData = () => {
    setFilteredData(originalData);
  }

  return ( <>
    <div className="PageIndex" {...!apiRequest && {"data-error" : "true"}}>
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