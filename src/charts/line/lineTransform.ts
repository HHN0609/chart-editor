import { getSacleAndDimensions } from "@/utils";
import echarts from "echarts";

// 转化自定义的options到echart的options
export default function LineTransform(customOption: any, data: any[]): echarts.EChartsOption {
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
    bottom: customOption.grid.bottom,
    top: customOption.grid.top,
    left: customOption.grid.left,
    right: customOption.grid.right,
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
    itemHeight: customOption.legend.font.size,
    itemWidth: customOption.legend.font.size * 2,
    textStyle: {
      color: customOption.legend.font.color,
      fontSize: customOption.legend.font.size,
      fontFamily: customOption.legend.font.family,
    },
  };

  options.tooltip = {};

  options.xAxis = {
    show: customOption.xAxis.show,
    type: customOption.xAxis.type,

    name: customOption.xAxis.name,
    nameGap:5,
    nameTextStyle: {
      color: customOption.xAxis.nameFont.color,
      fontFamily: customOption.xAxis.nameFont.family,
      fontSize: customOption.xAxis.nameFont.size,
    },
    axisTick: {
      show: true,
      alignWithLabel: true,
    },
    axisLine: {
      show: customOption.xAxis.show,
      lineStyle: {
        type: customOption.xAxis.lineType,
        color: customOption.xAxis.lineColor,
        width: customOption.xAxis.lineWidth,
      },
    },
    axisLabel: {
      color: customOption.xAxis.labelFont.color,
      fontSize: customOption.xAxis.labelFont.size,
      fontFamily: customOption.xAxis.labelFont.family,
    },
    splitLine: {
      show: customOption.xAxis.gridLineshow,
      lineStyle: {
        type: customOption.xAxis.gridLineType,
        color: customOption.xAxis.gridLineColor,
        width: customOption.xAxis.gridLineWidth,
      },
    },

    boundaryGap: customOption.xAxis.boundaryGap
  };
  options.yAxis = {
    show: customOption.yAxis.show,
    type: customOption.yAxis.type,
    axisTick: {
      show: true,
      alignWithLabel: true,
    },
    name: customOption.yAxis.name,
    nameGap:5,
    nameTextStyle: {
      color: customOption.yAxis.nameFont.color,
      fontFamily: customOption.yAxis.nameFont.family,
      fontSize: customOption.yAxis.nameFont.size,
    },
    axisLine: {
      show: customOption.yAxis.show,
      lineStyle: {
        type: customOption.yAxis.lineType,
        color: customOption.yAxis.lineColor,
        width: customOption.yAxis.lineWidth,
      },
    },
    axisLabel: {
      color: customOption.yAxis.labelFont.color,
      fontSize: customOption.yAxis.labelFont.size,
      fontFamily: customOption.yAxis.labelFont.family,
    },
    splitLine: {
      show: customOption.yAxis.gridLineshow,
      lineStyle: {
        type: customOption.yAxis.gridLineType,
        color: customOption.yAxis.gridLineColor,
        width: customOption.yAxis.gridLineWidth,
      },
    },
  };
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
    const temp = { type: "line", smooth: customOption.chartStyle.smooth };
    if (customOption.chartStyle.area.isShow) {
      temp["areaStyle"] = { opacity: customOption.chartStyle.area.opacity, };
    } else {
      temp["areaStyle"] = { opacity: 0, };
    }
    if (customOption.chartStyle.isStack) {
      temp["stack"] = "total";
    } else {
      temp["stack"] = "";
    }
    return Object.assign(temp, labelOptions);
  });

  options.dataset = {
    dimensions: dimensions.concat(scale),
    source: data,
  };
  return options;
}
