import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { GoMoveToTop } from "react-icons/go";
import Footer from './components/footer/Footer';
import { useEffect } from 'react';

interface LayoutProps {
    children: React.ReactNode; // Specify children of type React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const shouldHideNavFooter = () => {
        const hideOnPaths = ['/login', '/register', '/404']; // Array of paths to hide on
        return hideOnPaths.some((path) => location.pathname.startsWith(path));
    };
    useEffect(()=>{

    },[])


    return (
        <div className="layout relative">
            {!shouldHideNavFooter() && <Navbar />}
            <Outlet />  {/* Placeholder for nested routes */}
            {children}  {/* Render any additional content passed as props */}
            {!shouldHideNavFooter() && <Footer />}
            <div className=' z-10 absolute bottom-20 right-20   bg-red-500'>
                <div className='fixed bottom-20 right-20 '>
                    <div  className='animate-bounce scroll-smooth bg-black border-2 border-white p-3 rounded-full'><GoMoveToTop className='text-white text-xl font-bold'/></div>
                </div>
                </div>
        </div>
    );
};

export default Layout;
