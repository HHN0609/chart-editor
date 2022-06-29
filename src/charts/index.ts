import BarConfig from "@/charts/bar/config";
import LineConfig from "@/charts/line/config";

import BarDefaultData from "@/charts/bar/defaultSourceData";
import LineDefaultData from "@/charts/line/defaultSourceData";

export const CHARTTYPES = [
    "Bar",
    "Line",
    "Pie",
    "Dot",
    "Aera"
];

export const CHARTCONFIGS = {
    "Bar": BarConfig,
    "Line": LineConfig
};

export const DEFAULTSOURCEDATA = {
    "Bar": BarDefaultData,
    "Line": LineDefaultData
}