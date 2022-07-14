// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const RadarDefaultSourceData = [
    { MatchaLatte: 85, MilkTea: 72.4, CheeseCocoa: 53.9, WalnutBrownie: 39.1, name: "2015"},
    { MatchaLatte: 90, MilkTea: 54, CheeseCocoa: 30.9, WalnutBrownie: 80.1  , name: "2016"},
  ];
  
  // 默认的图表配置数据
  export const RadarDefaultOptionsData = {
    backGround: {
      color: "#000000"
    },
    chartStyle:{
      shape: "polygon",
      area: {
        isShow: false,
        opacity: 0.5,
      }
    },
    title: {
      show: true,
      text: "Radar",
      font: {
        color: "#FFFFFF",
        size: "10",
        family: "sans-serif",
      },
      position: "top-left",
    },
    radar:{
      shape: 'polygon',
      axisName: {
        font: {
          color: "#FFFFFF",
          size: "10",
          family: "sans-serif",
        }
      },
      axisMax: 100,
      axisMin: 0,
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
  