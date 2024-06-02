function BannerIntro() {

    return <div id="home" className="">
        <div className="w-full h-screen z-10 relative top-0 right-0  bg-fixed bg-no-repeat bg-cover bg-black bg-[url('https://wallpaperaccess.com/full/2614486.jpg')]">
            <h1 className="absolute top-0 left-0 w-full h-full z-50 ">
                <div data-aos="fade-up" className=" mt-40 text-center">
                    <div className=" font-josefin font-bold text-[85px] introTexShadow  text-white ">Let us take<br></br>  you on a culinary journey </div>
                    <div className=" mt-6 font-bold flex justify-center space-x-8">
                        <div className=" hover:bg-red-700 hover:text-white text-white border-2 border-white p-3 px-6">Discover Now</div>
                        <div className=" bg-red-700 text-white border-2 border-white p-3 px-6">Book A Table</div>
                    </div>
                </div>
            </h1>
        </div>
    </div>;
}

export default BannerIntro;
