import { getSacleAndDimensions } from "@/utils";
import echarts from "echarts";

// 转化自定义的options到echart的options
export default function GaugeTransform(customOption: any, data: any[]): echarts.EChartsOption {
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
    bottom: "10%",
    top: "10%",
    left: "10%",
    right: "10%",
    containLabel: true,
    borderColor: customOption.grid.borderColor,
    borderWidth: customOption.grid.borderWidth,
    backgroundColor: customOption.grid.backgroundColor,
  };

  // options.legend = {
  //   show: customOption.legend.show,
  //   orient: customOption.legend.orient,
  //   top: customOption.legend.position.split("-")[0],
  //   left: customOption.legend.position.split("-")[1],
  //   itemHeight: customOption.legend.font.size,
  //   itemWidth: customOption.legend.font.size * 2,
  //   textStyle: {
  //     color: customOption.legend.font.color,
  //     fontSize: customOption.legend.font.size,
  //     fontFamily: customOption.legend.font.family,
  //   },
  // };

  // options.tooltip = {
    
  //     formatter: '{a} <br/>{b} : {c}%'
    
  // };

 
  // options.series ={
    
    // title: {
    //   show:true,
    // },
    type :"gauge",
    // name : "111",
    // progress: {
    //   show: true
    // },
    // radius: customOption.chartStyle.radius + "%",
    // detail: {
    //   valueAnimation: true,
    //   formatter: '{value}'
    // },
  // }
  options.series = 
    {
      name: 'Pressure',
      type: 'gauge',
      detail: {
        valueAnimation: customOption.chartStyle.detail.valueAnimation,
        formatter: '{value}'
      },
      title:{
        show:true,
      },
      progress: {
          show: customOption.chartStyle.progress.show,
        },
      data: data
  };
  
  // options.dataset = {
  //   source: data,
   
  // };
 
  return options;
}
