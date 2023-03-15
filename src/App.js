import { useEffect, useState } from 'react';
import logo from './prices-eth.svg';
import { Button, ButtonGroup, Container } from 'react-bootstrap';
import ProgressBar from './ProgressBar';
import MyStockChart from './EthChart';
import ChartHelper from './chartHelper';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
const testDat = { bgcolor: "#6a1b9a", completed: 60 };

function App() {
  const [difficulty, setDifficulty] = useState(0);
  const [rawData, setRaw] = useState({})
  const [gas, setGas] = useState(0);
  const [mineFee, setMineFee] = useState(0);

  const [graphTitle, setGraphTitle] = useState("Latest Trends");
  const [graphData, setGraphData] = useState([197, 94, 400, 207]);

  const url = 'https://api.glassnode.com/v1/metrics/mining/difficulty_latest?a=ETH&api_key=' + API_KEY;
  
  const parameters = {
    method: 'GET',
    headers: {
      'Access-Control-Allow-Origin': true,
      'crossorigin':true,
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'POST, GET , DELETE , PUT , OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'x-api-key': API_KEY
    },
    mode: 'cors',
}

let newData = []

  const getDifficulty = (formData) =>{
    fetch('http://127.0.0.1:3000/difficulty', parameters)
    .then(response => {
      return response.json();
    })
    .then((data) => {
        setDifficulty(data[5].t);
        setRaw(data)
      })
      .catch((err) => {console.error(err)})
  }

  const getGasFee = () => {
    fetch('http://127.0.0.1:3000/gas', parameters)
    .then(response => {
        return response.json();
      }).then((data) => {
          setGas(data[0].t)
          setRaw(data)
        })
      .catch((err) => {console.error(err)})
  }
  
  const getMinerFee = (formData) => {
    fetch('http://127.0.0.1:3000/fee', parameters)
    .then(response => {
      return response.json();
    }).then((data) => {
        setMineFee(data[1].t);
        setRaw(data)
      })
      .catch((err) => {console.error(err)})
  }

  const setDataStream = () => {
    fetch('http://127.0.0.1:3000/RetrieveBlockchainInfo', parameters).then((response) => {
      return response.json();
    }).then((data) => {
      setRaw(data);
      console.log(data);
    })
  }

  const calculateSevenDayAverage = (averageData) => {
      let average = Math.round(averageData / 7) / 10000000 + Math.floor(Math.random() * 100)//Object.entries(averageData).filter(numb => numb / 2 == 0)//.map(([t, v]) => [t, (v + v) / 7]);
      return average;
  }

  const calculatePercentage = (averageData) => {
    let average = Math.round(Math.floor(averageData / 7))//Object.entries(averageData).filter(numb => numb / 2 == 0)//.map(([t, v]) => [t, (v + v) / 7]);
    return average;
  }

  const cleanUpData = (newTitle, dataStream) => {
      let editedList = dataStream.slice(0, 10);
      newData = [];
      setGraphTitle(newTitle);

      editedList.forEach((element) => { newData.push(Math.floor(Math.round(element.t) / 10000000) + Math.floor(Math.random() * 100))})//x: element.t, y: element.v})})  
      console.log(newData);
      setGraphData(newData);
      //return newData;
    }

  useEffect(() => {
    setDataStream();
    //cleanUpData(rawData.gas);
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <b><code>
          Clicktool
        </code></b>
        <a
          className="App-link"
          href="https://glassnode.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Glassnode
        </a>
      </header>
      <br/>
      <body>
      <nav>
        <ChartHelper onClicked={() => {cleanUpData("Difficulty", rawData.difficulty)}} title={"Difficulty"} barBg={`${"#868AF8"}`} workText={`${difficulty / 10000000 + Math.floor(Math.random() * 100) }q Hashes`} workAverage={`${calculateSevenDayAverage(difficulty)} Hashes (7 Day Avg)`} barPercent={`${calculatePercentage(Math.floor(difficulty))}`}/>
        <ChartHelper onClicked={() => {cleanUpData("Gwei Prices", rawData.gas)}} title={"Gas Fee"} barBg={`${"#D2646D"}`} workText={`${gas / 10000000 + Math.floor(Math.random() * 100)}♦`} workAverage={`${calculateSevenDayAverage(difficulty)} Gwei (7 Day Avg)`} barPercent={`${calculatePercentage(Math.round(gas))}`}/>
        <ChartHelper onClicked={() => {cleanUpData("Mining Fee", rawData.minerFee)}} title={"Miner Fee"} barBg={`${"#F3B08C"}`} workText={`${mineFee / 10000000 + Math.floor(Math.random() * 100)}♢`} workAverage={`${calculateSevenDayAverage(difficulty)} Tip (7 Day Avg)`} barPercent={`${calculatePercentage(mineFee)}`}/>
      </nav>
      <MyStockChart titleText={graphTitle} dataSet={graphData}/>
      </body>
    </div>
  );
}

export default App;
