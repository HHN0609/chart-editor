import { defineStore } from "pinia";
import { Ref } from "vue";
import { View } from "vega";
export type MarkType = "circle" | "bar" | "line" | "scatter" | "area" | "arc" | "trail";
export type AggregateMethod = "sum" | "count" | "mean" | "min" | "max" | "median" | "variance" | "stdev" | "";
export type ListType = {
    fieldName: string,
    aggregateMethod?: AggregateMethod,
    id?: string
}
export type ChartData = {
    id: string,
    name: string,
    isAggregation: boolean,
    filters?: Map<string, Function[]>,
    markType: MarkType,
    color: ListType,
    size: ListType,
    opacity: ListType,
    shape: ListType,
    stack?: "normalize" | "" | "zero" | "center",
    X_axis: ListType[],
    Y_axis: ListType[],
    dimensionLists: ListType[],
    measureLists: ListType[],
};

export type HistoryItem = {
    
}

let chartCount = 1;
export default defineStore("chartData", {
    state: () => {
        return {
            activeIndex: 0,
            num: 0,
            datas: [
                {
                    id: (function(){ return new Date().getTime().toString()})(),
                    name: "chart-0",
                    isAggregation: true,
                    markType: "bar",
                    color: { fieldName: "", aggregateMethod: "sum" },
                    size: { fieldName: "", aggregateMethod: "sum" },
                    opacity: { fieldName: "", aggregateMethod: "sum" },
                    shape: { fieldName: "", aggregateMethod: "sum" },
                    stack: "zero",
                    X_axis: [],
                    Y_axis: [],
                    dimensionLists: [],
                    measureLists: [],
                    
                }
            ] as ChartData[],
            history: [

            ]
        }
    },
    getters: {
    },
    actions: {
        newChart: function(): ChartData {
            return {
                id: (function(){ return new Date().getTime().toString()})(),
                name: `chart-${chartCount++}`,
                isAggregation: true,
                markType: "bar",
                color: { fieldName: "", aggregateMethod: "sum" },
                size: { fieldName: "", aggregateMethod: "sum" },
                opacity: { fieldName: "", aggregateMethod: "sum" },
                shape: { fieldName: "", aggregateMethod: "sum" },
                stack: "zero",
                X_axis: [],
                Y_axis: [],
                dimensionLists: [],
                measureLists: []
            }
        },
        addChart: function(activeKey: Ref<string>) {
            let _new = this.newChart();
            this.datas.push(_new);
            // 新添加的卡片默认被激活
            activeKey.value = _new.id;
            // this.activeIndex = this.datas.length - 1;
        },
        removeChart: function(id: string, activeKey: Ref<string>) {
            let index = Array.prototype.findIndex.call(this.datas, (data) => data.id === id);
            // console.log(id, index);
            // if(index !== -1){
            //     this.datas.splice(index, 1);
            //     if(index === 0) {
            //         activeKey.value = this.datas[0].id;
            //     } else {
            //         activeKey.value = this.datas[index - 1].id;
            //     }
            // }
            if(index === this.activeIndex){
                // 要删除的卡片是自己本身
                if(index === this.datas.length - 1) {
                    // 删除的卡片是最后一张
                    activeKey.value = this.datas[index - 1].id;
                    this.datas.splice(index, 1);
                } else {
                    this.datas.splice(index, 1);
                    activeKey.value = this.datas[index].id;
                }
            } else if(index > this.activeIndex) {
                // 删除 激活卡片后面的卡片
                this.datas.splice(index, 1);
            } else {
                // 要删除的卡片在激活卡片的前面
                // activeKey不会变，所有要手动修改activeIndex
                this.datas.splice(index, 1);
                this.activeIndex = Array.prototype.findIndex.call(this.datas, (data) => data.id === activeKey.value);
            }
        }
    }
})