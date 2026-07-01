/**
 * Cookie 读写工具。所有写入到 document.cookie；
 * 读取时按 `; ` 拆分键值对，方便一次性拿到所有 cookie。
 */

export type CookieMap = Record<string, string>;

export const getCookies = (): CookieMap => {
  if (document.cookie.length === 0) return {};
  return Object.fromEntries(document.cookie.split("; ").map((item) => item.split("=")));
};

export const getCookie = (name: string): string | undefined => {
  return getCookies()[name];
};

export const setCookie = (name: string, value: string, days: number): void => {
  const expire = new Date();
  expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expire.toUTCString()}`;
};

export const deleteCookie = (name: string): void => {
  const value = getCookie(name);
  if (value) {
    setCookie(name, value, -1);
  }
};

export const clearAllCookies = (): void => {
  const cookies = getCookies();
  Object.keys(cookies).forEach((key) => deleteCookie(key));
};
