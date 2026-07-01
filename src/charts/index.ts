/**
 * 图表相关常量：基于 manifest.ts 派生。
 * 下方导出的 5 个变量与旧版 API 保持完全一致，调用方无需改动。
 */

import { CHART_MANIFESTS, type ChartManifest } from "./manifest";

/** 组件 map：name -> Vue component */
export const CHARTS: Record<string, ChartManifest["component"]> = CHART_MANIFESTS.reduce(
  (acc, m) => ({ ...acc, [m.name]: m.component }),
  {} as Record<string, ChartManifest["component"]>
);

/** 默认 source data map */
export const DEFAULTSOURCEDATA: Record<string, any[]> = CHART_MANIFESTS.reduce(
  (acc, m) => ({ ...acc, [m.name]: m.defaultSource }),
  {} as Record<string, any[]>
);

/** 默认 options data map */
export const DEFAULTOPTIONSDATA: Record<string, any> = CHART_MANIFESTS.reduce(
  (acc, m) => ({ ...acc, [m.name]: m.defaultOptions }),
  {} as Record<string, any>
);

/** 配置表单 schema map */
export const CONFIGTREES: Record<string, unknown> = CHART_MANIFESTS.reduce(
  (acc, m) => ({ ...acc, [m.name]: m.config }),
  {} as Record<string, unknown>
);

/**
 * 左侧菜单渲染用的元数据。按 group 聚合：
 *   ["Bar",   [["Bar", icon]]]
 *   ["Dot",   [["BasicScatter", icon], ["Bubble", icon]]]
 */
export const CHARTTYPES: [string, [string, string][]][] = (() => {
  const groups = new Map<string, [string, string][]>();
  for (const m of CHART_MANIFESTS) {
    const item: [string, string] = [m.displayName, m.icon];
    const list = groups.get(m.group);
    if (list) list.push(item);
    else groups.set(m.group, [item]);
  }
  return Array.from(groups.entries());
})();

export type { ChartManifest };
export { CHART_MANIFESTS };
