import Bar from "@/charts/bar/Bar.vue";
import Line from "@/charts/line/Line.vue";
import { BarDefaultOptionsData, BarDefaultSourceData } from "@/charts/bar/defaultData";
import { LineDefaultOptionsData, LineDefaultSourceData } from "@/charts/line/defaultData";
// import { LineDefaultOptionsData } from "@/charts/line/defaultSourceData";

import BarConfigTree from "@/charts/bar/config";
import LineConfigTree from "@/charts/line/config";
// import LineConfigTree from "@/charts/line/config";

export const CHARTTYPES = [
    "Bar",
    "Line",
    // "Pie",
    // "Dot",
    // "Aera"
];

export const CHARTS = {
    Bar,
    Line
}

export const DEFAULTSOURCEDATA = {
    "Bar": BarDefaultSourceData,
    "Line": LineDefaultSourceData
};

export const DEFAULTOPTIONSDATA = {
    "Bar": BarDefaultOptionsData,
    "Line": LineDefaultOptionsData,
}

export const CONFIGTREES = {
    "Bar": BarConfigTree,
    "Line": LineConfigTree
};
