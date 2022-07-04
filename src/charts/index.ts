import Bar from "@/charts/bar/Bar.vue";

import { BarDefaultOptionsData, BarDefaultSourceData } from "@/charts/bar/defaultData";
// import { LineDefaultOptionsData } from "@/charts/line/defaultSourceData";

import BarConfigTree from "@/charts/bar/config";
// import LineConfigTree from "@/charts/line/config";

export const CHARTTYPES = [
    "Bar",
    // "Line",
    // "Pie",
    // "Dot",
    // "Aera"
];

export const CHARTS = {
    Bar
}

export const DEFAULTSOURCEDATA = {
    "Bar": BarDefaultSourceData,
    // "Line": LineDefaultData
};

export const DEFAULTOPTIONSDATA = {
    "Bar": BarDefaultOptionsData,
    // "Line": LineDefaultOptionsData,
}

export const CONFIGTREES = {
    "Bar": BarConfigTree,
    // "Line": LineConfigTree
};
