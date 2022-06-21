import { reactive, onMounted, ref } from "vue";
import { MoveableOptions } from "vue3-moveable";

export default function useMoveable(selector: string) {
    let moveable = ref();
    const moveableOptions = reactive<Partial<MoveableOptions>>({
        target: "",
        draggable: true,
        rotatable: true,
        resizable: true,
        snapContainer: null,
        snappable: true,
        snapDirections: true,
        elementSnapDirections: true,
        isDisplayInnerSnapDigit: true,
        isDisplaySnapDigit: true,
        bounds: { left: 0, right: 800, top: 0, bottom: 450},
    });
}