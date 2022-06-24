<script>
import { defineComponent, h } from "vue";
import Font from "./atomElements/Font.vue";
import Inputs from "./atomElements/Inputs.vue";
import Position from "./atomElements/Position.vue";
import Radio from "./atomElements/Radio.vue";
import Select from "./atomElements/Select.vue";
import Switch from "./atomElements/Switch.vue";
import { Collapse, CollapsePanel } from "ant-design-vue";
export default defineComponent({
    name: "DynamicForm",
    props: {
        configTree: Array
    },
    setup(props, { emit }) {
        // 输入的是一个数组，return的也是一个数组
        function generateSideVnodes(configTree) {
            if(!Array.isArray(configTree)){
                return "ConfigTree must be an array!"
            }
            let vNodes = Array.prototype.map.call(configTree, (item) => {
                if (item.type === "folder") {
                    let children = [];
                    if (item.content && item.content.length) {
                        children = generateSideVnodes(item.content);
                    }
                    return h(Collapse, {} , h(CollapsePanel, { header: item.label }, () => children));
                } else if (item.type === "font") {
                    return h(Font, { label: item.label, dataIndex: item.dataIndex, value: "" });
                } else if (item.type === "inputs") {
                    return h(Inputs, { label: item.label, dataIndex: item.dataIndex, type: item.dataType, value: "" });
                } else if (item.type === "position") {
                    return h(Position, { label: item.label, dataIndex: item.dataIndex, value: "" });
                } else if (item.type === "radio") {
                    return h(Radio, { label: item.label, dataIndex: item.dataIndex, value: "", valueOptions: item.options });
                } else if (item.type === "select") {
                    return h(Select, { label: item.label, dataIndex: item.dataIndex, value: "", valueOptions: item.options })
                } else if (item.type === "switch") {
                    return h(Switch, { label: item.label, dataIndex: item.dataIndex, value: true });
                } else {
                    console.error("No such type!");
                }
            });
            return vNodes;
        };
        
        return () => generateSideVnodes(props.configTree);
    }
})
</script>
