import BookATableManager from "../pages/bookATable/BookATableManager";
import Manager from "../pages/manager/Manager";
import MenuOrderTable from "../pages/menuOrderTable/MenuOrderTable";
import Order from "../pages/order/Order";
import OrderFood from "../pages/order/orderFood/OrderFood";

const privatePage = [
    {
        link: "/manager",
        element: <Manager />
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
        link: "/booking-manager",
        element: <BookATableManager />
    },
]

export default privatePage