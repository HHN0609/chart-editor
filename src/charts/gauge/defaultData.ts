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
      progress: {
          show: true,
          color: "#FF0000FF"
      },
      detail: {
        valueAnimation: true,
        formatter: '{value}',
        font:{
          color: '#67e0e3',
          Size: "20",
          fontFamily: "sans-serif",
        }
      },
      axisTick:{
        distance:-30,
        color:'#fff',

      },
      splitLine:{
        distance:-30,
        color:'#000000',
      },
      axisLine:{
        color:'#67e0e3',
      },
      axisLabel:{
        distance: 30,
        font:{
          color: "#FFFFFF",
          size: "10",
          family: "sans-serif",
        }
      },
      title:{
        font:{
          color: '#67e0e3',
          Size: "20",
          fontFamily: "sans-serif",
        }
       
      },
     

      radius: 100,
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
    range: {
      min: 0,
      max: 100,
      angle: 270,
    },
    pointer: {
      show: true,
      length: 50,
      width: 6,
      color: "#FF0000"
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
  