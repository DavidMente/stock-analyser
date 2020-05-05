import React, {FunctionComponent} from "react";
import ApexChart from "react-apexcharts"
import {CandleStickSeries} from "./types";

interface CandleStickChartProps {
  series: CandleStickSeries[],
  options?: object
}

const CandleStickChart: FunctionComponent<CandleStickChartProps> = ({series, options = {}}) => {

  const mergedOptions = {
    chart: {
      type: 'candlestick',
      height: 350,
      animations: {
        enabled: false
      }
    },
    xaxis: {
      type: 'category'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    legend: {
      show: true,
      position: 'top',
      onItemClick: {
        toggleDataSeries: false
      },
    },
    ...options
  };

  return <ApexChart options={mergedOptions} series={series} type="candlestick" height={350} />;
};

export default CandleStickChart;
