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

export function generateUUID(){
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    });
    return uuid;
}