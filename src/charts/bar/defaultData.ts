// 下面数据都是新增图表时候的默认数据

// 默认的数据源
export const BarDefaultSourceData = [
  { product: "Matcha Latte", "2015": 43.3, "2016": 85.8, "2017": 93.7 },
  { product: "Milk Tea", "2015": 83.1, "2016": 73.4, "2017": 55.1 },
  { product: "Cheese Cocoa", "2015": 86.4, "2016": 65.2, "2017": 82.5 },
  { product: "Walnut Brownie", "2015": 72.4, "2016": 53.9, "2017": 49.1 },
];

// 默认的图表配置数据
export const BarDefaultOptionsData = {
  backGround: {
    color: "#000000"
  },
  chartStyle: {
    orientation: "horizontal",
    isStack: true,
  },
  title: {
    show: true,
    text: "Bar",
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
    // type: "category",
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
    // type: "value",
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
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
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
