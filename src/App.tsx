import { BrowserRouter, Routes, Route } from "react-router-dom";
import LinkPage from "./common/navigate"
import Layout from "./layout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {LinkPage.map((link) => (
            <Route key={link.link} path={link.link} element={link.element} />
          ))}
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
        theme="dark"
      />
    </BrowserRouter>
  )
}
export default App
