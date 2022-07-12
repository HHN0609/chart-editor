// 图表侧边栏的配置项
// 配置项的输入类型：font, color, radio, select, switch, input, position
// 配置项的切换类型：folder， tab

export default [

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
  {  type: "folder",
  label: "Chart style",
  content: [
    {
      type:"switch",
      label:"Doughnut",
      dataIndex:"chartStyle.isDoughnut",
    },
    {
      type:"input",
      dataType:"number",
      label:"radiusmin",
      dataIndex:"chartStyle.radiusmin",
      Option:{
        max:100,
        min:0,
        Step:1,
      }
    },
    {
      type: "slider",
      label: "radiusmin",
      dataIndex: "chartStyle.radiusmin",
      options: {
        // 滑动条的最小值，最大值，以及滑动的步长
        min: 0,
        max: 200,
        step: 1
      }
    },
    
    {
      type: "slider",
      label: "radiusmax",
      dataIndex: "chartStyle.radiusmax",
      options: {
        // 滑动条的最小值，最大值，以及滑动的步长
        min: 0,
        max: 200,
        step: 1
      }
    
    }
  
  ]
  },
  {
    type: "folder",
    label: "Legend",
    content: [
      {
        type: "switch",
        label: "Show",
        dataIndex: "legend.show",
      },
      {
        type: "font",
        label: "Font",
        dataIndex: "legend.font",
      },
      {
        type: "radio",
        label: "Orient",
        dataIndex: "legend.orient",
        options: [
          { label: "Horizontal", value: "horizontal" },
          { label: "Vertical", value: "vertical" },
        ],
      },
      {
        type: "position",
        positionNum: 6,
        label: "Position",
        dataIndex: "legend.position",
      },
    ],
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
    label: "Label",
    content: [
      {
        type: "switch",
        label: "Show",
        dataIndex: "seriseLabel.show",
      },
      {
        type: "position",
        positionNum: 4,
        label: "Position",
        dataIndex: "seriseLabel.position",
      },
      {
        type: "font",
        label: "Font",
        dataIndex: "seriseLabel.font",
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