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
        label:"Doughnut",
        dataIndex:"chartStyle.isDoughnut",
      },
      {
        type:"inputs",
        dataType:"number",
        label:"radiusmin",
        dataIndex:"chartStyle.radiusmin",
        dependOn:{
          // 表明这个slider依赖于chartStyle.isDoughnut
          // chartStyle.isDoughnut === true时候，这个slider才显示
          dataIndex: "chartStyle.isDoughnut",
          value: true,
        }
      },
      {
        type:"inputs",
        dataType:"number",
        label:"radiusmax",
        dataIndex:"chartStyle.radiusmax",
      },
      {
        type:"switch",
        label:"Nightingale",
        dataIndex:"chartStyle.isNightingale",
      }
    
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
        dataIndex: "seriesLabel.show",
      },
      { 
        type: "font",
        label: "Font",
        dataIndex: "seriesLabel.font",
      },
      {
        type: "radio",
        label: "Position",
        dataIndex: "seriesLabel.position",
        options: [
          { label: "outside", value: "outside" },
          { label: "inner", value: "inner" },
        ],

      },
      {
        type:"inputs",
        dataType:"number",
        label:"Line Length",
        dataIndex:"seriesLabelLine.length",
        dependOn:{
          dataIndex: "seriesLabel.position",
          value: "outside",
        }
      },

    ]
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