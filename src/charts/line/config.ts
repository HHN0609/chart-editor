// 图表侧边栏的配置项
// 配置项的输入类型：font, color, radio, select, switch, input, position
// 配置项的切换类型：folder， tab

export default [
    {
        type: "folder",
        label: "xAxis",
        content: [
            {
                type: "font",
                label: "Axis font",
                dataIndex: "axis.font"
            },
            {
                type: "inputs",
                label: "Stroke Width",
                // type 是inputs的话就会有dataType这个选项
                dataType: "number",
                dataIndex: "axis.strokeWidth"
            },
            {
                type: "inputs",
                label: "Axis Color",
                dataType: "color",
                dataIndex: "axis.color"
            }
        ]
    },
    {
        type: "folder",
        label: "Title",
        content: [
            {
                type: "position",
                label: "Position",
                dataIndex: "title.position"
            },
            {
                type: "select",
                label: "Stroke Style",
                // type是select和radio有options这个值
                options: [
                    {label: "Solid", value: "solid"},
                    {label: "Dash", value: "dash"}
                ],
                dataIndex: "axis.strokeStyle"
            },
            {
                type: "radio",
                label: "Title Style",
                options: [
                    {label: "Style1", value:"Style1"},
                    {label: "Style2", value:"Style2"},
                ],
                dataIndex: "axis.color"
            }
        ]
    }
]