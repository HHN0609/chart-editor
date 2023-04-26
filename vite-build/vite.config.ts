import { defineConfig } from "vite";
import viteBase from "./vite.base.config";
import viteDev from "./vite.dev.config";
import viteProd from "./vite.prod.config";

const envResolve = {
    "build": () => Object.assign({}, viteBase, viteProd),
    "serve": () => Object.assign({}, viteBase, viteDev)
}

export default defineConfig(({command}) => {
    return envResolve[command]();
});