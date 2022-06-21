import Guides from "@scena/guides";
import { onMounted, onUnmounted, reactive, ref } from "vue";

const rulerStyle = {
    horizontal: { left: "30px", width: "calc(100% - 30px)", height: "30px" },
    vertical: { top: "30px", height: "calc(100% - 30px)", width: "30px" }
}

export default function useGuide (selector: string, orient: "vertical" | "horizontal") {
    let guide = ref<Guides>();
    const guideResizeHandle = () => {
        guide.value.resize();
    };
    onMounted(() => {
        guide.value = new Guides(
            document.querySelector(selector),
            {
                type: orient,
                rulerStyle: rulerStyle[orient]
            }
        );
        window.addEventListener("resize", guideResizeHandle);
    });
    onUnmounted(() => {
        window.removeEventListener("resize", guideResizeHandle);
    });
    return guide;
}