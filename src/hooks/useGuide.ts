import Guides from "@scena/guides";
import { onMounted, onUnmounted, ref } from "vue";

const rulerStyle = {
  horizontal: { left: "30px", width: "calc(100% - 30px)", height: "30px" },
  vertical: { top: "30px", height: "calc(100% - 60px)", width: "30px" },
};

export default function useGuide(selector: string, orient: "vertical" | "horizontal") {
  const guide = ref<Guides>();
  const guideResizeHandle = () => {
    guide.value.resize();
  };
  onMounted(() => {
    guide.value = new Guides(document.querySelector(selector), {
      type: orient,
      rulerStyle: rulerStyle[orient],
    });
    window.addEventListener("resize", guideResizeHandle, {passive: true});
  });
  onUnmounted(() => {
    window.removeEventListener("resize", guideResizeHandle);
    guide.value.destroy();
  });
  return guide;
}
