export interface CandleStickSeries {
  name: string | null,
  data: Array<CandleStickData>
}

export interface CandleStickData {
  x: string,
  y: number[]
}

export interface LineSeries {
  name: string | null,
  data: Array<LineChartData>
}

export interface LineChartData {
  x: string,
  y: number
}
