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
    @click.stop="onClick"
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
          <div class="textBox">{{ element.uid }}</div>
          <delete-outlined class="deleteIcon" @click.stop="showConfirm(element.uid)"/>
      </div>
    </template>
  </draggable>
</div>
</template>

<script lang="ts" setup>
import { createVNode, defineEmits, reactive, ref, watch } from "vue";
import { Modal } from "ant-design-vue";
import { BuildOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons-vue"; 
import draggable from "vuedraggable";
import ProjectInfo from "@/stores/projectInfo";
import { deleteUserChartDetailInfo } from "@/apis";
// const emitter = defineEmits(["delete", "create"]);

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
  
  if (newLength > oldLength) {
    // emitter("create");
    for(let i=newLength-oldLength; i>=1; i--){
      list.value.unshift({ uid: projectInfo.chartsDatas[newLength-i].uid, index: projectInfo.chartsDatas[newLength-i].basicData.index});  
    }
    
  } else if (newLength < oldLength) {
    // emitter("delete");
    list.value = projectInfo.chartsDatas.map(({uid, basicData}) => {
      return { uid, index: basicData.index };
    })
    .sort((a, b) => {
      return b.index - a.index;
    });
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
    let targetUid;
    if (e.target.__draggable_context) {
      targetUid = e.target.__draggable_context.element.uid;
    } else {
      targetUid = e.target.parentElement.__draggable_context.element.uid;
    }
    projectInfo.changeCurrChartIndex(targetUid);
    let targetClassName = document.querySelector(`[data-uid='${targetUid}']`).className;
    projectInfo.currTarget = `.${targetClassName}`;
};


const showConfirm = (_uid: string) => {
    Modal.confirm({
    title: 'Do you Want to delete this chart?',
    icon: createVNode(ExclamationCircleOutlined),
    content: createVNode('div', { style: 'color:red;'}, "Can't restore after deletion!"),
    onOk() {
        return new Promise((resolve, reject) => {
          deleteUserChartDetailInfo("/user/chartDetailInfo", projectInfo.projectId, _uid)
            .then(() => {
              deleteChart(_uid);
              resolve("");
            })
        });
    }
    });
};

const deleteChart = (_uid: string) => {
    // 删除操作
    let deleteIndex = projectInfo.chartsDatas.findIndex(({uid}) => {
        return uid === _uid;
    });
    projectInfo.chartsDatas.splice(deleteIndex, 1);
    
    // 给每个chartsData重新设置index
    const chartNums = projectInfo.chartsDatas.length;
    projectInfo.chartsDatas.forEach(({uid, basicData }) => {
        let indexInList = list.value.findIndex((item) => {
          return item.uid === uid;
        });
        basicData.index = chartNums-1-indexInList;
    });
    projectInfo.currChartIndex = 0;
    projectInfo.currTarget = "";
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
  padding-left: 8px;
  padding-right: 8px;
  box-shadow:rgba(0, 0, 0, 0.466) 1px 1px 1px 1px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  >.textBox{
    width: 70%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .deleteIcon{
    transition: 0.3s;
  }
  .deleteIcon:hover{
    color: red;
  }
}

.list-group-item.selected{
  border: #40a9ff solid 2px;
}

</style>