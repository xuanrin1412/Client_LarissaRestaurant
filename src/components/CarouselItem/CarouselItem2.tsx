import React from 'react'

export default function CarouselItem2({ img1, img2, img }) {
    return (
        <div className="w-full h-full flex border-2 border-black">
            <div className="w-1/3">
                <div className="h-screen ">
                    <img
                        className="h-full w-full object-cover   "
                        src={img}
                        alt=""
                    />
                </div>
            </div>
            <div className="w-1/3">
                <div className="h-screen ">
                    <img
                        className="h-full w-full object-cover   "
                        src={img1}
                        alt=""
                    />
                </div>
            </div>

            <div className="w-1/3">
                <div className="h-[81vh] ">
                    <img
                        className="h-full w-full object-cover   "
                        src={img2}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}
