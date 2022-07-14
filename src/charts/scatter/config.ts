// 图表侧边栏的配置项
// 配置项的输入类型：font, color, radio, select, switch, input, position
// 配置项的切换类型：folder， tab

export default [
  {
    type: "folder",
    label: "Chart style",
    content: [
      {
        type:"inputs",
        datatype:"number",
        label:"DataMin",
        dataIndex:"chartStyle.visualMap.min",
      },
      {
        type:"inputs",
        datatype:"number",
        label:"DataMax",
        dataIndex:"chartStyle.visualMap.max",
      },
      // {
      //   type:"inputs",
      //   datatype:"number",
      //   label:"symbolSizeMin",
      //   dataIndex:"chartStyle.visualMap.symbolSizeMin",
      // },
      // {
      //   type:"inputs",
      //   datatype:"number",
      //   label:"symbolSizeMax",
      //   dataIndex:"chartStyle.visualMap.symbolSizeMax",
      // }

    ],
  },
  {
    type: "folder",
    label: "xAxis",
    content: [
      {
        // 轴线是否显示
        type: "switch",
        label: "Show xAxis",
        dataIndex: "xAxis.show",
      },
      {
        type: "select",
        label: "Line type",
        dataIndex: "xAxis.lineType",
        options: [
          { label: "———————", value: "solid" },
          { label: "------------------", value: "dashed" },
          { label: "••••••••••••••••••", value: "dotted" },
        ],
      },
      {
        type: "inputs",
        dataType: "color",
        label: "Line color",
        dataIndex: "xAxis.lineColor",
      },
      {
        type: "inputs",
        dataType: "number",
        label: "Line Width",
        dataIndex: "xAxis.lineWidth",
      },
      {
        // x轴的name
        type: "inputs",
        dataType: "text",
        label: "Name",
        dataIndex: "xAxis.name",
      },
      {
        type: "font",
        label: "Name font",
        dataIndex: "xAxis.nameFont",
      },
      {
        // 轴线的label字体
        type: "font",
        label: "Label font",
        dataIndex: "xAxis.labelFont",
      },
      {
        type: "switch",
        label: "Boundary gap",
        dataIndex: "xAxis.boundaryGap"
      }
    ],
  },
  {
    type: "folder",
    label: "yAxis",
    content: [
      {
        // 轴线是否显示
        type: "switch",
        label: "Show yAxis",
        dataIndex: "yAxis.show",
      },
      {
        type: "select",
        label: "Line type",
        dataIndex: "yAxis.lineType",
        options: [
          { label: "———————", value: "solid" },
          { label: "------------------", value: "dashed" },
          { label: "••••••••••••••••••", value: "dotted" },
        ],
      },
      {
        type: "inputs",
        dataType: "color",
        label: "Line color",
        dataIndex: "yAxis.lineColor",
      },
      {
        type: "inputs",
        dataType: "number",
        label: "Line Width",
        dataIndex: "yAxis.lineWidth",
      },
      {
        // x轴的name
        type: "inputs",
        dataType: "text",
        label: "Name",
        dataIndex: "yAxis.name",
      },
      {
        type: "font",
        label: "Name font",
        dataIndex: "yAxis.nameFont",
      },
      {
        // 轴线的label字体
        type: "font",
        label: "Label font",
        dataIndex: "yAxis.labelFont",
      },
    ],
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