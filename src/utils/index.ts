// 聚合入口：从子模块 re-export 出去，并保留少量直接放在这里的小函数。
// 这样 `import { xxx } from "@/utils"` 仍然可用，避免改动所有调用方。

export * from "./cookie";
export * from "./event";

// ---------------- DOM / ID ----------------

/** 从形如 "tag_3" 的 className 解析下标 */
export const getTargetIndex = (className: string): number => {
  return parseInt(className.split("_")[1], 10);
};

/** 把形如 "translate(x, y) rotate(r)" 的 transform 字符串解析为对象 */
export const destructTransform = (transform: string) => {
  const res = { x: 0, y: 0, rotate: 0 };
  const temp = transform.split(" translate(")[1].split(" rotate(");
  const a = temp[0].split(", ");
  res.x = parseFloat(a[0]);
  res.y = parseFloat(a[1]);
  res.rotate = parseFloat(temp[1]);
  return res;
};

/** 生成 v4 风格 UUID */
export function generateUUID(): string {
  let d = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = ((d + Math.random() * 16) % 16) | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
}

// ---------------- Object path ----------------

/** 按点分路径读取嵌套属性，例如 _get(obj, "a.b.c") */
export function _get(obj: any, dataIndex: string): any {
  const indexArr = dataIndex.split(".");
  if (indexArr[0] === "") return obj;
  let p = obj;
  for (const property of indexArr) {
    p = p[property];
  }
  return p;
}

/** 按点分路径写入嵌套属性 */
export function _set(obj: any, dataIndex: string, newValue: any): void {
  const indexArr = dataIndex.split(".");
  const lastProperty = indexArr.pop() as string;
  let p = obj;
  for (const property of indexArr) {
    p = p[property];
  }
  p[lastProperty] = newValue;
}

// ---------------- Data shape ----------------

/** 把首行对象的字段划分为 scale(数值) / dimensions(字符串) 两组 */
export function getSacleAndDimensions(data: Record<string, any>[]) {
  const scale: string[] = [];
  const dimensions: string[] = [];
  for (const [key, value] of Object.entries(data[0])) {
    if (typeof value === "string") {
      dimensions.push(key);
    } else {
      scale.push(key);
    }
  }
  return { scale, dimensions };
}

/** 常见日期时间格式正则 */
export const COMMON_TIME_FORMAT: RegExp[] = [
  /^\d{4}-\d{1,2}-\d{1,2}$/, // YYYY-MM-DD
  /^\d{1,2}\/\d{1,2}\/\d{4}$/, // MM/DD/YYYY
  /^\d{1,2}\/\d{1,2}\/\d{4}$/, // DD/MM/YYYY
  /^\d{4}\/\d{1,2}-\d{1,2}$/, // YYYY/MM/DD (保留旧顺序，行为不变)
  /^\d{4}\.\d{1,2}\.\d{1,2}$/, // YYYY.MM.DD
  /^\d{4}-\d{1,2}-\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$/, // YYYY-MM-DD HH:MM:SS
  /^\d{4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}$/, // YYYY-MM-DDTHH:MM:SS
];

/** 判断字符串是否匹配常见日期/时间格式 */
export function isDateTime(data: any): boolean {
  for (const r of COMMON_TIME_FORMAT) {
    if (r.test(data)) return true;
  }
  return false;
}

/** 判断数据是否为数字（已为 number，或可被 parseFloat 解析） */
export function isNumericData(data: any): boolean {
  if (typeof data === "number") return true;
  const number = parseFloat(data);
  return !isNaN(number) && isFinite(data);
}

// ---------------- 函数工具 ----------------

/** 防抖：距离上次调用超过 delay 才真正执行 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer = Date.now();
  return function (this: unknown, ...args: Parameters<T>) {
    if (Date.now() - timer >= delay) {
      timer = Date.now();
      fn.apply(this, args);
    }
  };
}

/** 节流：在 wait 毫秒内最多执行一次 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let previous = 0;
  return function (this: unknown, ...args: Parameters<T>) {
    const now = Date.now();
    if (now - previous > wait) {
      previous = now;
      func.apply(this, args);
    }
  };
}
