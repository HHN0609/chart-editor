import { ChartData, ListType, AggregateMethod } from "@/stores/chartData";
import { reactive } from "vue";

type analysisFieldResult = {
    colNum: number,
    rowNum: number,
    result: {
        X_axis: ListType[],
        Y_axis: ListType[]
    }[]
}


// 根据用户输入的X轴和Y轴的field来生成一个or多个vega-lite的xy轴信息
// export function analysisField(chartData: ChartData, dataColumnsInfo: object): analysisFieldResult {
    
//     let p1 = chartData.X_axis.length && chartData.X_axis.every(({fieldName}) => dataColumnsInfo[fieldName] === "measure");
    
//     let p2 = chartData.Y_axis.length && chartData.Y_axis.every(({fieldName}) => dataColumnsInfo[fieldName] === "measure");
    
    
//     let lastNominalInX: number = -1;
//     for(let i=chartData.X_axis.length - 1; i >= 0; i--){
//         if(dataColumnsInfo[chartData.X_axis[i].fieldName] === "dimension"){
//             lastNominalInX = i;
//             break;
//         } 
//     }
    
//     let lastNominalInY: number = -1;
//     for(let i=chartData.Y_axis.length - 1; i >= 0; i--){
//         if(dataColumnsInfo[chartData.Y_axis[i].fieldName] === "dimension"){
//             lastNominalInY = i;
//             break;
//         }
//     }

//     // X轴是空的，Y轴不是空的
//     if(chartData.X_axis.length === 0 && chartData.Y_axis.length !== 0) {
 
//         if(lastNominalInY === -1) {
//             // 没有nominal的field
//             return {
//                 rowNum: chartData.Y_axis.length,
//                 colNum: 1,
//                 result: [{
//                     X_axis: [],
//                     Y_axis: chartData.Y_axis
//                 }]
//             }
//         } else {
//             if(lastNominalInY === chartData.Y_axis.length - 1) {
//                 // Y轴最后一个field是nominal
//                 if(chartData.Y_axis.length >= 2 && dataColumnsInfo[chartData.Y_axis[lastNominalInY - 1].fieldName] === "dimension") {
//                     // 最后两个field都是dimension
//                     return {
//                         rowNum: 1,
//                         colNum: 1,
//                         result: [{
//                             X_axis: [],
//                             Y_axis: chartData.Y_axis.slice(lastNominalInY - 1)
//                         }]
//                     };
//                 }
//                 return {
//                     rowNum: 1,
//                     colNum: 1,
//                     result: [{
//                         X_axis: [],
//                         Y_axis: chartData.Y_axis.slice(lastNominalInY)
//                     }]
//                 };
//             } else {
//                 let result: analysisFieldResult["result"] = [];
//                 let t: ListType[][] = [];
//                 for(let i=lastNominalInY+1; i <= chartData.Y_axis.length - 1; i++){
//                     t.push([
//                         chartData.Y_axis[lastNominalInY],
//                         chartData.Y_axis[i]
//                     ]);
//                 }
//                 for(let i=0; i<t.length; i++){
//                     result.push({
//                         X_axis: [],
//                         Y_axis: t[i]
//                     });
//                 }
//                 return {
//                     rowNum: t.length,
//                     colNum: 1,
//                     result
//                 }
//             }
//         }
//     }

//     // X轴不是空的，Y轴是空的
//     if(chartData.X_axis.length !== 0 && chartData.Y_axis.length === 0) {

