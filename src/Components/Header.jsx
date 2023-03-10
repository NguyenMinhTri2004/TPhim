import React, { useRef, useEffect  } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Scss/Component/_header.scss';
import {OutlineButton} from "../Components/Button";
import {useSelector} from "react-redux";
import Account from "../Components/Account";
import logo from '../Assets/tmovie.png';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movie',
        path: '/movie'
    },
    {
        display: 'TV',
        path: '/tv'
    },


];

const Header = () => {

    const { pathname } = useLocation()

    const headerRef = useRef(null)

    const active = headerNav.findIndex(e => e.path === pathname)

    const currentUser = useSelector(state => state.auth.currentUser)

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                headerRef.current.classList.add('shrink');
            } else {
                headerRef.current.classList.remove('shrink');
            }
        }
        window.addEventListener('scroll', shrinkHeader)
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    }, [])

   


    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">TPhim</Link>
                </div>

                <ul className="header__nav">
                    {
                        headerNav.map((e, i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path}>
                                    {e.display}
                                </Link>
                            </li>
                        ))


                    }

                {
                    currentUser ? (
                        <>
                           
                            <Account currentUser = {currentUser}/>
                        </>
                    ) : (
                        <>
                                <Link to = {"/login"} >
                                <OutlineButton>Login</OutlineButton>
                                </Link>
                        </>
                    )
                }
                </ul>
            </div>
        </div>
    );
}

export default Header;