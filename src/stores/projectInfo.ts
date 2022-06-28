import { defineStore } from "pinia"; 

/**
 * @property uid 图表对象的uid
 * @property basicData 图表的基本信息
 * @property sourceData 图表的数据源
 * @property configData 图表的样式配置信息
 */
type chartDataType = {
    uid: string,
    basicData: {
        width: number,
        height: number,
        x: number,
        y: number,
        rotate: number,
        index: number,
        type: "Bar" | "Line" | "Dot" | "Pie" | "Area"
    },
    sourceData: Array<any>,
    configData: Array<any>
}


/**
 * @property currTarget 当前选中目标的【类选择器】
 * @property currChartIndex 当前选中图表在chartsDatas数组中的下标
 * @property width viewport的宽度
 * @property height viewport的高度
 * @property initZoom viewport的初始化缩放系数
 * @property bgColor 背景的颜色(16进制表示)
 * @property viewportColor viewport的背景色
 * @property projectId 项目工程的ID
 * @property chartsDatas 项目内部包含的图表的数据信息
 */
type stateType = {
    currTarget: string,
    currChartIndex: number,
    width: number,
    height: number,
    initZoom: number,
    bgColor: string,
    viewportColor: string,
    projectId: string,
    chartsDatas: chartDataType[]
}

// 保存当前工程的信息，从接口获取数据
export default defineStore("project", {
    state: (): stateType => (
        {
            projectId:"",
            width: 0,
            height: 0,
            initZoom: 1,
            bgColor: "#232945",
            viewportColor: "#345423",
            currTarget: "",
            currChartIndex: 0,
            chartsDatas: [
                // 项目里图表的信息
                {
                    uid: "aaaaaaaa",
                    basicData: {
                        width: 100,
                        height: 100,
                        x: 0,
                        y: 0,
                        rotate: 0,
                        index: 0,
                        type: "Bar"
                    },
                    sourceData: [],
                    configData: [],
                },
                {
                    uid: "bbbbbbbb",
                    basicData: {
                        width: 200,
                        height: 200,
                        x: 200,
                        y: 100,
                        rotate: 0,
                        index: 1,
                        type: "Line"
                    },
                    sourceData: [],
                    configData: [],
                },
                {
                    uid: "cccccccc",
                    basicData: {
                        width: 200,
                        height: 200,
                        x: 200,
                        y: 100,
                        rotate: 0,
                        index: 2,
                        type: "Pie"
                    },
                    sourceData: [],
                    configData: [],
                }
            ]
        }
    ),
    getters: {
        // 获取当前选中的的chartsData信息
        currChartData: (state): chartDataType => {
            return state.chartsDatas[state.currChartIndex];
        },
        transform: (state) => {
            return (_uid: string) => {
                let index = state.chartsDatas.findIndex(({ uid }) => {
                    return _uid === uid;
                })
                return `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) translate(${state.chartsDatas[index].basicData.x}px, ${state.chartsDatas[index].basicData.y}px) rotate(${state.chartsDatas[index].basicData.rotate % 360}deg)`;
            }
        },
        maxIndex: (state) => {
            let maxIndex = 0;
            for(let {basicData} of state.chartsDatas){
                if(basicData.index > maxIndex){
                    maxIndex = basicData.index;
                }
            }
            return maxIndex;
        }
    },
    actions: {
        changeCurrChartIndex(_uid: string) {
            let newIndex: number = this.chartsDatas.findIndex(({ uid }) => {
                return uid === _uid;
            })
            this.currChartIndex = newIndex === -1 ? 0 : newIndex;
        }
    }
})