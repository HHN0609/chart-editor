<template>
    <div class="container">
        <div class="uploadArea">
            <input
                type="file"
                accept=".xls,.xlsx,.csv"
                @change="readExcel($event)"
            />
            <span> 输入数据规模: {{ inputData.dataRowNum }}行 X {{ inputData.dataColumnNum }}列，</span>
            <span>部分数据缺失行数：{{ inputData.errorDataRows }}行</span>
        </div>
        <div class="tableContainer">
            <div>
                <Table
                    class="ant-table-striped"
                    :dataSource="inputData.inputData" 
                    :columns="columnsInfos"
                    :scroll="{ y: 700 }"
                    :pagination="false"
                    bordered
                    :row-class-name="rowColor"
                >
                <template #headerCell="{ column }">
                  <tableHeadCard
                      :fieldName="column.title"
                      :analyticType="inputData.fieldAnalyticTypes[column.title]"
                    ></tableHeadCard>
                </template>
                </Table>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { Table, message } from "ant-design-vue";
import { ref, computed } from "vue";
import useInputData from "@/stores/inputData";
import tableHeadCard from "@/components/dataView/tableHeadCard.vue";
import { isDateTime } from "@/utils";
import { FileReader } from "@kanaries/web-data-loader";
import { isNumeric } from "vega-lite";

const inputData = useInputData();

const columnsInfos = computed(() => {
    let ans = [];
    if(inputData.inputData.length === 0) return ans;
    for(let key of Object.keys(inputData.inputData[0])){
        ans.push({
            title: key,
            dataIndex: key,
            key: key,
            width: 250
        });
        if(key.toLowerCase() === "year" || key.toLowerCase() === "month") {
          inputData.fieldAnalyticTypes[key] = "dimension";
          inputData.fieldSemanticTypes[key] = "temporal";
          continue;      
        } 
        inputData.fieldAnalyticTypes[key] = typeof inputData.inputData[0][key] === "number" ? "measure" : "dimension";

        if(inputData.fieldAnalyticTypes[key] === "measure") {
            inputData.fieldSemanticTypes[key] = "quantitative";
        } else {
            if(isDateTime(inputData.inputData[0][key])) {
              inputData.fieldSemanticTypes[key] = "temporal";
            } else {
              inputData.fieldSemanticTypes[key] = "nominal";
            }
        }
    }
    return ans;
});

// table颜色变化
function rowColor(_record, index) {
  for(let key in _record) {
    if(_record[key] === null || _record[key] === undefined){
      inputData.errorDataRows++;
      return 'table-warn';
    }
  }
  return index % 2 === 1 ? 'table-striped' : null;
}

function readExcel(ev) {
  const file = (ev.target as HTMLInputElement).files[0];
  if(ev.target.files.length === 0) return;
  clearState();
  if (!/\.(xls|xlsx|csv)$/.test(file.name.toLowerCase())) {
    message.warn("Format error");
    return;
  }
  FileReader.csvReader({
    file: file,
    config: {
      size: 400,
      type: "reservoirSampling"
    }
  }).then((data: any[]) => {
    let keys = Object.keys(data[0]);
    
    keys.forEach((key) => {
      if(isNumeric(data[0][key]) === true && isDateTime(data[0][key]) === false){
        data.forEach(d => {
          d[key] = Number(d[key]);
        })
      }
    });
    inputData.dataRowNum = data.length;
    inputData.dataColumnNum = keys.length;
    inputData.inputData.push(...data);
  });
}

function clearState() {
  inputData.$reset();
}

</script>

<style scoped lang="less">
.container {
    width: 100%;
    height: 100%;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    .uploadArea {
        width: 100%;
        height: fit-content;
        padding: 5px;
        border: 1px solid black;
    }
    .tableContainer {
        flex-grow: 1;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 5px;
        > .ant-table-striped {
          width: fit-content;
        }
        // 修改单元格的padding
        .ant-table-striped :deep(.ant-table-cell) {
          padding: 5px;
        }
        .ant-table-striped :deep(.table-striped) td {
          background-color: #fafafa;
        }
        .ant-table-striped :deep(.table-warn) td {
          background-color: #FFF2E8;
        }
    }
}
</style>