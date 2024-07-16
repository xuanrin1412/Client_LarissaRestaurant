import React, { useEffect, useState } from 'react'
import pic1 from './pic/pic1.jpg'
import CarouselItem1 from './CarouselItem/CarouselItem1'
import CarouselItem3 from './CarouselItem/CarouselItem3'
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
// import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
// import ChevronRightIcon from '@mui/icons-material/ChevronRight'
function Carouselll() {
    const slides = [
        <CarouselItem3
            img={
                'https://images.pexels.com/photos/541216/pexels-photo-541216.jpeg?cs=srgb&dl=pexels-flodahm-541216.jpg&fm=jpg'
            }
            img1={
                'https://images8.alphacoders.com/117/1170300.jpg'
            }
            img2={
                'https://images.alphacoders.com/235/thumb-1920-235743.jpg'
            }
        />,
        <CarouselItem1
            img={"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/f3/7f/9d/turkish-mezzes-with-beautiful.jpg?w=600&h=-1&s=1"}
            img1={
                'https://images.squarespace-cdn.com/content/v1/605408379759f524fa7773b0/1617829994237-0G3A1RE0WNRH7XNU3TJP/Toscana+Restaurant+Group+Brentwood'
            }
        />,
        <CarouselItem3
            img={
                'https://img.freepik.com/premium-photo/delicious-details-closeup-food-table-with-purpose_950053-1523.jpg'
            }
            img1={
                'https://tasteofbucharest.ro/wp-content/uploads/2021/05/DSC04596_web-4k.jpg'
            }
            img2={
                'https://media.istockphoto.com/id/502840530/photo/luxury-restaurant-table-on-sunset.jpg?s=612x612&w=0&k=20&c=KMVfVojQ0UmscMmj1S-Hd2trPlw2xEXpOyn9OyWT0Mw='
            }
        />,
    ]
    const lastImg = slides.length - 1
    const [currentImg, setCurrentImg] = useState<number>(0)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImg(currentImg === lastImg ? 0 : currentImg + 1)
        }, 1700)
        return () => clearInterval(interval)
    }, [currentImg, lastImg])
    const handleLeft = () => {
        setCurrentImg(currentImg === 0 ? lastImg : currentImg - 1)
    }
    const handleRight = () => {
        setCurrentImg(currentImg === lastImg ? 0 : currentImg + 1)
    }
    const onclick = (currentImg: React.SetStateAction<number>) => {
        setCurrentImg(currentImg)
    }
    return (
        <div className=" relative w-full h-full  flex flex-wrap  mt-[50px] scroll-mt-[104px]">
            {slides[currentImg]}

            <div className=" absolute bottom-10 justify-center flex w-full space-x-3">
                {slides.map((item, index) => (
                    <span
                        key={index}
                        className={` ${
                            index === currentImg
                                ? 'h-3 w-3 bg-black opacity-100 rounded-full'
                                : 'h-3 w-3 bg-gray-300 opacity-60 rounded-full'
                        }`}
                        onClick={() => onclick(index)}
                    ></span>
                ))}
            </div>

            <div className="absolute top-[50%] w-full  flex justify-between">
                <span className="p-2 hover:bg-gray-300 hover:bg-opacity-40 hover:text-white  rounded-full" onClick={() => handleLeft()}>
                    <FaChevronLeft
                        className="text-4xl  rounded-full "
                    />
                </span>
                <span className="p-2 hover:bg-gray-300 hover:bg-opacity-40 hover:text-white  rounded-full" onClick={() => handleRight()}>
                    <FaChevronRight
                        className=" text-4xl  rounded-full "
                    />
                </span>
            </div>
        </div>
    )
}
export default Carouselll;