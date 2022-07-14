// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const ScatterDefaultSourceData = [  
  [
    [10.0, 8.04, 15],
    [8.07, 6.95, 25 ],
    [13.0, 7.58, 20 ],
    [9.05, 8.81, 30 ],
    [11.0, 8.33, 20 ],
    [14.0, 7.66, 24 ],
    [13.4, 6.81, 20 ],
    [10.0, 6.33, 20 ],
    [14.0, 8.96, 20 ],
    [12.5, 6.82, 50 ],
    [9.15, 7.2 , 20 ],
    [11.5, 7.2 , 60 ],
    [3.03, 4.23, 20 ],
    [12.2, 7.83, 20 ],
    [2.02, 4.47, 20 ],
    [12.0, 8.84, 20 ],
  ],
  [

    [15, 18.04, 15  ],
    [9.07, 8.95, 25 ],
    [5.0, 7.58, 20  ],
    [10.05, 5.81, 30],
    [11.0, 8.33, 20 ],
    [13.0, 13, 24   ],
    [10.4, 8.81, 20 ],
    [1.0, 6.33, 20  ],
    [4.0, 8.96, 20  ],
    [2.5, 6.82, 50  ],
  ]

 
];

// 默认的图表配置数据
export const ScatterDefaultOptionsData = {
  backGround: {
    color: "#000000"
  },
  chartStyle: {
    visualMap:{
 
      min:10,
      max:70,
      // symbolSizeMin : 10,
      // symbolSizeMax : 70,
    
    }
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
