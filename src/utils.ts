export const getTargetIndex = (className: string): number => {
    return parseInt(className.split("_")[1]);
}

export const destructTransform = (transform: string) => {
    let res = {
        x: 0,
        y: 0,
        rotate: 0,
    }
    let temp = transform.split(" translate(")[1].split(" rotate(");
    let a = temp[0].split(", ");
    res.x = parseFloat(a[0]);
    res.y = parseFloat(a[1]);
    res.rotate = parseFloat(temp[1]);
    return res;
}

export const getCookies = () => {
    if(document.cookie.length === 0) return {};
    return  Object.fromEntries(document.cookie.split("; ").map((item) => {
        return item.split("=")
    }));
}

export const getCookie = (name: string) => {
    return getCookies()[name]
}

export const setCookie = (name: string, value: string, days: number) => {
    let expire = new Date();
    expire.setTime(expire.getTime() + days*24*60*60*1000);
    document.cookie = `${name}=${value};expires=${expire.toUTCString()}`;
}

export const deleteCookie = (name: string) => {
    let value = getCookie(name);
    if(value){
        setCookie(name, value, -1);
    }
}

export const clearAllCookies = () => {
    let cookies = getCookies();
    Object.keys(cookies).forEach((key) => {
        deleteCookie(key);
    })
}

export function generateUUID(): string{
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}

export function getSacleAndDimensions(data: object[]){
    // 这里要注意对象属性的遍历是没顺序的
    let scale = [];
    let dimensions = [];
    for(let [key, value] of Object.entries(data[0])){
        // console.log(key, value)
        if(typeof value === "string"){
            dimensions.push(key);
        } else {
            scale.push(key);
        }
    }
    return {
        scale,
        dimensions
    };
}

// 防抖函数
export function debounce(fn: Function, delay: number): any{
    let timer = Date.now();
    let _this = this;
    return function (...args: any[]) {
        console.log(Date.now() - timer);
        if(Date.now() - timer >= delay){
            timer = Date.now();
            fn.apply(_this, args);
        }
    }
}

// 节流函数
export function throttle(func, wait) {
    let previous = 0;
    return function (...args) {
        let now = Date.now();
        let context = this;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

export function _get(obj, dataIndex: string): any{
    let indexArr = dataIndex.split(".");
    if(indexArr[0] === "") return obj;
    let p = obj;
    for(let property of indexArr){
        p = p[property];
    }
    return p;
}

export function _set(obj, dataIndex: string, newValue): any{
    let indexArr = dataIndex.split(".");
    let lastProperty = indexArr.pop();
    let p = obj;
    for(let property of indexArr){
        p = p[property];
    }
    p[lastProperty] = newValue;
}

export class EventEmitter {
    public message;
    constructor() {
        this.message = new Map();
    }

    /**
     * 订阅事件及其回调函数
     * @param {string} type 事件名
     * @param {Function} callback 事件对应的回调函数
     */
    $on(type, callback) {
        if(!type || !callback) return;
        if (this.message.has(type)) {
            this.message.get(type).push(callback);
        } else {
            this.message.set(type, [ callback ]);
        }
    }

    /**
     * 取消订阅事件及其回调函数，callback为空时候清除全部事件
     * @param {string} type 事件名
     * @param {Function} callback 事件对应的回调函数
     */
    $off(type, callback?) {
        if(!type) return;
        if(!this.message.has(type)) {
            console.error("No such type!");
            return;
        }
        let cbs = this.message.get(type);
        if (callback) {
            let index = cbs.indexOf(callback);
            cbs.splice(index, 1);
            if(cbs.length === 0) this.message.delete(type);
        } else {
            this.message.clear(type);
        }
    }

    /**
     * 触发订阅事件的回调函数
     * @param {string} type 事件名
     */
    $emit(type, ...args) {
        if(!this.message.has(type)){
            console.error("No such type!");
            return;  
        } 
        this.message.get(type).forEach((callback) => {
            callback(...args);
        })
    }
}

export const emitter = new EventEmitter();

export const COMMON_TIME_FORMAT: RegExp[] = [
    /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
    /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
    /^\d{2}\/\d{2}\/\d{4}$/, // DD/MM/YYYY
    /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
    /^\d{4}\.\d{2}\.\d{2}$/, // YYYY.MM.DD
    /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/, // YYYY-MM-DD HH:MM:SS
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/, // YYYY-MM-DDTHH:MM:SS (ISO-8601)
];

export function isDateTime(data: any): boolean {
    for(let r of COMMON_TIME_FORMAT) {
        if(r.test(data)) {
            return true;
        }
    }
    return false;
}


export function isNumericData(data: any): boolean {
          // Check if the item is already a number
        if (typeof data === 'number') {
            return true;
        }

        // Check if the item can be converted into a number
        const number = parseFloat(data);
        return !isNaN(number) && isFinite(data);
}
