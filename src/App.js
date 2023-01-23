
import "./Scss/_index.scss";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./Assets/boxicons-2.0.7/css/boxicons.min.css";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Routes from "./Config/Routes";



function App() {
  return (
   
       <Router>
         <Route>

                 <div>

                    <Header/>
                    
                    <Routes/>
                    
                    <Footer/>
                 </div>
         </Route>
       </Router>
  );
}

export default App;
