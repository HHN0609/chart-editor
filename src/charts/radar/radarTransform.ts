import { getSacleAndDimensions } from "@/utils";
import echarts from "echarts";

// 转化自定义的options到echart的options
export default function RadarTransform(customOption: any, data: any[]): echarts.EChartsOption {
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
  options.radar={
    shape: customOption.radar.shape,
    indicator: customOption.radar.indicator,
    },
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

  const schema = [
    
    { name: 'Matcha Latte', index: 0, text: 'Matcha Latte' },
    { name: 'Milk Tea', index: 1, text: 'Milk Tea' },
    { name: 'Cheese Cocoa', index: 2, text: 'Cheese Cocoa' },
    { name: 'Walnut Brownie', index: 3, text: 'Walnut Brownie' },

  ];
  options.tooltip = {
   
    backgroundColor: 'rgba(255,255,255,0.7)',
    formatter: function (param: any) {
      var value = param.value;
      
      console.log(param)
      // prettier-ignore
      return '<div  font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
        + '</div>'
        + schema[0].text + '：' + value[schema[0].text] + '<br>'
        + schema[1].text + '：' + value[schema[1].text] + '<br>'
        + schema[2].text + '：' + value[schema[2].text] + '<br>'
        + schema[3].text + '：' + value[schema[3].text] + '<br>';
    }

  };

 
  const labelOptions = {
    label: {
      show: customOption.seriesLabel.show,
      color: customOption.seriesLabel.font.color,
      fontSize: customOption.seriesLabel.font.size,
      fontFamily: customOption.seriesLabel.font.family,
      position: customOption.seriesLabel.position,
      // position: "inner"
    },
  };


  options.series = scale.map(() => {
    const temp = { type: "radar" };
    return Object.assign(temp, labelOptions);
  });

  options.dataset = {
    // dimensions: dimensions.concat(scale),
    dimensions:['Matcha Latte', 'Milk Tea',  'Cheese Cocoa','Walnut Brownie'],
    source: data,
  };
  return options;
}
