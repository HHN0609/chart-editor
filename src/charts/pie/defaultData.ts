// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const PieDefaultSourceData = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' }
  ];
  
  // 默认的图表配置数据
  export const PieDefaultOptionsData = {
    backGround: {
      color: "#000000"
    },
    chartStyle:{
      isDoughnut: false,
      radiusmin:"0",
      radiusmax:"70",
    },
    title: {
      show: true,
      text: "Pie",
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
    // xAxis: {
    //   show: true,
    //   type: "category",
    //   lineType: "solid",
    //   lineColor: "#FFFFFF",
    //   lineWidth: 1,
  
    //   name: "",
    //   nameFont: {
    //     color: "#FFFFFF",
    //     size: "10",
    //     family: "sans-serif",
    //   },
  
    //   labelFont: {
    //     color: "#FFFFFF",
    //     size: "10",
    //     family: "sans-serif",
    //   },
    // },
    // yAxis: {
    //   show: true,
    //   type: "value",
    //   lineType: "solid",
    //   lineColor: "#FFFFFF",
    //   lineWidth: 1,
  
    //   name: "",
    //   nameFont: {
    //     color: "#FFFFFF",
    //     size: "10",
    //     family: "sans-serif",
    //   },
  
    //   labelFont: {
    //     color: "#FFFFFF",
    //     size: "10",
    //     family: "sans-serif",
    //   },
    // },
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
  