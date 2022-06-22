import { reactive, onMounted, ref } from "vue";
import InfiniteViewer, { InfiniteViewerOptions } from "infinite-viewer";
export default function useInfiniteView () {
    let Viewer = ref();
    let viewerOptions = reactive<Partial<InfiniteViewerOptions>>({
        rangeX: [-1000, 1000],
        rangeY: [-1000, 1000],
        usePinch: true,
        maxPinchWheel: 10,
        zoom: 1,
    })

    onMounted(() => {
       console.log("Viewer: ", Viewer.value) 
    })
    return {
        // infiniteViewer: Viewer.value.infiniteViewer as InfiniteViewer,
        Viewer,
        viewerOptions
    };
};
