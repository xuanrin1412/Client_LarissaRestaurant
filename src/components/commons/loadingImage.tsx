export const LoadingImage = () => {
    return <div className="absolute top-0 left-0 h-full w-full flex items-center justify-center !z-[99999]">
        <div className="cssload-main">
            <div className="cssload-heart">
                <span className="cssload-heartL"></span>
                <span className="cssload-heartR"></span>
                <span className="cssload-square"></span>
            </div>
            <div className="cssload-shadow"></div>
        </div>
    </div>
};
