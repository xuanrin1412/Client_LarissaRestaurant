import React from 'react'

export default function CarouselItem3({ img, img1, img2 }) {
    return (
        <div className="w-full h-full flex border-2 border-black">
            <div className="w-1/3 ">
                <div className="h-screen  w-full ">
                    <img
                        className="h-full w-full object-cover"
                        src={img}
                        alt=""
                    />
                </div>
            </div>
            <div className="w-1/3">
                <div className="h-screen  w-full ">
                    <img
                        className="h-full w-full object-cover "
                        src={img1}
                        alt=""
                    />
                </div>
            </div>
            <div className="w-1/3 ">
                <div className="h-screen  w-full ">
                    <img
                        className="h-full w-full object-cover"
                        src={img2}
                        alt=""
                    />
                </div>
            </div>
        </div>
    )
}
