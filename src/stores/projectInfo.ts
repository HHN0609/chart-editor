import { defineStore } from "pinia"; 
type chartDataType = {
    uid: string,
    basicData: {
        width: number,
        height: number,
        x: number,
        y: number,
        rotate: number,
        index: number,
    },
    sourceData: Array<any>,
    configData: Array<any>
}

// 保存当前工程的信息，从接口获取数据
type stateType = {
    currTarget: string,
    currChartIndex: number,
    width: number,
    height: number,
    initZoom: number,
    bgColor: string,
    viewportColor: string,
    projectId: string,
    chartsDatas: chartDataType[],
    moveableData: object[],
}
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
                        index: 0
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
                        index: 1
                    },
                    sourceData: [],
                    configData: [],
                }
            ],
            moveableData: []
        }
    ),
    getters: {
        // 获取当前选中的的chartsData信息
        currChartData: (state): chartDataType => {
            return state.chartsDatas[state.currChartIndex];
        }
    },
    actions: {
        changeCurrChartIndex(uid: string) {
            let newIndex: number = this.chartsDatas.findIndex(({ _uid }) => {
                return _uid === uid;
            })
            this.currChartIndex = newIndex === -1 ? 0 : newIndex;
        }
    }
})