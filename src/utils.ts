export const getTargetIndex = (className: string): number => {
    return parseInt(className.split("_")[1]);
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