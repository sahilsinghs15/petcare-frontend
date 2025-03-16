import "../src/index.css";
import { Route,  Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import AppointmentsPage from "./Pages/AppointmentsPage";

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element = {<HomePage/>} ></Route>
          <Route path="/signup" element = {<Signup/>} ></Route>
          <Route path="/login" element = {<Login/>} ></Route>
          <Route path="/appointments" element = {<AppointmentsPage/>} ></Route>
      </Routes>
      
    </>
  )
}

export default App
