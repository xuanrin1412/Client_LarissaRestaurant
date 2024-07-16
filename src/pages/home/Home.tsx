import { useEffect } from "react";
import BannerIntro from "./bannerIntro/BannerIntro";
import Intro from "./intro/intro";
import io from 'socket.io-client';
import Carouselll from "../../components/Carouselll";
const socket = io('http://localhost:3004');

function Home() {
    useEffect(() => {
        console.log("jjjj", socket);
        socket.on('hievent', (msg) => {
            console.log("msg", msg);

        });

    })

    return <div >
        <BannerIntro />
        <Carouselll/>
        <Intro />
    </div>;
}
export default Home;
