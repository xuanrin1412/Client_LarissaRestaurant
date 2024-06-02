function Intro() {

    return <div className=" my-24 ">
        <div data-aos="fade-up" className=" w-3/4 mx-auto ">
            <div className="grid grid-cols-2 ">
                <div className="border-2 border-black">
                    <img
                        src="https://discover.luxury/wp-content/uploads/2017/05/Ossiano-1024x675.jpg"
                        className=" object-cover"
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
                <div className="border-2 border-black">
                    <img
                        src="https://i.pinimg.com/originals/a6/9b/ab/a69bab79577ddeeb5dfb80f3efefe4d9.jpg"
                        className=" object-cover"
                        alt="Picture of the author"
                        width={200} // Add width attribute
                        height={400} // Add height attribute
                        style={{ width: '100%', height: "400px" }}

                    />
                </div>

            </div>
            <div className="grid grid-cols-2 ">
                <div className="border-2 border-black">
                    <img
                        src="https://media.istockphoto.com/id/514367840/photo/couple-holding-menu-cards.jpg?s=612x612&w=0&k=20&c=d-th1kcLqXw7RzAcVbA7Z2pmkfiqDvqF39pJ7E_JLFo="
                        className=" object-cover"
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
        <div>
            <div className="bg-fixed bg-no-repeat bg-cover h-[100vh] w-full  bg-[url('https://media.istockphoto.com/id/1388791676/photo/teppanyaki-style.jpg?s=612x612&w=0&k=20&c=j2QXPUQapSE9221h9Hr7XOa5ywcuJUBl3xcv7a63LRE=')]  flex justify-center items-center px-[20%]">"Với một menu đa dạng và phong phú, nhà hàng Châu Âu của chúng tôi tự hào giới thiệu những món ăn ngon và độc đáo từ nhiều quốc gia Châu Âu. Từ món Cordon Bleu Pháp truyền thống, Steak Diane của Ý đến quiche trứ danh của Đức, chúng tôi cam kết mang đến cho bạn một trải nghiệm ẩm thực đầy hấp dẫn."</div>
        </div>
        <div className="h-full my-4 w-3/4 mx-auto bg-orange-300 grid grid-cols-2">
            <div>
                {/* <Image /> */}
                <div>
                    <img src="https://t3.ftcdn.net/jpg/03/78/83/06/360_F_378830662_9HmUjeDNEnjAlLOuxoAqEF54OispMDmM.jpg" alt="" />
                    <div>giwosi thieu ve thuc don </div>
                    <button>xem thuc don</button>
                </div>
            </div>
            <div>
                <img src="https://niococktails.co.uk/cdn/shop/articles/m-s-meeuwesen-QYWYnzvPTAQ-unsplash.jpg?v=1606153942" alt="" />
                <div>giwosi thieu ve mon nuoc </div>
                <button>xem thuc don nuoc</button>
            </div>
        </div>
    </div>;
}

export default Intro;
