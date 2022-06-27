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
        @start="dragStart"
        @end="dragEnd"
        item-key="index"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <build-outlined />
            {{ element.uid }}
          </div>
        </template>
      </draggable>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { BuildOutlined } from "@ant-design/icons-vue"; 
import draggable from "vuedraggable";
import ProjectInfo from "@/stores/projectInfo";
const projectInfo = ProjectInfo();

const drag = ref(false);

// index大的排前面
const list = ref(projectInfo.chartsDatas
  .map(({uid, basicData}) => {
      return { uid, index: basicData.index };
  })
  .sort((a, b) => {
    return b.index - a.index;
  }));

const dragOptions = reactive({
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
});

const dragStart = () => {
    drag.value = true;
};

const dragEnd = () => {
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
</script>

<style lang="less" scoped>
.sortlist {
    width: 80%;
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
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  font-size: medium;
  margin-bottom: 5px;
  border-radius: 5px;
  padding-left: 4px;
  padding-right: 4px;
  box-shadow:rgba(0, 0, 0, 0.466) 1px 1px 1px 1px;
  background-color: white;
}
.list-group-item:first-child{
    border-top: rgba(0, 0, 0, 0.466) solid 1px;
}
</style>