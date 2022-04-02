import { useEffect, useState } from 'react';
import './App.scss';
import PageIndex from './components/pages/PageIndex';
import { PredictedData } from './types/base.types';

function App () {

  const [data, setData] = useState<PredictedData[]>();

  useEffect(() => {
    fetchData().then(() => {
      return;
    });
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
    });
  };

    return (
      <div className="App">
        {data &&  <PageIndex predictionData={data}/>}
      </div>
    );
}

export default App;
