import React, {FunctionComponent} from "react";
import ApexChart from "react-apexcharts"
import {LineSeries} from "./types";

interface LineChartProps {
  series: LineSeries[],
  options?: object
}

const LineChart: FunctionComponent<LineChartProps> = ({series, options = {}}) => {

  const yaxis = series.map((data, index) => ({
    seriesName: data.name,
    tooltip: {
      enabled: true
    },
    opposite: index === 1
  }));

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
    yaxis: yaxis,
    legend: {
      show: true,
      position: 'top',
      onItemClick: {
        toggleDataSeries: false
      },
    },
    ...options
  };

  return <ApexChart options={mergedOptions} series={series} type="line" height={350} />;
};

export default LineChart;
