
// import { useEffect, useState } from "react";
import { Logo } from "../../assets/Logo";
import { FaRegHandPointRight } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
function Footer() {
    // const [showCategoryBar, setShowCategoryBar] = useState<boolean>(false);
    // const scrollCategoryBar = () => {
    //     if (window.scrollY > 80) {
    //         setShowCategoryBar(true);
    //     } else {
    //         setShowCategoryBar(false);
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener("scroll", scrollCategoryBar);
    //     return () => {
    //         window.removeEventListener("scroll", scrollCategoryBar);
    //     };
    // }, [showCategoryBar]);
    return <div className="p-10 md:p-14 lg:p-20  bg-black flex items-center  flex-col w-full ">
        <div className="w-full md:w-11/12 lg:w-4/5 md:mx-auto ">
            {/* LOGO */}
            <div className=" hidden md:flex font-bold text-white text-2xl md:text-4xl  items-center w-fit  text-center">
                <span className="">Larissa</span>
                <div className="h-7 w-7 md:h-10 md:w-10 mx-2">
                    <Logo color="white" />
                </div>
                <span className=" ">Restaurants</span>
            </div>
            {/* OPEN CLOSE HOUR */}
            <div className="flex flex-col md:flex-row  md:justify-between">
                <div className="text-white md:w-5/12 lg:w-1/4  flex flex-col items-center md:pt-14 text-xl">
                    <div className="text-2xl md:text-3xl bg-gradient-to-r from-[#FF006B] to-[#749BF7] bg-clip-text text-transparent font-bold">Open hours </div>
                    <div className="pt-1 md:pt-4">Monday {"-->"} Friday</div>
                    <div className="pb-6">09:00 - 22:00</div>
                    <div className="text-2xl md:text-3xl bg-gradient-to-r from-[#d63030] to-[#749BF7] bg-clip-text text-transparent font-bold">Close</div>
                    <div className="pt-0 md:pt-4">Sartuday & Sunday </div>
                </div>
                <div className="text-white w-full text-center md:w-7/12 lg:w-8/12 md:pt-14 md:text-left text-xl ">
                    <div className="py-8 md:py-0">
                        <div className="flex justify-center md:justify-start items-center space-x-2">
                            <FaPhone className="text-xl" />
                            <a href="tel:+09637016129">0967016129</a>
                        </div>
                        <div className="flex justify-center md:justify-start  items-center  space-x-2">
                            <MdEmail className="text-2xl" />
                            <a  href="mailto:xuanrin1412@gmail.com">xuanrin1412@gmail.com</a>
                        </div>
                    </div>
                    <div className="w-full flex flex-wrap md:py-8">
                        <div className="w-full flex items-center justify-center text-center md:justify-start animate-bounce">
                            <span className="pr-2">Click to get location</span>
                            <FaRegHandPointRight className="mr-4 transform rotate-90 " />
                        </div>
                        <a className="w-full" href="https://www.google.com/maps/place/79+%C4%90.+TL+08,+Th%E1%BA%A1nh+L%E1%BB%99c,+Qu%E1%BA%ADn+12,+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh,+Vietnam/@10.8568155,106.6758753,17z/data=!3m1!4b1!4m6!3m5!1s0x317528356de54113:0x9862530dacc0a67e!8m2!3d10.8568102!4d106.6784502!16s%2Fg%2F11j0pvj450?entry=ttu">79/14 TL 08 , phường Thạnh Lộc , quận 12 , HCM</a>
                    </div>
                    <div className="w-full flex flex-col items-center md:items-start">
                        <span> Follow us </span>
                        <div className=" card flex justify-center md:justify-start space-x-4">
                            <a className="social-link1">
                                <svg className="color: white bi bi-instagram" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                                     fill="#fff">
                                    </path>
                                </svg>
                            </a>
                            <a className="social-link2">
                                <svg viewBox="0 0 496 512" height="1em" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z">
                                    </path>
                                </svg> 
                            </a>
                            <a className="social-link3">
                                <svg viewBox="0 0 496 512"  className="bi bi-stack-overflow" height="1em" width="1em" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                                </svg> 
                            </a>
                            <a className="social-link4">
                                <svg viewBox="0 0 16 16" className="bi bi-stack-overflow" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.412 14.572V10.29h1.428V16H1v-5.71h1.428v4.282h9.984z"></path>
                                    <path d="M3.857 13.145h7.137v-1.428H3.857v1.428zM10.254 0 9.108.852l4.26 5.727 1.146-.852L10.254 0zm-3.54 3.377 5.484 4.567.913-1.097L7.627 2.28l-.914 1.097zM4.922 6.55l6.47 3.013.603-1.294-6.47-3.013-.603 1.294zm-.925 3.344 6.985 1.469.294-1.398-6.985-1.468-.294 1.397z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>;
}

export default Footer;
