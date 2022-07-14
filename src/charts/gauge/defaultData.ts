// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const GaugeDefaultSourceData = [{
      value: 50,
      name: 'SCORE',
  },
  
];
  
  // 默认的图表配置数据
  export const GaugeDefaultOptionsData = {
    backGround: {
      color: "#000000"
    },
    chartStyle:{
      radius: 75,
      progress: {
          show: true
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}'
      },
    },
    title: {
      show: true,
      text: "Gauge",
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
    grid: {
      show: false,
      borderColor: "#FFFFFF",
      borderWidth: 1,
      backgroundColor: "transparent",
    },


  };
  