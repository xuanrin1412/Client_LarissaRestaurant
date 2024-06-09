import { useNavigate } from "react-router-dom";

function Intro() {
    const navigate = useNavigate();
    const handleClickDrinks = ()=>{
        navigate('/menu#B');
    }
    return <div className=" my-32 ">
        <div data-aos="fade-up" className=" w-3/4 mx-auto mb-32 ">
            <div className="grid grid-cols-2 ">
                <div className="border-2 border-black rounded-3xl">
                    <img
                        src="https://discover.luxury/wp-content/uploads/2017/05/Ossiano-1024x675.jpg"
                        className=" object-cover rounded-[21px]"
                        alt="Picture of the author"
                        width={200} // Add width attribute
                        height={400} // Add height attribute
                        style={{ width: '100%', height: "400px" }}

                    />
                </div>
                <div className="flex justify-center text-blue-600 items-center px-[10%] flex-col  text-center space-y-3">
                    <span className="text-[40px] leading-10 max-w-[300px]  font-bold">Không gian ấm áp và lịch lãm</span>
                    <span className=" font-greatVibes text-[40px] font-bold leading-10">===Best Place===</span>
                    <span>"Nhà hàng Châu Âu chúng tôi là điểm đến lý tưởng cho những thực khách muốn thưởng thức ẩm thực chất lượng "</span>
                </div>
            </div>
            <div className="grid grid-cols-2  " >
                <div className=" flex justify-center text-primary items-center px-[10%] flex-col  text-center space-y-3">
                    <span className="text-[40px] leading-10 max-w-[300px]  font-bold">Tận tâm và chuyên nghiệp</span>
                    <span className=" font-greatVibes text-[40px] font-bold leading-10">{`>>> `}Fancy Service{` <<<`}</span>
                    <span>
                        "Với đội ngũ nhân viên giàu kinh nghiệm và thân thiện, nhà hàng Châu Âu cam kết mang đến cho quý khách dịch vụ tận tâm và chuyên nghiệp nhất"</span></div>
                <div className="border-2 border-black rounded-3xl">
                    <img
                        src="https://i.pinimg.com/originals/a6/9b/ab/a69bab79577ddeeb5dfb80f3efefe4d9.jpg"
                        className=" object-cover rounded-[21px]"
                        alt="Picture of the author"
                        width={200} // Add width attribute
                        height={400} // Add height attribute
                        style={{ width: '100%', height: "400px" }}
                    />
                </div>

            </div>
            <div className="grid grid-cols-2 ">
                <div className="border-2 border-black rounded-3xl">
                    <img
                        src="https://media.istockphoto.com/id/514367840/photo/couple-holding-menu-cards.jpg?s=612x612&w=0&k=20&c=d-th1kcLqXw7RzAcVbA7Z2pmkfiqDvqF39pJ7E_JLFo="
                        className=" object-cover rounded-[21px]"
                        alt="Picture of the author"
                        width={400} // Add width attribute
                        height={400} // Add height attribute
                        style={{ width: '100%', height: "400px" }}

                    />
                </div>
                <div className=" flex justify-center text-orange-500 items-center px-[10%] flex-col  text-center space-y-3">
                    <span className="text-[40px] leading-10 max-w-[300px]  font-bold">Menu đa dạng và phong phú</span>
                    <span className=" font-greatVibes text-[40px] font-bold leading-10">***Diverse Menu***</span>
                    <span>"Với một menu đa dạng và phong phú, nhà hàng Châu Âu của chúng tôi tự hào giới thiệu những món ăn ngon và độc đáo từ nhiều quốc gia Châu Âu."</span></div>
            </div>
        </div>

        <div className="bg-fixed bg-no-repeat bg-center bg-cover h-[130vh] w-full  mb-32
            bg-[url('https://www.winesunfiltered.com/wp-content/uploads/2023/09/well-done-pork-steak-cutting-board-two-glasses-dry-red-wine-dinner-two-place-text-scaled.jpg')] 
            flex justify-end pr-[8%]">
            <div className=" h-full flex items-center justify-end max-w-[400px]  font-greatVibes  text-white text-5xl tracking-[10px]">

                "Lấy cảm hứng từ các món bò Châu Âu chúng tôi đã tạo nên Jump Steak tươi ngon ! "
            </div>
        </div>

        <div className="h-full mt-32 w-3/4 mx-auto border-2 border-black grid grid-cols-2 rounded-2xl">
            <div className="relative border-r-2 border-gray-100">
                <img className="h-full w-full object-cover rounded-l-xl" src="https://images.summitmedia-digital.com/spotph/images/2023/12/13/50-great-1702427222.jpg" alt="" />
                <div className="absolute top-0 left-0 text-white h-full w-full  flex items-center justify-center">
                    <div className=" p-10 text-center ">
                        <a href="menu" className="text-2xl font-bold  py-3 px-4 bg-primary border-2 rounded-[22px] ">Export Foods</a>
                    </div>

                </div>
            </div>

            <div className="relative">
                <img className="h-full w-full object-cover rounded-r-xl" src="https://niococktails.co.uk/cdn/shop/articles/m-s-meeuwesen-QYWYnzvPTAQ-unsplash.jpg?v=1606153942" alt="" />
                <div className="absolute top-0 left-0 text-white h-full w-full  flex items-center justify-center">
                <div className="bg-white bg-opacity-20 p-10 text-center space-y-4">
                        <div className="text-5xl font-bold text-shadow-Login">Drinks</div>
                        <button onClick={()=>handleClickDrinks()} className="py-2 px-3 text-xl bg-primary border-2 border-white rounded-[22px]">Watch Menu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Intro;
