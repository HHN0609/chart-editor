import BarDefaultData from "@/charts/bar/defaultSourceData";
import LineDefaultData from "@/charts/line/defaultSourceData";

import BarConfigTree from "@/charts/bar/config";
import LineConfigTree from "@/charts/line/config";

export const CHARTTYPES = [
    "Bar",
    "Line",
    "Pie",
    "Dot",
    "Aera"
];

export const DEFAULTSOURCEDATA = {
    "Bar": BarDefaultData,
    "Line": LineDefaultData
};

export const CONFIGTREES = {
    "Bar": BarConfigTree,
    "Line": LineConfigTree
};
