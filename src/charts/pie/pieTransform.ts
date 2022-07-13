import { getSacleAndDimensions } from "@/utils";
import echarts from "echarts";

// 转化自定义的options到echart的options
export default function PieTransform(customOption: any, data: any[]): echarts.EChartsOption {
  const { dimensions, scale } = getSacleAndDimensions(data);
  const options: echarts.EChartsOption = {};
  options.backgroundColor = customOption.backGround.color;
  options.color = ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'];
  options.title = {
    top: customOption.title.position.split("-")[0],
    left: customOption.title.position.split("-")[1],
    show: customOption.title.show,
    text: customOption.title.text,
    textStyle: {
      color: customOption.title.font.color,
      fontSize: customOption.title.font.size,
      fontFamily: customOption.title.font.family,
    },
  };

  options.grid = {
    show: customOption.grid.show,
    bottom: 30,
    top: 40,
    left: 30,
    right: 30,
    containLabel: true,
    borderColor: customOption.grid.borderColor,
    borderWidth: customOption.grid.borderWidth,
    backgroundColor: customOption.grid.backgroundColor,
  };

  options.legend = {
    show: customOption.legend.show,
    orient: customOption.legend.orient,
    top: customOption.legend.position.split("-")[0],
    left: customOption.legend.position.split("-")[1],
    textStyle: {
      color: customOption.legend.font.color,
      fontSize: customOption.legend.font.size,
      fontFamily: customOption.legend.font.family,
    },
  };

  options.tooltip = {};

 
  const labelOptions = {
    label: {
      show: customOption.seriseLabel.show,
      color: customOption.seriseLabel.font.color,
      fontSize: customOption.seriseLabel.font.size,
      fontFamily: customOption.seriseLabel.font.family,
      position: customOption.seriseLabel.position,
    },
  };
  
  options.series = scale.map(() => {
    const temp = { type: "pie" };
    if (customOption.chartStyle.isDoughnut) {
      temp["radius"] = [customOption.chartStyle.radiusmin,customOption.chartStyle.radiusmax];
    } else {
      temp["radius"] =  [0, customOption.chartStyle.radiusmax];
    }
    if (customOption.chartStyle.isNightingale) {
      temp["roseType"] = "radius";
    } else {
      temp["roseType"] =  "";
    }
    return Object.assign(temp, labelOptions);
  });

  options.dataset = {
    dimensions: dimensions.concat(scale),
    source: data,
  };
  return options;
}
