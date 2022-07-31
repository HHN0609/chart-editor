import BarPng from "@/assets/chartExamples/Bar.png";
import BubblePng from "@/assets/chartExamples/Bubble.png";
import GaugePng from "@/assets/chartExamples/Gauge.png";
import LinePng from "@/assets/chartExamples/Line.png";
import PiePng from "@/assets/chartExamples/Pie.png";
import RadarPng from "@/assets/chartExamples/Radar.png";
import ScatterPng from "@/assets/chartExamples/Scatter.png";


import Bar from "@/charts/bar/Bar.vue";
import Line from "@/charts/line/Line.vue";
import Pie from "@/charts/pie/pie.vue";
import Bubble from "@/charts/bubble/Bubble.vue";
import BasicScatter from "@/charts/BasicScatter/BasicScatter.vue";
import Radar from "@/charts/Radar/Radar.vue";
import Gauge from "@/charts/Gauge/Gauge.vue";

import { BarDefaultOptionsData, BarDefaultSourceData } from "@/charts/bar/defaultData";
import { LineDefaultOptionsData, LineDefaultSourceData } from "@/charts/line/defaultData";
import { PieDefaultOptionsData, PieDefaultSourceData } from "@/charts/pie/defaultData";
import { BubbleDefaultOptionsData, BubbleDefaultSourceData } from "@/charts/bubble/defaultData";
import { BasicScatterDefaultOptionsData, BasicScatterDefaultSourceData } from "@/charts/basicscatter/defaultData";
import { RadarDefaultOptionsData, RadarDefaultSourceData } from "@/charts/radar/defaultData";
import { GaugeDefaultOptionsData, GaugeDefaultSourceData } from "@/charts/Gauge/defaultData";

import BarConfigTree from "@/charts/bar/config";
import LineConfigTree from "@/charts/line/config";
import PieConfigTree from "@/charts/pie/config";
import BubbleConfigTree from "@/charts/bubble/config";
import BasicScatterConfigTree from "@/charts/basicscatter/config";
import RadarConfigTree from "@/charts/Radar/config";
import GaugeConfigTree from "@/charts/Gauge/config";

// export const CHARTTYPES = [
//     "Bar",
//     "Line",
//     "Pie",
//     "Bubble",
//     "BasicScatter",
//     "Radar",
//     "Gauge"
// ];

export const CHARTTYPES: [string, any[]][] = [
    ["Bar", [ ["Bar", BarPng] ]],
    ["Line", [ ["Line", LinePng] ]],
    ["Pie", [ ["Pie", PiePng] ]],
    ["Dot", [ ["BasicScatter", ScatterPng], ["Bubble", BubblePng] ]],
    ["Radar", [ ["Radar", RadarPng] ]],
    ["Gauge", [ ["Gauge", GaugePng] ]],
];

export const CHARTS = {
    Bar,
    Line,
    Pie,
    Bubble,
    BasicScatter,
    Radar,
    Gauge,
};

export const DEFAULTSOURCEDATA = {
    "Bar": BarDefaultSourceData,
    "Line": LineDefaultSourceData,
    "Pie": PieDefaultSourceData,
    "Bubble": BubbleDefaultSourceData,
    "BasicScatter": BasicScatterDefaultSourceData,
    "Radar": RadarDefaultSourceData,
    "Gauge": GaugeDefaultSourceData,
};

export const DEFAULTOPTIONSDATA = {
    "Bar": BarDefaultOptionsData,
    "Line": LineDefaultOptionsData,
    "Pie": PieDefaultOptionsData,
    "Bubble": BubbleDefaultOptionsData,
    "BasicScatter": BasicScatterDefaultOptionsData,
    "Radar": RadarDefaultOptionsData,
    "Gauge": GaugeDefaultOptionsData,
};

export const CONFIGTREES = {
    "Bar": BarConfigTree,
    "Line": LineConfigTree,
    "Pie": PieConfigTree,
    "Bubble": BubbleConfigTree,
    "BasicScatter": BasicScatterConfigTree,
    "Radar": RadarConfigTree,
    "Gauge": GaugeConfigTree,
};

