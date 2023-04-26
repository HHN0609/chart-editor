import { defineStore } from "pinia";
export default defineStore("inputData", {
    state: () => {
        return {
            dataColumnNum: 0, // 数据的列数
            dataRowNum: 0, // 数据的总行数
            errorDataRows: 0, // 数据缺失的行数
            inputData: [], // 导入的数据
            dataColumnsInfo: {}, // colName: type
            useNull: false // 是否用null填充确实的数据
        }
    },
    getters: {
        getColDatas: (state) => {
            return (colName: string, useNull: boolean, replaceValue: number | string): any[] => {
                let ans = [];
                for(let value of state.inputData) {
                    if(value[colName] !== null && value[colName] !== undefined){
                        ans.push(value[colName]);
                    } else if(useNull === true) {
                        ans.push(replaceValue);
                    }
                }
                return ans;
            }
        },
        // getUniqueCount: (state) => {
        //     let that = this;
        //     return (colName: string) => {
        //         return new Set(that.getColDatas(colName));
        //     }
        // },
        // getMax: () => {

        // }
    }
});

