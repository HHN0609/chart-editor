export const getTargetIndex = (className: string): number => {
    return parseInt(className.split("_")[1]);
}