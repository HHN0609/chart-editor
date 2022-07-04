<template>
<div>
    <Codemirror
      v-model:value.lazy="code"
      :options="cmOptions"
      placeholder="test placeholder"
      :height="350"
      border
    ></Codemirror>
    <Button type="primary" block @click="onSave">Save</Button>
</div>
</template>

<script>
import Codemirror from "codemirror-editor-vue3";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/dracula.css";
import ProjectInfo from "@/stores/projectInfo";
import { ButtonGroup, Button } from "ant-design-vue"; 
import { ref } from "vue";
import { watch } from "vue";
const projectInfo = ProjectInfo();
export default {
  components: { Codemirror, Button, ButtonGroup },
  setup() {
    let code = ref();
    // 监听target的变化，切换数据源
    watch(() => projectInfo.currTarget, (newTarget) => {
        if(newTarget === "") code.value = "";
        else code.value = JSON.stringify(projectInfo.currChartData.sourceData, (key, value) => {return value}, 2);
    });
    const onSave = () => {
        try {
            let newValue = JSON.parse(code.value);
            projectInfo.currChartData.sourceData.splice(0);
            projectInfo.currChartData.sourceData.push(...newValue);
        } catch (error) {
            console.error(error);
        }
    };
    // let code = computed({
    //     get: () => {
    //         if(projectInfo.chartsDatas.length !== 0){
    //             return JSON.stringify(projectInfo.currChartData.sourceData, (key, value) => {return value}, 2);
    //         } else {
    //             return "";
    //         }
    //     },
    //     set: (newValue) => {
    //         try {
    //             console.log(newValue);
    //             newValue = JSON.parse(newValue);
    //             projectInfo.currChartData.sourceData.splice(0);
    //             projectInfo.currChartData.sourceData.push(...newValue);
    //         } catch (error) {
    //         }
    //     }
    // });
    return {
      code,
      onSave,
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "dracula", // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      },
    };
  },
};
</script>