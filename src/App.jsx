import "../src/index.css";
import { Route,  Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import AppointmentsPage from "./Pages/AppointmentsPage";
import ServicePage from "./Pages/ServicePage";
import SearchResultPage from "./Components/SearchResultPage";
import CartPage from "./Pages/CartPage";
import PaymentPage from "./Pages/PaymentPage";

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element = {<HomePage/>} ></Route>
          <Route path="/signup" element = {<Signup/>} ></Route>
          <Route path="/login" element = {<Login/>} ></Route>
          <Route path="/appointments" element = {<AppointmentsPage/>} ></Route>
          <Route path="/products" element = {<ServicePage/>} ></Route>
          <Route path="/products/fetchProductsByQuery" element = {<SearchResultPage/>} ></Route>
          <Route path="/cart" element={<CartPage/>}></Route>
          <Route path="/payment" element={<PaymentPage/>}></Route>
      </Routes>
      
    </>
  )
}

export default App
