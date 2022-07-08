// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const LineDefaultSourceData = [
    { product: "Mon", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
    { product: "Tue", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
    { product: "Wed", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
    { product: "Thu", "2015": 75.6, "2016": 53.9, "2017": 49.1 },
    { product: "Fri", "2015": 79.4, "2016": 50.5, "2017": 59.1 },
    { product: "Sat", "2015": 69.5, "2016": 57.0, "2017": 69.1 },
    { product: "Sun", "2015": 50.4, "2016": 88.0, "2017": 49.1 },
    

  ];
  
  // 默认的图表配置数据
  export const LineDefaultOptionsData = {
    chartStyle: {
      orientation: "horizontal",
      isStack: true,
    },
    title: {
      show: true,
      text: "Line",
      font: {
        color: "#FFFFFF",
        size: "10",
        family: "sans-serif",
      },
    },
    legend: {
      show: true,
      orient: "horizontal",
      font: {
        color: "#FFFFFF",
        size: "10",
        family: "sans-serif",
      },
    },
    xAxis: {
      show: true,
      type: "category",
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
    seriseLabel: {
      show: true,
      position: "top",
      font: {
        color: "#FFFFFF",
        size: "10",
        family: "sans-serif",
      },
    },

   

  };
  