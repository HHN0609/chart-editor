import { getSacleAndDimensions } from "@/utils";
import echarts from "echarts";

// 转化自定义的options到echart的options
export default function GaugeTransform(customOption: any, data: any[]): echarts.EChartsOption {
  const { dimensions, scale } = getSacleAndDimensions(data);
  const options: echarts.EChartsOption = {};
  options.backgroundColor = customOption.backGround.color;

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
    backgroundColor: customOption.grid.backgroundColor,
  };

  options.series = 
    {
      type: 'gauge',
      detail: {
        valueAnimation: customOption.chartStyle.detail.valueAnimation,
        formatter: '{value}',
        fontSize: 50,
      },
      title:{
        show:true,
      },
      progress: {
          show: customOption.chartStyle.progress.show,
          itemStyle: {
            color: customOption.chartStyle.progress.color,
          }
      },
      radius: customOption.chartStyle.radius,
      min: customOption.range.min,
      max: customOption.range.max,
      startAngle: customOption.range.angle / 2 + 90,
      endAngle: -1 * (customOption.range.angle / 2 - 90),

      pointer: {
        show: customOption.pointer.show,
        length: customOption.pointer.length + "%",
        width: customOption.pointer.width,
        itemStyle: {
          color: customOption.pointer.color
        }
      },
      animationDelay: 500,
      data: data
  };
  

 
  return options;
}
