import NotFount from "../pages/404/NotFount";
import Account from "../pages/account/Account";
import BookATable from "../pages/bookATable/BookATable";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Manager from "../pages/manager/Manager";
import Menu from "../pages/menu/Menu";
import MenuOrderTable from "../pages/menuOrderTable/MenuOrderTable";
import Order from "../pages/order/Order";
import OrderFood from "../pages/order/orderFood/OrderFood";
import Register from "../pages/register/Register";

const LinkPage = [
    {
        link: "/",
        element: <Home />
    },
    {
        link: "/manager",
        element: <Manager />
    },
    {
        link: "/menu",
        element: <Menu />
    },
    {
        link: "/menuOrderTable",
        element: <MenuOrderTable />
    },
    {
        link: "/order/:id",
        element: <OrderFood />
    },
    {
        link: "/order",
        element: <Order />
    },
    {
        link: "/book-a-table",
        element: <BookATable />
    },
    {
        link: "/login",
        element: <Login />
    },
    {
        link: "/register",
        element: <Register />
    },
    {
        link: "/account",
        element: <Account />
    },
    {
        link: "/404",
        element: <NotFount />
    },
]

export default LinkPage