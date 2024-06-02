import { BrowserRouter, Routes, Route, } from "react-router-dom";
import PrivatePage from "./common/navigate"
import Layout from "./layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import PrivateRoute from "./utils/privateRote"
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Account from "./pages/account/Account";
import NotFount from "./pages/404/NotFount";
import BookATable from "./pages/bookATable/BookATable";
import Menu from "./pages/menu/Menu";
import Home from "./pages/home/Home";

function App() {

  useEffect(() => {
    AOS.init(
      // {
      //   once: true,
      //   disable: "phone",
      //   duration: 700,
      //   easing: "ease-out-cubic",
      // }
    );
  }, []);


    // {
    //     link: "/menu",
    //     element: <Menu />
    // },
        // {
    //     link: "/",
    //     element: <Home />
    // },
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<PrivateRoute />}>
            {PrivatePage.map((link) => (
              <Route key={link.link} path={link.link} element={link.element} />
            ))}
          </Route>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/account' element={<Account/>}/>
          <Route path='/book-a-table' element={<BookATable/>}/>
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/404' element={<NotFount/>}/>
          <Route
                    path="*"
                    element={<NotFount />}
                />
        </Routes>
      </Layout>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}
export default App
