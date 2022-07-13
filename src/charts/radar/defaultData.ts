// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const RadarDefaultSourceData = [

    {'Matcha Latte': 85,'Milk Tea': 72.4, 'Cheese Cocoa': 53.9, 'Walnut Brownie': 39.1},
    {'Matcha Latte': 90,'Milk Tea': 54, 'Cheese Cocoa': 30.9, 'Walnut Brownie': 80.1},

  ];
  
  // 默认的图表配置数据
  export const RadarDefaultOptionsData = {
    backGround: {
      color: "#000000"
    },
    chartStyle:{

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
    radar:{
      shape: 'polygon',
      indicator: [
        { name: 'Matcha Latte', max: 100 },
        { name:'Milk Tea', max: 100 },
        { name: 'Cheese Cocoa', max: 100 },
        { name:'Walnut Brownie', max: 100 }
       
      ]
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
    seriesLabel: {
      show: true,
      position: "inner",
      font: {
        color: "#FFFFFF",
        size: "10",
        family: "sans-serif",
      },
    },
    seriesLabelLine:{
      show:false,
      length: 35,
      length2: 10,
      maxSurfaceAngle: 90
    }
  };
  