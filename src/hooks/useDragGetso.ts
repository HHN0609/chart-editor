import Gesto, { OnDrag } from "gesto";
import { onMounted, onUnmounted, Ref, ref } from "vue";

export default function useDragGetso(selector: string, callback: (e: OnDrag) => void): Ref<Gesto> {
  const getso = ref<Gesto>();
  let ctrlDown = false;
  const ctrlKeyDownHandle = (event: KeyboardEvent) => {
    if (event.code === "ControlLeft") {
      ctrlDown = true;
    }
  };
  const ctrlKeyUpHandle = () => {
    ctrlDown = false;
  };
  onMounted(() => {
    window.addEventListener("keydown", ctrlKeyDownHandle);
    window.addEventListener("keyup", ctrlKeyUpHandle);
    getso.value = new Gesto(document.querySelector(selector));
    getso.value.on("drag", (e: OnDrag) => {
      if (ctrlDown) {
        callback(e);
      }
    });
  });
  onUnmounted(() => {
    getso.value.unset();
    window.removeEventListener("keydown", ctrlKeyDownHandle);
    window.removeEventListener("keyup", ctrlKeyUpHandle);
  });
  return getso;
}
