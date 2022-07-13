import Bar from "@/charts/bar/Bar.vue";
import Line from "@/charts/line/Line.vue";
import Pie from "@/charts/pie/pie.vue";
import { BarDefaultOptionsData, BarDefaultSourceData } from "@/charts/bar/defaultData";
import { LineDefaultOptionsData, LineDefaultSourceData } from "@/charts/line/defaultData";
import { PieDefaultOptionsData, PieDefaultSourceData } from "@/charts/pie/defaultData";

import BarConfigTree from "@/charts/bar/config";
import LineConfigTree from "@/charts/line/config";
import PieConfigTree from "@/charts/pie/config";

export const CHARTTYPES = [
    "Bar",
    "Line",
    "Pie",
    // "Dot",
    // "Aera"
];

export const CHARTS = {
    Bar,
    Line,
    Pie,
}

export const DEFAULTSOURCEDATA = {
    "Bar": BarDefaultSourceData,
    "Line": LineDefaultSourceData,
    "Pie": PieDefaultSourceData,
};

export const DEFAULTOPTIONSDATA = {
    "Bar": BarDefaultOptionsData,
    "Line": LineDefaultOptionsData,
    "Pie": PieDefaultOptionsData,
}

export const CONFIGTREES = {
    "Bar": BarConfigTree,
    "Line": LineConfigTree,
    "Pie": PieConfigTree,
};

