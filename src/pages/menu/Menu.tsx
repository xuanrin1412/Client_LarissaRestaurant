import { IMenu } from "../../common/type";
import { useEffect, useRef, useState } from "react";
import { getCategoryWFood } from "../../Redux/foodsSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../Redux/store";

const Menu: React.FC = () => {
    const dispatch = useAppDispatch();
    const [showCategoryBar, setShowCategoryBar] = useState<boolean>(false);
    const [activeCategory, setActiveCategory] = useState<string>();
    const categoryRefs = useRef<{ [key: string]: HTMLDivElement }>({});
    const categoryWFood: IMenu[] = useAppSelector((state: RootState) => state.foods.categoryWFood);

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

        categoryWFood.forEach(category => {
            const ref = categoryRefs.current[category.categoryName];
            if (ref) {
                observer.observe(ref);
            }
        });

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
                <div className="absolute top-[30px] left-10 ">
                    <div className="fixed w-[400px] flex flex-row">
                        {categoryWFood.map((category, categoryIndex) => (
                            <div data-aos="fade-right" className="box-shadow" key={categoryIndex}>
                                {category.food.length > 0 && (
                                    <div
                                        onClick={() => handleClickMenu(category.categoryName)}
                                        className={`btnChooseCate  ${activeCategory === category.categoryName ? "bg-red-600 text-white" : "bg-white"}`}
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
                <div key={categoryIndex} className="mb-20 first:mt-20">
                    <div
                        id={category.categoryName}
                        ref={el => categoryRefs.current[category.categoryName] = el!}
                        className="animate__animated animate__tada  scroll-mt-20 text-4xl font-bold text-center mb-10"
                    >
                        {category.categoryName}
                    </div>
                    <div className="w-11/12 mx-auto grid grid-cols-2 flex-wrap ">
                        {category.food.map((item, index) => (
                            <div key={index} className={`${index % 2 === 0 ? "border-r-2" : ""}  flex items-center px-8 py-5`}>
                                <div className="h-52 w-52">
                                    <img
                                        className="h-full w-full object-cover rounded-full"
                                        src={item.picture}
                                        alt={item.foodName}
                                    />
                                </div>
                                <div className="flex-1 px-4 space-y-2">
                                    <div className="flex justify-between text-xl">
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
