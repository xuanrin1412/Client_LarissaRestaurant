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
]

export default privatePage