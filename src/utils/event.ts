/**
 * 轻量事件总线。$on / $off / $emit 风格，模拟 Vue 2 EventBus，
 * 保留旧调用方式以便逐步替换。
 */

type EventCallback = (...args: any[]) => void;

export class EventEmitter {
  private message: Map<string, EventCallback[]>;

  constructor() {
    this.message = new Map();
  }

  /** 订阅事件及其回调函数 */
  $on(type: string, callback: EventCallback): void {
    if (!type || !callback) return;
    const handlers = this.message.get(type);
    if (handlers) {
      handlers.push(callback);
    } else {
      this.message.set(type, [callback]);
    }
  }

  /** 取消订阅事件及其回调函数，callback 为空时清除该 type 全部事件 */
  $off(type: string, callback?: EventCallback): void {
    if (!type) return;
    if (!this.message.has(type)) {
      console.error("No such type!");
      return;
    }
    const handlers = this.message.get(type);
    if (!handlers) return;
    if (callback) {
      const index = handlers.indexOf(callback);
      if (index >= 0) handlers.splice(index, 1);
      if (handlers.length === 0) this.message.delete(type);
    } else {
      this.message.delete(type);
    }
  }

  /** 触发订阅事件的回调函数 */
  $emit(type: string, ...args: any[]): void {
    const handlers = this.message.get(type);
    if (!handlers) {
      console.error("No such type!");
      return;
    }
    handlers.forEach((cb) => cb(...args));
  }
}

export const emitter = new EventEmitter();
