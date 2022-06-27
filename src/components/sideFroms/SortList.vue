<template>
<div class="sortlist">
      <h3>Charts</h3>
      <draggable
        class="list-group"
        tag='div'
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <build-outlined />
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { BuildOutlined } from "@ant-design/icons-vue"; 
import draggable from "vuedraggable";
const message = [
  "vue.draggable",
  "draggable",
  "component",
  "for",
  "vue.js 2.0",
  "based",
  "on",
  "Sortablejs"
];
const drag = ref(false);
const list = reactive(message.map((name, index) => {
    return { name, order: index + 1 };
}));
 
watch(() => list, () => {
    console.log("change!")
}, {deep: true});

const dragOptions = reactive({
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
});
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
  border-bottom: rgba(0, 0, 0, 0.466) solid 1px;
  border-left: rgba(0, 0, 0, 0.466) solid 1px;
  border-right: rgba(0, 0, 0, 0.466) solid 1px;
  margin-bottom: 5px;
  border-radius: 5px;
  padding-left: 2px;
}
.list-group-item:first-child{
    border-top: rgba(0, 0, 0, 0.466) solid 1px;
}
</style>