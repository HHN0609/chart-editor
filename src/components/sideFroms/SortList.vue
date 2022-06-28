<template>
<div class="sortlist">
      <h3>Charts</h3>
      <draggable
        class="list-group"
        tag="div"
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-model="list"
        v-bind="dragOptions"
        @start="onDragStart"
        @end="onDragEnd"
        @click="onClick"
        item-key="index"
      >
        <template #item="{ element }">
          <div
            :class="{
              'list-group-item': true,
              'selected': element.uid === projectInfo.currChartData.uid && projectInfo.currTarget
            }"
          >
            <build-outlined />
            {{ element.uid }}
          </div>
        </template>
      </draggable>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { BuildOutlined } from "@ant-design/icons-vue"; 
import draggable from "vuedraggable";
import ProjectInfo from "@/stores/projectInfo";

const projectInfo = ProjectInfo();
const dragOptions = reactive({
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
});
const drag = ref(false);

// index大的排前面
const list = ref(projectInfo.chartsDatas
  .map(({uid, basicData}) => {
      return { uid, index: basicData.index };
  })
  .sort((a, b) => {
    return b.index - a.index;
  }));

// 监听数组长度，新增一个卡片,默认新增的图表位于最上层，所以新增的卡片在第一个位置
watch(() => projectInfo.chartsDatas.length, (newLength, oldLength) => {
  console.log(newLength, oldLength);
  if (newLength > oldLength) {
    console.log("add a new chart");
    list.value.unshift({ uid: projectInfo.chartsDatas[newLength-1].uid, index: projectInfo.chartsDatas[newLength-1].basicData.index});
  } else if (newLength < oldLength) {
    console.log("delete a chart");
  }
});

const onDragStart = () => {
    drag.value = true;
};

const onDragEnd = () => {
    const chartNums = projectInfo.chartsDatas.length;
    // 给每个chartsData重新设置index
    projectInfo.chartsDatas.forEach(({uid, basicData }) => {
        let indexInList = list.value.findIndex((item) => {
          return item.uid === uid;
        });
        basicData.index = chartNums-1-indexInList;
    });
    drag.value = false;
    
};
const onClick = (e) => {
    let targetUid = e.target.__draggable_context.element.uid;
    projectInfo.changeCurrChartIndex(targetUid);
    let targetClassName = document.querySelector(`[data-uid='${targetUid}']`).className;
    projectInfo.currTarget = `.${targetClassName}`;
};
</script>

<style lang="less" scoped>
.sortlist {
    width: 90%;
    margin: 0 auto;
}
.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 30px;
}

.list-group-item {
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: medium;
  margin-bottom: 5px;
  border-radius: 5px;
  padding-left: 4px;
  padding-right: 4px;
  box-shadow:rgba(0, 0, 0, 0.466) 1px 1px 1px 1px;
  background-color: white;
}

.list-group-item.selected{
  border: #40a9ff solid 2px;
}

</style>