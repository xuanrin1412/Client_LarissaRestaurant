function Intro() {
    return <div className="bg-pink-200 mt-10">
        <div className=" w-3/4 mx-auto ">
            <div className="grid grid-cols-2 gap-8 my-8">
                <div>
                    <img
                        src="https://static.wixstatic.com/media/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg/v1/fill/w_1895,h_776,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg"
                        className=" object-cover"
                        alt="Picture of the author"
                        width={200} // Add width attribute
                        height={400} // Add height attribute
                        style={{ width: '100%', height: "400px" }}

                    />
                </div>
                <div className="bg-gray-500 flex justify-center items-center px-[10%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, atque a itaque labore culpa reiciendis possimus at unde natus. Neque facilis debitis porro aliquid distinctio nesciunt delectus vel voluptate adipisci.</div>
            </div>
            <div className="grid grid-cols-2  gap-8 my-8" >
                <div className="bg-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, atque a itaque labore culpa reiciendis possimus at unde natus. Neque facilis debitis porro aliquid distinctio nesciunt delectus vel voluptate adipisci.</div>
                <div>
                    <img
                        src="https://static.wixstatic.com/media/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg/v1/fill/w_1895,h_776,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg"
                        className=" object-cover"
                        alt="Picture of the author"
                        width={200} // Add width attribute
                        height={400} // Add height attribute
                        style={{ width: '100%', height: "400px" }}

                    />
                </div>

            </div>
            <div className="grid grid-cols-2  gap-8 my-8">
                <div>
                    <img
                        src="https://static.wixstatic.com/media/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg/v1/fill/w_1895,h_776,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/c837a6_5b1a118ecd724316bc446ba8eee3f24e~mv2.jpg"
                        className=" object-cover"
                        alt="Picture of the author"
                        width={400} // Add width attribute
                        height={400} // Add height attribute
                        style={{ width: '100%', height: "400px" }}

                    />
                </div>
                <div className="bg-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, atque a itaque labore culpa reiciendis possimus at unde natus. Neque facilis debitis porro aliquid distinctio nesciunt delectus vel voluptate adipisci.</div>
            </div>

        </div>
        <div>
            <div className="bg-fixed bg-no-repeat bg-cover h-[100vh] w-full  bg-[url('https://wallpapers.com/images/hd/aesthetic-anime-scene-desktop-4k-0pnb65qudf5plsju.jpg')]  flex justify-center items-center px-[20%]">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit porro soluta totam natus dolores similique labore provident. Ex, quia perferendis placeat iure pariatur sapiente, tempora voluptatum eius et omnis fugit.</div>
        </div>
        <div className="h-[240px] my-4 w-3/4 mx-auto bg-orange-300 grid grid-cols-2">
            <div>
                {/* <Image /> */}
                <div>
                    <div>giwosi thieu ve thuc don </div>
                    <button>xem thuc don</button>
                </div>
            </div>
            <div>
                <div>giwosi thieu ve mon nuoc </div>
                <button>xem thuc don nuoc</button>
            </div>
        </div>


    </div>;
}

export default Intro;
