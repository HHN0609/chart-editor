// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const BasicScatterDefaultSourceData = [  
  [
    [10.0, 8.04],
    [8.07, 6.95],
    [13.0, 7.58],
    [9.05, 8.81],
    [11.0, 8.33],
    [14.0, 7.66],
    [13.4, 6.81],
    [10.0, 6.33],
    [14.0, 8.96],
    [12.5, 6.82],
    [9.15, 7.2 ],
    [11.5, 7.2 ],
    [3.03, 4.23],
    [12.2, 7.83],
    [12.0, 8.84],
    [2.02, 4.47],
  ],
  [

    [15, 18.04],
    [9.07, 8.95],
    [5.0, 7.58],
    [10.05, 5.81],
    [11.0, 8.33],
    [13.0, 13],
    [10.4, 8.81],
    [1.0, 6.33],
    [4.0, 8.96],
    [2.5, 6.82],
  ]

 
];

// 默认的图表配置数据
export const BasicScatterDefaultOptionsData = {
  backGround: {
    color: "#000000"
  },
  chartStyle: {
    symbolSize:10,
 
  },
  title: {
    show: true,
    text: "scatter",
    font: {
      color: "#FFFFFF",
      size: "10",
      family: "sans-serif",
    },
    position: "top-left",
  },
  legend: {
    show: true,
    orient: "horizontal",
    font: {
      color: "#FFFFFF",
      size: "10",
      family: "sans-serif",
    },
    position: "top-center",
  },
  xAxis: {
    show: true,
    type: "value",
    lineType: "solid",
    lineColor: "#FFFFFF",
    lineWidth: 1,

    name: "",
    nameFont: {
      color: "#FFFFFF",
      size: "10",
      family: "sans-serif",
    },

    labelFont: {
      color: "#FFFFFF",
      size: "10",
      family: "sans-serif",
    },
  },
  yAxis: {
    show: true,
    type: "value",
    lineType: "solid",
    lineColor: "#FFFFFF",
    lineWidth: 1,

    name: "",
    nameFont: {
      color: "#FFFFFF",
      size: "10",
      family: "sans-serif",
    },

    labelFont: {
      color: "#FFFFFF",
      size: "10",
      family: "sans-serif",
    },
  },
  grid: {
    show: false,
    borderColor: "#FFFFFF",
    borderWidth: 1,
    backgroundColor: "transparent",
  },
  
  seriesLabel: {
    show: true,
    position: "top",
    font: {
      color: "#FFFFFF",
      size: "10",
      family: "sans-serif",
    },
  },
};
