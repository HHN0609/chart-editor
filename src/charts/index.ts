import Bar from "@/charts/bar/Bar.vue";
import Line from "@/charts/line/Line.vue";
import Pie from "@/charts/pie/pie.vue";
import Scatter from "@/charts/Scatter/Scatter.vue";
import BasicScatter from "@/charts/BasicScatter/BasicScatter.vue";
import Radar from "@/charts/Radar/Radar.vue";
import Gauge from "@/charts/Gauge/Gauge.vue";
import { BarDefaultOptionsData, BarDefaultSourceData } from "@/charts/bar/defaultData";
import { LineDefaultOptionsData, LineDefaultSourceData } from "@/charts/line/defaultData";
import { PieDefaultOptionsData, PieDefaultSourceData } from "@/charts/pie/defaultData";
import { ScatterDefaultOptionsData, ScatterDefaultSourceData } from "@/charts/scatter/defaultData";
import { BasicScatterDefaultOptionsData, BasicScatterDefaultSourceData } from "@/charts/basicscatter/defaultData";
import { RadarDefaultOptionsData, RadarDefaultSourceData } from "@/charts/radar/defaultData";
import { GaugeDefaultOptionsData, GaugeDefaultSourceData } from "@/charts/Gauge/defaultData";
import BarConfigTree from "@/charts/bar/config";
import LineConfigTree from "@/charts/line/config";
import PieConfigTree from "@/charts/pie/config";
import ScatterConfigTree from "@/charts/scatter/config";
import BasicScatterConfigTree from "@/charts/basicscatter/config";
import RadarConfigTree from "@/charts/Radar/config";
import GaugeConfigTree from "@/charts/Gauge/config";
export const CHARTTYPES = [
    "Bar",
    "Line",
    "Pie",
    "Scatter",
    "BasicScatter",
    "Radar",
    "Gauge"
    // "Dot",
    // "Aera"
];

export const CHARTS = {
    Bar,
    Line,
    Pie,
    Scatter,
    BasicScatter,
    Radar,
    Gauge,
}

export const DEFAULTSOURCEDATA = {
    "Bar": BarDefaultSourceData,
    "Line": LineDefaultSourceData,
    "Pie": PieDefaultSourceData,
    "Scatter": ScatterDefaultSourceData,
    "BasicScatter": BasicScatterDefaultSourceData,
    "Radar": RadarDefaultSourceData,
    "Gauge": GaugeDefaultSourceData,
};

export const DEFAULTOPTIONSDATA = {
    "Bar": BarDefaultOptionsData,
    "Line": LineDefaultOptionsData,
    "Pie": PieDefaultOptionsData,
    "Scatter": ScatterDefaultOptionsData,
    "BasicScatter": BasicScatterDefaultOptionsData,
    "Radar": RadarDefaultOptionsData,
    "Gauge": GaugeDefaultOptionsData,
}

export const CONFIGTREES = {
    "Bar": BarConfigTree,
    "Line": LineConfigTree,
    "Pie": PieConfigTree,
    "Scatter": ScatterConfigTree,
    "BasicScatter": BasicScatterConfigTree,
    "Radar": RadarConfigTree,
    "Gauge": GaugeConfigTree,
};

