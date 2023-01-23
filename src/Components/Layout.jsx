import React from 'react';
import "../Scss/_index.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "../Assets/boxicons-2.0.7/css/boxicons.min.css";
import {BrowserRouter , Route} from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Routes from "../Config/Routes";

const Layout = () => {
  return (
    <BrowserRouter>
    <Route render={props => (
           <div>

              <Header {...props}/>
              <>
              <Routes/>
              </>
              <Footer/>
           </div>
         
    )}/>
 </BrowserRouter>
  )
}

export default Layout