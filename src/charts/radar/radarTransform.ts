import { getSacleAndDimensions } from "@/utils";
import echarts from "echarts";

// 转化自定义的options到echart的options
export default function RadarTransform(customOption: any, data: any[]): echarts.EChartsOption {
  const { dimensions, scale } = getSacleAndDimensions(data);
  // console.log("dimensions", dimensions);
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
    bottom: "10%",
    top: "10%",
    left: "10%",
    right: "10%",
    containLabel: true,
    borderColor: customOption.grid.borderColor,
    borderWidth: customOption.grid.borderWidth,
    // backgroundColor: customOption.grid.backgroundColor,
  };
  options.radar={
    shape: customOption.radar.shape,
    indicator: scale.map((item) => {
      return { name: item, max: 100 };
    }),
    axisName: {
      color: customOption.radar.axisName.font.color,
      fontSize: customOption.radar.axisName.font.size,
      fontFamily: customOption.radar.axisName.font.family,
    },
    
  },
  options.legend = {
    data: data.map((value) => { return value[dimensions[0]] }),
    show: customOption.legend.show,
    orient: customOption.legend.orient,
    top: customOption.legend.position.split("-")[0],
    left: customOption.legend.position.split("-")[1],
    itemHeight: customOption.legend.font.size,
    itemWidth: customOption.legend.font.size * 2,
    textStyle: {
      color: customOption.legend.font.color,
      fontSize: customOption.legend.font.size,
      fontFamily: customOption.legend.font.family,
    },
  };

  options.tooltip = {
    backgroundColor: 'rgba(255,255,255,0.7)',
    formatter: function (param: any) {
      let value = param.value;
      return `${ scale.map((item) => {
        return `${item}: ${value[item]}`;
      }).join("<br>") }`;
    },
  };

 
  const labelOptions = {
    label: {
      show: customOption.seriesLabel.show,
      color: customOption.seriesLabel.font.color,
      fontSize: customOption.seriesLabel.font.size,
      fontFamily: customOption.seriesLabel.font.family,
      position: customOption.seriesLabel.position,
    },
  };

  options.series = data.map((value, index) => {
    const temp = { type: "radar", name: value[dimensions[0]], datasetIndex: index, colorBy: "series" };
    return Object.assign(temp, labelOptions);
  });

  options.dataset = data.map((value, index) => {
    return {
      dimensions: scale,
      source: [value],
    }
  });

  // options.dataset = {
  //   dimensions: scale,
  //   source: data,
  // };
  return options;
}
