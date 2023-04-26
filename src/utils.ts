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

// @numbers 包含所有数字的一维数组
// @digit 保留数值精度小数位数，默认两位小数
export function getBebeQ(numbers, digit = 2) {
    // 修复js浮点数精度误差问题
    function formulaCalc(formula, digit) {
        let pow = Math.pow(10, digit);
        return parseInt(formula * pow, 10) / pow;
    };
    let len = numbers.length;
    let sum = (a, b) => formulaCalc(a + b, digit);
    let max = Math.max.apply(null, numbers);
    let min = Math.min.apply(null, numbers);
    // 平均值
    let avg = numbers.reduce(sum) / len;
    // 计算中位数
    // 将数值从大到小顺序排列好，赋值给新数组用于计算中位数
    let sequence = [].concat(numbers).sort((a,b) => b-a);
    let mid = (len & 1) === 0 ?
        (sequence[len/2] + sequence[len/2+1]) / 2 :
        sequence[(len+1)/2];
    // 计算标准差
    // 所有数减去其平均值的平方和，再除以数组个数（或个数减一，即变异数）再把所得值开根号
    let stdDev = Math.sqrt(numbers.map(n=> (n-avg) * (n-avg)).reduce(sum) / len);
    return {
        max,
        min,
        avg: avg.toFixed(digit),
        mid: parseFloat(mid).toFixed(digit),
        stdDev : stdDev.toFixed(digit)
    }
}