//         if(lastNominalInX === -1) {
//             // 没有nominal的field
//             return {
//                 rowNum: 1,
//                 colNum: chartData.X_axis.length,
//                 result: [{
//                     X_axis: chartData.X_axis,
//                     Y_axis: []
//                 }]
//             }
//         } else {
//             if(lastNominalInX === chartData.X_axis.length - 1) {
//                 // X轴最后一个field是nominal
//                 if(chartData.X_axis.length >= 2 && dataColumnsInfo[chartData.X_axis[lastNominalInX - 1].fieldName] === "dimension") {
//                     // 最后两个field都是dimension
//                     return {
//                         rowNum: 1,
//                         colNum: 1,
//                         result: [{
//                             X_axis: chartData.X_axis.slice(lastNominalInX - 1),
//                             Y_axis: []
//                         }]
//                     };
//                 }
//                 return {
//                     rowNum: 1,
//                     colNum: 1,
//                     result: [{
//                         X_axis: chartData.X_axis.slice(lastNominalInX),
//                         Y_axis: []
//                     }]
//                 };
//             } else {
//                 let result: analysisFieldResult["result"] = [];
//                 let t: ListType[][] = [];
                
//                 for(let i=lastNominalInX+1; i <= chartData.X_axis.length - 1; i++){
//                     t.push([
//                         chartData.X_axis[lastNominalInX],
//                         chartData.X_axis[i]
//                     ]);
//                 }
//                 for(let i=0; i<t.length; i++){
//                     result.push({
//                         X_axis: t[i],
//                         Y_axis: []
//                     });
//                 }
//                 return {
//                     rowNum: 1,
//                     colNum: t.length,
//                     result
//                 }
//             }
//         }
//     }

    
//     if(p1 && p2) {
//         // n*n 的情况
//         let result: analysisFieldResult["result"] = [];
        
//         for(let j=0; j < chartData.Y_axis.length; j++){
//             for(let i=0; i < chartData.X_axis.length; i++){
//                 result.push({
//                     X_axis: [chartData.X_axis[i]],
//                     Y_axis: [chartData.Y_axis[j]]
//                 });
//             }
//         }
//         return {
//             colNum: chartData.X_axis.length,
//             rowNum: chartData.Y_axis.length,
//             result
//         }
//     } else if(p1) {
//         // Y_axis上存在nominal的字段
//         let result: analysisFieldResult["result"] = [];
      
//         if(lastNominalInY === chartData.Y_axis.length - 1){
//             // Y_axis的最后一个nominal字段在数组的末尾
//             chartData.X_axis.forEach((value) => {
//                 result.push({
//                     X_axis: [ value ],
//                     Y_axis: chartData.Y_axis.slice(lastNominalInY)
//                 });
//             });
//             return {
//                 rowNum: 1,
//                 colNum: chartData.X_axis.length,
//                 result
//             }
//         } else {
//             // Y_axis上存在nominal的字段
//             let t: ListType[][] = [];
//             // t相当于新的Y_axis
//             for(let i=lastNominalInY + 1; i <= chartData.Y_axis.length - 1; i++){
//                 t.push([
//                     chartData.Y_axis[lastNominalInY],
//                     chartData.Y_axis[i]
//                 ]);
//             }
//             for(let i=0; i<t.length; i++){
//                 chartData.X_axis.forEach((value) => {
//                     result.push({
//                         X_axis: [ value ],
//                         Y_axis: t[i]
//                     });
//                 });
//             }

//             return {
//                 rowNum: t.length,
//                 colNum: chartData.X_axis.length,
//                 result
//             }
//         }
//     } else if(p2) {
//         // X_axis上存在nominal的字段
//         let result: analysisFieldResult["result"] = [];
      
