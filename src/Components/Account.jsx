import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { authLogout } from '../Redux/Auth/authSlide';
import '../Scss/Component/_account.scss';

const Account = ({currentUser}) => {
  const dispatch = useDispatch()

  const [active , setActive] = useState(false)

  return (
    
    <div className="account" >
        <img className = "account__avt" src= {currentUser.photoURL} alt="" onClick={() => setActive(!active)}/>
        <ul className= {`account__submenu ${active ? 'active' : ''}`} >
           <Link to="/favoritevideo" > <li className = "account__text" >Phim yêu thích</li></Link>
            <li className = "account__text"   onClick={() => dispatch(authLogout())}>Đăng xuất</li>
        </ul>
    </div>
  )
}

export default Account