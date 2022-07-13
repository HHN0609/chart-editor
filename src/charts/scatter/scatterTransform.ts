import { getSacleAndDimensions } from "@/utils";
import echarts from "echarts";

// 转化自定义的options到echart的options
export default function ScatterTransform(customOption: any, data: any[]): echarts.EChartsOption {
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

  options.tooltip= {
    backgroundColor: 'rgba(255,255,255,0.7)',
    formatter: function(param: any) {
      var value = param.value;
      // prettier-ignore
      return '<div solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
        + '</div>'
        + 'X : ' + value[0] + '<br>'
        + 'Y : ' + value[1] + '<br>'
        + 'Value : ' + value[2] + '<br>'
    }
  };
  options.xAxis = {
    show: customOption.xAxis.show,
    type: "value",

    name: customOption.xAxis.name,
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
    type: "value",
    axisTick: {
      show: true,
      alignWithLabel: true,
    },
    name: customOption.yAxis.name,
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
      show: customOption.seriesLabel.show,
      color: customOption.seriesLabel.font.color,
      fontSize: customOption.seriesLabel.font.size,
      fontFamily: customOption.seriesLabel.font.family,
      position: customOption.seriesLabel.position,
    },
  };
  // console.log(scale, "scale")
  // options.series = scale.map(() => {
  //   const temp = { type: "scatter", name: "value"};
  //   return Object.assign(temp, labelOptions);
  // });
  options.series = {
    type: "scatter",
    name: "value",
    data: data,
    symbolSize: function (data) {
      return data[2];
    },


    ...labelOptions
  }

  // console.log("serise: ", options.series);

  // options.series =  

  // options.dataset = {
  //   // dimensions: dimensions.concat(scale),
  //   dimensions: ["x", "y"],
  //   source: data,
  // };

  return options;
}
