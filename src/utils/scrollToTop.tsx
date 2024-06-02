interface setShowCategoryBar {
    setShowCategoryBar:(value: React.SetStateAction<boolean>) => void
}
export const scrollCategoryBar = ({setShowCategoryBar}:setShowCategoryBar ) => {
    if (window.scrollY > 80) {
        setShowCategoryBar(true);
    } else {
        setShowCategoryBar(false);
    }
};