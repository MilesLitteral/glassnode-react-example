import React, { Component, useEffect} from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

//turn this into a React Component
function MyStockChart(props){
  const {titleText, dataSet} = props;

  const options = {
    title: {
      text: titleText
    },
    series: [{
      data: dataSet
    }]
  }

  //useEffect(console.log(dataSet),[])

return(<HighchartsReact
    highcharts={Highcharts}
    constructorType={'stockChart'}
    options={options}
    />)
}

export default MyStockChart