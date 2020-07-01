interface seriesLineConfig {
  name: string,
  type: "line",
  smooth?: true,
  itemStyle?: {
    normal: {
      areaStyle: Object
    }
  },
  areaStyle?: {
    normal: {}
  },
  data: any[]
}
interface seriesPieConfig {
  value: string | number,
  name: string
}

export interface lineOption {
  color: string[], 
  magicType? : object,
  legendLeft?: number | string,
  legendTop?: number | string,
  legendRight? : number | string,
  legendData: string[],
  fontSize? : string | number,
  xAxisData: any[],
  seriesData: seriesLineConfig[]
}

export interface pieOption {
  name?: string,
  legendData: string[],
  seriesRadius?: any[],
  seriesData: seriesPieConfig[]
}