/**
 * 图表注册表：每种图表在这里声明一次，下方 CHARTS / CHARTTYPES / DEFAULTOPTIONSDATA /
 * DEFAULTSOURCEDATA / CONFIGTREES 都从这个数组派生，避免到处同步。
 *
 * - name: 图表在 store / 数据库里使用的英文名（与 CHARTTYPES key 对应）
 * - displayName: 在左侧菜单上展示的名字
 * - icon: 缩略图（用于 ChartMenu）
 * - component: 实际渲染的 Vue 组件
 * - config: 右侧配置表单的 schema
 * - defaultSource / defaultOptions: 新建图表时的默认数据
 * - group: 左侧菜单分组（"Dot" 之类合并分类）
 */

import BarPng from "@/assets/chartExamples/Bar.png";
import BubblePng from "@/assets/chartExamples/Bubble.png";
import GaugePng from "@/assets/chartExamples/Gauge.png";
import LinePng from "@/assets/chartExamples/Line.png";
import PiePng from "@/assets/chartExamples/Pie.png";
import RadarPng from "@/assets/chartExamples/Radar.png";
import ScatterPng from "@/assets/chartExamples/Scatter.png";

import Bar from "./bar/Bar.vue";
import Line from "./line/Line.vue";
import Pie from "./pie/Pie.vue";
import Bubble from "./bubble/Bubble.vue";
import Basicscatter from "./basicscatter/Basicscatter.vue";
import Radar from "./radar/Radar.vue";
import Gauge from "./gauge/Gauge.vue";

import { BarDefaultOptionsData, BarDefaultSourceData } from "./bar/defaultData";
import { LineDefaultOptionsData, LineDefaultSourceData } from "./line/defaultData";
import { PieDefaultOptionsData, PieDefaultSourceData } from "./pie/defaultData";
import { BubbleDefaultOptionsData, BubbleDefaultSourceData } from "./bubble/defaultData";
import {
  BasicScatterDefaultOptionsData,
  BasicScatterDefaultSourceData,
} from "./basicscatter/defaultData";
import { RadarDefaultOptionsData, RadarDefaultSourceData } from "./radar/defaultData";
import { GaugeDefaultOptionsData, GaugeDefaultSourceData } from "./gauge/defaultData";

import BarConfig from "./bar/config";
import LineConfig from "./line/config";
import PieConfig from "./pie/config";
import BubbleConfig from "./bubble/config";
import BasicscatterConfig from "./basicscatter/config";
import RadarConfig from "./radar/config";
import GaugeConfig from "./gauge/config";

import type { DefineComponent } from "vue";

export interface ChartManifest {
  name: string;
  displayName: string;
  icon: string;
  group: string;
  component: DefineComponent<{}, {}, any>;
  defaultSource: any[];
  defaultOptions: any;
  config: unknown;
}

export const CHART_MANIFESTS: ChartManifest[] = [
  {
    name: "Bar",
    displayName: "Bar",
    icon: BarPng,
    group: "Bar",
    component: Bar,
    defaultSource: BarDefaultSourceData,
    defaultOptions: BarDefaultOptionsData,
    config: BarConfig,
  },
  {
    name: "Line",
    displayName: "Line",
    icon: LinePng,
    group: "Line",
    component: Line,
    defaultSource: LineDefaultSourceData,
    defaultOptions: LineDefaultOptionsData,
    config: LineConfig,
  },
  {
    name: "Pie",
    displayName: "Pie",
    icon: PiePng,
    group: "Pie",
    component: Pie,
    defaultSource: PieDefaultSourceData,
    defaultOptions: PieDefaultOptionsData,
    config: PieConfig,
  },
  {
    name: "BasicScatter",
    displayName: "BasicScatter",
    icon: ScatterPng,
    group: "Dot",
    component: Basicscatter,
    defaultSource: BasicScatterDefaultSourceData,
    defaultOptions: BasicScatterDefaultOptionsData,
    config: BasicscatterConfig,
  },
  {
    name: "Bubble",
    displayName: "Bubble",
    icon: BubblePng,
    group: "Dot",
    component: Bubble,
    defaultSource: BubbleDefaultSourceData,
    defaultOptions: BubbleDefaultOptionsData,
    config: BubbleConfig,
  },
  {
    name: "Radar",
    displayName: "Radar",
    icon: RadarPng,
    group: "Radar",
    component: Radar,
    defaultSource: RadarDefaultSourceData,
    defaultOptions: RadarDefaultOptionsData,
    config: RadarConfig,
  },
  {
    name: "Gauge",
    displayName: "Gauge",
    icon: GaugePng,
    group: "Gauge",
    component: Gauge,
    defaultSource: GaugeDefaultSourceData,
    defaultOptions: GaugeDefaultOptionsData,
    config: GaugeConfig,
  },
];
