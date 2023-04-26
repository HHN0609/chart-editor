<template>
    <div class="container">
        <div class="uploadArea">
            <input
                type="file"
                accept=".xls,.xlsx,.csv"
                @change="readExcel($event)"
            />
            <span> 输入数据规模: {{ data.$state.dataRowNum }}行 X {{ data.$state.dataColumnNum }}列，</span>
            <span>部分数据缺失行数：{{ data.$state.errorDataRows }}行</span>
        </div>
        <div class="tableContainer">
            <div>
                <Table
                    class="ant-table-striped"
                    :data-source="data.$state.inputData" 
                    :columns="columnsInfo"
                    :scroll="{ y: 700 }"
                    :pagination="false"
                    bordered
                    :row-class-name="rowColor"
                >
                <template #headerCell="{ column }">
                 <tableHeadCard
                    @change-type="(colName, newType) => {data.$state.dataColumnsInfo[colName] = newType}"
                    :col-name="column.title"
                    :type="data.$state.dataColumnsInfo[column.title]"
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
import XLSX from "xlsx";
import useInputData from "@/stores/inputData";
import tableHeadCard from "@/components/dataView/tableHeadCard.vue";
const data = useInputData();

const columnsInfo = computed(() => {
    let ans = [];
    if(data.$state.inputData.length === 0) return ans;
    for(let key of Object.keys(data.$state.inputData[0])){
        ans.push({
            title: key,
            dataIndex: key,
            key: key,
            width: 250
        });
        data.$state.dataColumnsInfo[key] = typeof data.$state.inputData[0][key] === "number" ? "measure" : "dimension";
    }
    return ans;
});

// table颜色变化
function rowColor(_record, index) {
  for(let key in _record) {
    if(_record[key] === null || _record[key] === undefined){
      data.$state.errorDataRows++;
      return 'table-warn';
    }
  }
  return index % 2 === 1 ? 'table-striped' : null;
}

function readExcel(e) {
    if(e.target.files.length === 0) return;
    clearState();
    // 读取表格文件
    let that = this;
    const files = e.target.files;
    if (files.length <= 0) {
      return false;
    } else if (!/\.(xls|xlsx|csv)$/.test(files[0].name.toLowerCase())) {
        message.warn("Format error");
      return false;
    } else {
      // 更新获取文件名
      that.upload_file = files[0].name;
    }
    const fileReader = new FileReader();
    fileReader.onload = (ev) => {
      try {
        const workbook = XLSX.read(ev.target.result, {
          type: "binary"
        });
        const wsname = workbook.SheetNames[0]; //取第一张表
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {
          defval: null
        }); //生成json表格内容
        
        data.$state.inputData.push(...ws);
        data.$state.dataRowNum = ws.length;
        data.$state.dataColumnNum = Object.keys(ws[0]).length;
      } catch (e) {
        message.warn("Read error");
        return false;
      }
    };
    fileReader.readAsBinaryString(files[0]);
}

function clearState() {
  data.$reset();
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