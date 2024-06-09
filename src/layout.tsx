import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { ScrollTop } from "./components/commons/ScrollTop"
import Footer from './components/footer/Footer';
import { useEffect, useState } from 'react';

interface LayoutProps {
    children: React.ReactNode; // Specify children of type React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();


    const shouldHideNavBar = () => {
        const hideOnPaths = ['/login', '/register', '/404']; // Array of paths to hide on
        return hideOnPaths.some((path) => location.pathname.startsWith(path));
    };

    const shouldHideNavFooter = () => {
        const hideOnPaths = ['/login', '/register', '/404', '/manager', '/order', '/menuOrderTable']; // Array of paths to hide on
        return hideOnPaths.some((path) => location.pathname.startsWith(path));
    };

    const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false)
    const handleScrollTop = () => {
        if (window.scrollY > 300) {
            setShowScrollBtn(true)
        } else {
            setShowScrollBtn(false)
        }
    }

    const handleClickScrollTop = ()=>{
      const scrollElement = window.document.getElementById("scrollTop")
      if(scrollElement){
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
      }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScrollTop)
        return () => {
            window.removeEventListener("scroll", handleScrollTop)
        }
    }, [showScrollBtn])


    return (
        <div className="layout relative">
            {!shouldHideNavBar() && <Navbar />}
            <Outlet />  {/* Placeholder for nested routes */}
            {children}  {/* Render any additional content passed as props */}
            {!shouldHideNavFooter() && <Footer />}
            {showScrollBtn && <ScrollTop idName="scrollTop" onclick={()=>handleClickScrollTop()} />}
        </div>
    );
};

export default Layout;