//         if(lastNominalInX === chartData.X_axis.length - 1){
//             // X_axis的最后一个nominal字段在数组的末尾
//             chartData.Y_axis.forEach((value) => {
//                 result.push({
//                     X_axis: chartData.X_axis.slice(lastNominalInX),
//                     Y_axis: [ value ]
//                 });
//             });
//             return {
//                 rowNum: chartData.Y_axis.length,
//                 colNum: 1,
//                 result
//             }
//         } else {
//             // 向后收集measure字段,进行组合
//             let t: ListType[][] = [];
//             for(let i=lastNominalInX + 1; i <= chartData.X_axis.length - 1; i++){
//                 t.push([
//                     chartData.X_axis[lastNominalInX],
//                     chartData.X_axis[i]
//                 ]);
//             }
//             for(let i=0; i<chartData.Y_axis.length; i++){
//                 t.forEach((value) => {
//                     result.push({
//                         X_axis: value,
//                         Y_axis: [ chartData.Y_axis[i] ]
//                     });
//                 });
//             }
//             return {
//                 rowNum: chartData.Y_axis.length,
//                 colNum: t.length,
//                 result
//             }
//         }
//     } else {
//         // X_axis和Y_axis都有nominal的字段
//         let k1 = lastNominalInX === chartData.X_axis.length - 1;
//         let k2 = lastNominalInY === chartData.Y_axis.length - 1;
//         let tx = createCompositeAxis(chartData, "X_axis", dataColumnsInfo);
//         let ty = createCompositeAxis(chartData, "Y_axis", dataColumnsInfo);
//         let result: analysisFieldResult["result"] = [];
//         if(k1 && k2) {
//             return {
//                 colNum: 1,
//                 rowNum: 1,
//                 result: [{
//                     X_axis: [chartData.X_axis[lastNominalInX]],
//                     Y_axis: [chartData.Y_axis[lastNominalInY]]
//                 }]
//             }
//         } else if(k1) {
//             // X_axis的nominal在最后面
//             for(let i=0; i<ty.length; i++){
//                 result.push({
//                     X_axis: [ chartData.X_axis[lastNominalInX] ],
//                     Y_axis: ty[i]
//                 });
//             }
//             return {
//                 colNum: 1,
//                 rowNum: ty.length,
//                 result
//             }
//         } else if(k2) {
//             // Y_axis的nominal在最后面
//             for(let i=0; i<tx.length; i++){
//                 result.push({
//                     X_axis: tx[i],
//                     Y_axis: [ chartData.Y_axis[lastNominalInY] ],
//                 })
//             }
//             return {
//                 colNum: tx.length,
//                 rowNum: 1,
//                 result
//             }
//         } else {
//             for(let i=0; i<ty.length; i++){
//                 for(let j=0; j<tx.length; j++){
//                     result.push({
//                         X_axis: tx[j],
//                         Y_axis: ty[i]
//                     })
//                 }
//             }
//             return {
//                 colNum: tx.length,
//                 rowNum: ty.length,
//                 result
//             }
//         }
//     }
// }

export function analysisField(X_axis: ListType[], Y_axis: ListType[], dataColumnsInfo: object): analysisFieldResult {
    let x = createCompositeAxis(X_axis, dataColumnsInfo);
    let y = createCompositeAxis(Y_axis, dataColumnsInfo);
    if(x.length === 0 && y.length === 0) {
        return reactive({
            rowNum: 1,
            colNum: 1,
            result: []
        });
    } else if(x.length === 0) {
        let result: analysisFieldResult["result"] = [];
        for(let i=0; i < y.length; i++){
            result.push({
                X_axis: [],
                Y_axis: y[i]
            });
        }
        return reactive({
            rowNum: y.length,
            colNum: 1,
            result
        });
    } else if(y.length === 0) {
        let result: analysisFieldResult["result"] = [];
        for(let i=0; i<x.length; i++){
            result.push({
                X_axis: x[i],
                Y_axis: []
            });
        }
        return reactive({
            rowNum: 1,
            colNum: x.length,
            result
        });
    } else {
        let result: analysisFieldResult["result"] = [];
        for(let i=0; i<y.length; i++){
            for(let j=0; j<x.length; j++){
                result.push({
                    X_axis: x[j],
                    Y_axis: y[i]
                });
            }
        }
        return reactive({
            rowNum: y.length,
            colNum: x.length,
            result
        });
    }

}

export function createCompositeAxis(axis: ListType[], dataColumnsInfo: object): ListType[][] {
    if(axis.length === 0) return [];

    let lastNominalIndex = -1;
    for(let i=axis.length - 1; i >= 0; i--){
        if(dataColumnsInfo[axis[i].fieldName] === "dimension") {
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
            if(axis.length >= 2 && dataColumnsInfo[axis[lastNominalIndex - 1].fieldName] === "dimension") {
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