function BannerIntro() {

    return <div className="">
        <div className="w-full h-screen z-10 relative top-0 right-0  bg-fixed bg-no-repeat bg-cover bg-black bg-[url('https://wallpaperaccess.com/full/2614486.jpg')]">
            <h1 className="absolute top-0 left-0 w-full h-full z-50 ">
                <div data-aos="fade-up" className=" mt-40 text-center md:px-8">
                    <div className=" font-josefin font-bold text-[60px] md:text-[70px]  lg:text-[85px]  introTexShadow  text-white ">Let us take<br></br>  you on a culinary journey </div>
                    <div className=" mt-6 font-bold flex justify-center space-x-8">
                        <a href="/menu" className=" hover:bg-red-700 hover:text-white text-white border-2 border-white p-3 px-6 rounded-3xl">Discover Now</a>
                        <a href="/book-a-table" className=" bg-red-700 text-white border-2 border-white p-3 px-6 rounded-3xl">Book A Table</a>
                    </div>
                </div>
            </h1>
        </div>
    </div>;
}

export default BannerIntro;
