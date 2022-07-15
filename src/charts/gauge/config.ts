// 图表侧边栏的配置项
// 配置项的输入类型：font, color, radio, select, switch, input, position
// 配置项的切换类型：folder， tab

export default [
  {
    type: "folder",
    label: "Chart Style",
    content: [
      {
        type: "inputs",
        label: "Radius",
        dataType: "number",
        dataIndex: "chartStyle.radius"
      },
      {
        type:"switch",
        label:"Progress",
        dataIndex:"chartStyle.progress.show",
      },
      {
        type: "inputs",
        dataType: "color",
        label: "Progress color",
        dataIndex: "chartStyle.progress.color",
        dependOn: {
          dataIndex: "chartStyle.progress.show",
          value: true
        }
      },
      {
        type:"switch",
        label:"Animation",
        dataIndex:"chartStyle.detail.valueAnimation",
      },
      {
        type: "slider",
        label:"AxisTick Distance",
        dataIndex:"chartStyle.axisTick.distance",
        options:{
          max:90,
          min:-90,
          step:1,
        }
      },
      {
        // axisTick Color
        type:"inputs",
        label:"AxisTick Color",
        dataType:"color",
        dataIndex:"chartStyle.axisTick.color",
        
      },
      {
        // axisLine color
        type:"inputs",
        label:"AxisLine Color",
        dataType:"color",
        dataIndex:"chartStyle.axisLine.color",

      },
      {
        // axisLabel distance
        type: "slider",
        label:"AxisLabel Distance",
        // dataType:"number",
        dataIndex:"chartStyle.axisLabel.distance",
        options:{
          max:90,
          min:-90,
          step:1,
        }
      },
      {
        // axisLabel font
        type: "font",
        label: "AxisLabel Font",
        dataIndex: "chartStyle.axisLabel.font",
      },
      {
        // splitLine distance
        type: "slider",
        label:"SplitLine Distance",
        // dataType:"number",
        dataIndex:"chartStyle.splitLine.distance",
        options:{
          max:90,
          min:-90,
          step:1,
        }
      },
      {
        // splitLine color
        type:"inputs",
        label:"SplitLine Color",
        dataType:"color",
        dataIndex:"chartStyle.splitLine.color",
      },

    ]
  },
  {
    type: "folder",
    label: "Title",
    content: [
      {
        type: "switch",
        label: "Show title",
        dataIndex: "title.show",
      },
      {
        type: "inputs",
        dataType: "text",
        label: "Text",
        dataIndex: "title.text",
      },
      {
        type: "font",
        label: "Font",
        dataIndex: "title.font",
      },
      {
        type: "position",
        positionNum: 6,
        label: "Position",
        dataIndex: "title.position",
      },
    ],
  },
  {
    type: "folder",
    label: "Range",
    content: [
      {
        type: "inputs",
        dataType: "number",
        label: "Min",
        dataIndex: "range.min"
      },
      {
        type: "inputs",
        dataType: "number",
        label: "Max",
        dataIndex: "range.max"
      },
      {
        type: "slider",
        label: "Angle",
        dataIndex: "range.angle",
        options: {
          // 滑动条的最小值，最大值，以及滑动的步长
          min: 0,
          max: 360,
          step: 1
        },
      },
    
    ]
  },
  {
    type: "folder",
    label: "Pointer",
    content: [
      {
        type: "switch",
        label: "Show",
        dataIndex: "pointer.show",
      },
      {
        type: "slider",
        label: "Length",
        dataIndex: "pointer.length",
        options: {
          // 滑动条的最小值，最大值，以及滑动的步长
          min: 0,
          max: 100,
          step: 1
        },
      },
      {
        type: "inputs",
        dataType: "color",
        label: "Color",
        dataIndex: "pointer.color",
      },
    ]
  },
  {
    type: "folder",
    label: "Grid",
    content: [
      {
        type: "switch",
        label: "Show Grid",
        dataIndex: "grid.show",
      },
      {
        type: "inputs",
        dataType: "color",
        label: "Border color",
        dataIndex: "grid.borderColor",
      },
      {
        type: "inputs",
        dataType: "number",
        label: "Border width",
        dataIndex: "grid.borderWidth",
      },
    ],
  },
  {
    type: "folder",
    label: "Background",
    content: [
      {
        type: "inputs",
        dataType: "color",
        label: "Color",
        dataIndex: "backGround.color"
      }
    ]
  }
]