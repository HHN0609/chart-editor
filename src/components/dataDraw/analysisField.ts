import { ListType } from "@/stores/chartData";
type AnalysisFieldResult = {
    colNum: number,
    rowNum: number,
    result: {
        X_axis: ListType[],
        Y_axis: ListType[]
    }[]
};
export function analysisField(X_axis: ListType[], Y_axis: ListType[], fieldAnalyticTypes: object): AnalysisFieldResult {
    let x = createCompositeAxis(X_axis, fieldAnalyticTypes);
    let y = createCompositeAxis(Y_axis, fieldAnalyticTypes);
    if(x.length === 0 && y.length === 0) {
        return {
            rowNum: 1,
            colNum: 1,
            result: []
        };
    } else if(x.length === 0) {
        let result: AnalysisFieldResult["result"] = [];
        for(let i=0; i < y.length; i++){
            result.push({
                X_axis: [],
                Y_axis: y[i]
            });
        }
        return {
            rowNum: y.length,
            colNum: 1,
            result
        };
    } else if(y.length === 0) {
        let result: AnalysisFieldResult["result"] = [];
        for(let i=0; i<x.length; i++){
            result.push({
                X_axis: x[i],
                Y_axis: []
            });
        }
        return {
            rowNum: 1,
            colNum: x.length,
            result
        };
    } else {
        let result: AnalysisFieldResult["result"] = [];
        for(let i=0; i<y.length; i++){
            for(let j=0; j<x.length; j++){
                result.push({
                    X_axis: x[j],
                    Y_axis: y[i]
                });
            }
        }
        return {
            rowNum: y.length,
            colNum: x.length,
            result
        };
    }

}

export function createCompositeAxis(axis: ListType[], fieldAnalyticTypes: object): ListType[][] {
    if(axis.length === 0) return [];

    let lastNominalIndex = -1;
    for(let i=axis.length - 1; i >= 0; i--){
        if(fieldAnalyticTypes[axis[i].fieldName] === "dimension") {
            lastNominalIndex = i;
            break;
        }
    }
    if(lastNominalIndex === -1){
        // 坐标轴 上没有nominal的字段
        return axis.map((value) => [ value ]);
    } else {
        if(lastNominalIndex === axis.length - 1) {
            // 连续两个nominal的field都在最末尾
            if(axis.length >= 2 && fieldAnalyticTypes[axis[lastNominalIndex - 1].fieldName] === "dimension") {
                return [
                    [ axis[lastNominalIndex - 1], axis[lastNominalIndex] ]
                ]
            }
            return [ [ axis[lastNominalIndex] ]  ];
        } else {
            // 最后一个nominal字段与它后面的quantitative字段进行一一组合
            let t: ListType[][] = [];
            for(let i=lastNominalIndex + 1; i < axis.length; i++){
                t.push([
                    axis[lastNominalIndex],
                    axis[i]
                ]);
            }
            return t;
        }
    }
}