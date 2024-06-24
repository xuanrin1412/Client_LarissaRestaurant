import { IMenu } from "../../common/type";
import { useEffect, useRef, useState } from "react";
import { getCategoryWFood } from "../../Redux/foodsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/store";

const Menu: React.FC = () => {
    const dispatch = useAppDispatch();
    const [showCategoryBar, setShowCategoryBar] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string>();
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement }>({});
    const categoryWFood: IMenu[] = useAppSelector((state: RootState) => state.categoryWFood);
    console.log(categoryWFood);


    const scrollCategoryBar = () => {
        if (window.scrollY > 80) {
            setShowCategoryBar(true);
        } else {
            setShowCategoryBar(false);
        }
    };

    const handleClickMenu = (idName: string) => {
        const element = document.getElementById(`${idName}`);
        if (element) {
            setActiveCategory(idName);
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                }
            });
        }, { threshold: 0.5 });



        return () => {
            categoryWFood.forEach(category => {
                const ref = categoryRefs.current[category.categoryName];
                if (ref) {
                    observer.unobserve(ref);
                }
            });
        };
    }, [categoryWFood]);

    useEffect(() => {
        dispatch(getCategoryWFood());

        window.addEventListener("scroll", scrollCategoryBar);
        return () => {
            window.removeEventListener("scroll", scrollCategoryBar);
        };
    }, [dispatch, showCategoryBar]);

    return (
        <div className="mt-header">
            {/* <div data-aos="zoom-in" className="banner text-white font-greatVibes text-4xl mb-10">
                The Taste Of The Food Life
            </div> */}
            {showCategoryBar && (
                <div className="absolute top-0 left-0 lg:top-[30px] lg:left-10 z-50 ">
                    <div className="fixed w-[400px] flex flex-row">
                        {categoryWFood.map((category, categoryIndex) => (
                            <div data-aos="fade-right" className="box-shadow" key={categoryIndex}>
                                {category.food.length > 0 && (
                                    <div
                                        onClick={() => handleClickMenu(category.categoryName)}
                                        className={`btnChooseCate  sm:text-xl  ${activeCategory === category.categoryName ? "bg-red-600 text-white" : "bg-white"}`}
                                    >
                                        {category.categoryName}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {categoryWFood.filter(category => category.food.length > 0).map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-10 lg:mb-20 first:mt-20">
                    <div
                        id={category.categoryName}
                        ref={el => categoryRefs.current[category.categoryName] = el!}
                        className="animate__animated animate__tada scroll-mt-28  lg:scroll-mt-20  text-3xl sm:text-4xl font-bold text-center lg:mb-10"
                    >
                        {category.categoryName}
                    </div>
                    <div className="w-11/12 lg:w-[95%] xl:w-11/12 mx-auto grid lg:grid-cols-2 flex-wrap ">
                        {category.food.map((item, index) => (
                            <div key={index} className={`${index % 2 === 0 ? "lg:border-r-2" : ""}  flex flex-col sm:flex-row items-center px-2 sm:px-4 md:px-8 py-5`}>
                                <div className="flex w-full sm:w-fit  items-center justify-start space-x-6">
                                    <div className="w-36  h-36 sm:w-52 sm:h-52 ">
                                        <img
                                            className="h-full w-full object-cover rounded-full"
                                            src={item.picture}
                                            alt={item.foodName}
                                        />
                                    </div>
                                    <div className="flex sm:hidden flex-col justify-between text-xl flex-wrap w-full max-w-[160px]">
                                        <div className="font-bold ">{item.foodName}</div>
                                        {item.revenue && <div className="font-bold">{item.revenue}k</div>}
                                    </div>
                                </div>
                                <div className="flex-1 pl-4  px-0 md:px-4  space-y-2 pt-2 sm:pt-0">
                                    <div className="hidden sm:flex justify-between text-xl">
                                        <div className="font-bold">{item.foodName}</div>
                                        {item.revenue && <div className="font-bold">{item.revenue}k</div>}
                                    </div>
                                    <div className="text-justify">{item.description || "No description available"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menu;
