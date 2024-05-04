import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

// Interface to define expected props for Layout component
interface LayoutProps {
    children: React.ReactNode; // Specify children of type React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const location = useLocation();

    const shouldHideNavFooter = () => {
        const hideOnPaths = ['/login', '/register', '/404']; // Array of paths to hide on
        return hideOnPaths.some((path) => location.pathname.startsWith(path));
    };


    return (
        <div className="layout">
            {!shouldHideNavFooter() && <Navbar />}
            <Outlet />  {/* Placeholder for nested routes */}
            {children}  {/* Render any additional content passed as props */}
            {!shouldHideNavFooter() && <Footer />}
        </div>
    );
};

export default Layout;
