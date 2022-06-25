import { defineStore } from "pinia"; 
// 保存当前工程的信息，从接口获取数据
type stateType = {
    currTarget: string,
    width: number,
    height: number,
    initZoom: number,
    bgColor: string,
    viewportColor: string,
    projectId: string,
    chartsData: object[],
    moveableData: object[],
}
export default defineStore("project", {
    state: (): stateType => {
        return {
            currTarget: "",
            width: 0,
            height: 0,
            initZoom: 1,
            bgColor: "#232945",
            viewportColor: "#345423",
            projectId:"",
            chartsData: [
                // 项目里图表的信息
            ],
            moveableData: []
        }
    }
})