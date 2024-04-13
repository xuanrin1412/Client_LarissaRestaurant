function BannerIntro() {
    return <div className="">
        <div className="w-full h-screen z-10 relative top-0 right-0  bg-fixed bg-no-repeat bg-cover   bg-[url('https://static.wixstatic.com/media/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg/v1/fill/w_1895,h_776,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg')]">
            <h1 className="  absolute top-0 left-0 w-full h-full ">
                <div className=" mt-40 text-center">
                    <div className="lobster text-[70px]  text-red-600 styleShadowBlack2">--- Let us take ---<br></br>  you on a culinary journey </div>
                    <div className=" mt-6 font-bold flex justify-center space-x-8">
                        <div className="bg-red-600 hover:bg-red-700 hover:text-white text-white border-2 border-white p-3 px-6">Discover Now</div>
                        <div className="bg-red-600 hover:bg-red-700 text-white border-2 border-white p-3 px-6">Book A Table</div>
                    </div>
                </div>
            </h1>
        </div>
    </div>;
}

export default BannerIntro;
