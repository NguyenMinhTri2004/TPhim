import React from 'react';
import {useHistory} from 'react-router-dom';
import Helmet from '../Components/Helmet';
import {useDispatch , useSelector} from "react-redux";
import {authGoogleLogin} from '../Redux/Auth/authSlide';
import { addUser } from '../Redux/Auth/authSlide';
import { auth } from '../Firebase/Firebase';
import { onAuthStateChanged} from 'firebase/auth';
import { useEffect } from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Scss/Component/_login.scss";
import bg from '../Assets/footer-bg.jpg';

const Login = props => {

  const history = useHistory()
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.auth)

  useEffect(() => {
       
    const unLogin = onAuthStateChanged(auth , async (user) => {

         if(user) { 
            dispatch(addUser(user))

             if(currentUser.currentUser !== undefined  && currentUser.loading !== true) {
                 history.push("/")
             }
             
            }else {
              dispatch(addUser(undefined))
            }
        
    })

    return unLogin
} , [currentUser])
 
  
  return (
    <Helmet title = {"Đăng Nhập"}>
   <div style={{backgroundImage: `url(${bg})`}} className="login">
      <div className="login__top">
            <div className="login__top__item">
                <div className="login__top__item__img">

                </div>
            </div>
      </div>
       <div className="login__content">
       <div action="">
           <h1>Đăng nhập</h1>


            <div className="login__content__social">
                <div onClick={() => dispatch(authGoogleLogin())}  className="login__content__social__item">
                         <i class='bx bxl-google' ></i>
                </div>
            </div>
      </div>
       </div>
          
                </div>


                <ToastContainer
                    
                      
                />
               
    </Helmet>
   
    
  )
}

Login.propTypes = {}

export default Login