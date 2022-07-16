// 图表侧边栏的配置项
// 配置项的输入类型：font, color, radio, select, switch, input, position
// 配置项的切换类型：folder， tab

export default [
  {
    type: "folder",
    label: "Chart Style",
    content: [
      {
        type:"switch",
        label:"Animation",
        dataIndex:"chartStyle.detail.valueAnimation",
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
        // datatitle font
        type: "font",
        label: "DataTitle Font",
        dataIndex: "chartStyle.title.font",
      },
      {
        // value font
        type: "font",
        label: "Value Font",
        dataIndex: "chartStyle.detail.font",
      }

    ]
  },
  {
    type: "folder",
    label: "Axis line",
    content: [
      {
        type:"switch",
        label:"Show",
        dataIndex:"chartStyle.axisLine.show",
      },
      {
        // axisLine color
        type:"inputs",
        label:"AxisLine Color",
        dataType:"color",
        dataIndex:"chartStyle.axisLine.color",
      },
      {
        type: "inputs",
        label: "Width",
        dataType: "number",
        dataIndex: "chartStyle.axisLine.width",
      },
      {
        type: "inputs",
        label: "Radius",
        dataType: "number",
        dataIndex: "chartStyle.axisLine.radius",
      },
    ],
  },
  {
    type: "folder",
    label: "Progress",
    content: [
      {
        type:"switch",
        label:"Show",
        dataIndex:"chartStyle.progress.show",
      },
      {
        type: "inputs",
        dataType: "number",
        label: "Width",
        dataIndex: "chartStyle.progress.width"
      },
      {
        type: "inputs",
        dataType: "color",
        label: "Progress color",
        dataIndex: "chartStyle.progress.color",
        // dependOn: {
        //   dataIndex: "chartStyle.progress.show",
        //   value: true
        // }
      },
    ]
  },
  {
    type: "folder",
    label: "Split line",
    content: [
      {
        type: "switch",
        label: "Show",
        dataIndex: "chartStyle.splitLine.show"
      },
      {
        // splitLine distance
        type: "slider",
        label:"Distance",
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
        label:"Color",
        dataType:"color",
        dataIndex:"chartStyle.splitLine.color",
      },
    ]
  },
  {
    type: "folder",
    label: "Axis tick",
    content: [
      {
        type: "switch",
        label: "Show",
        dataIndex: "chartStyle.axisTick.show"
      },
      {
        type: "slider",
        label:"Distance",
        dataIndex:"chartStyle.axisTick.distance",
        options:{
          max:90,
          min:-90,
          step:1,
        },
      },
      {
        // axisTick Color
        type:"inputs",
        label:"Color",
        dataType:"color",
        dataIndex:"chartStyle.axisTick.color",
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