import React from 'react';
import {Route , Switch} from 'react-router-dom';
import Catalog from '../Pages/Catalog';
import Detail from '../Pages/Detail';
import Home from '../Pages/Home';
import Video from "../Pages/Video";
import Chooseseason from "../Pages/Chooseseason";
import Login from "../Pages/Login";
import Register from '../Pages/Register'
import FavoriteVideo from "../Pages/FavoriteVideo";
const Routes = () => {
  return (
      <Switch>

           <Route
               path="/login"
               component = {Login}
               exact
           />


            <Route
               path="/favoritevideo"
               component = {FavoriteVideo}
           />



          <Route
               path="/register"
               component = {Register}
               exact
           />

           <Route
               path="/category/search/:keyword"
               component = {Catalog}
           />

            <Route
               path="/:category/:id"
               component = {Detail}
               exact
           />


            <Route
               path="/:category"
               exact
               component = {Catalog}
           />

           <Route
               path="/:category/:id/video/:season/:numberepisode/:idepisode"
               exact
               component = {Video}
           />


          <Route
               path="/:category/:id/video"
               exact
               component = {Video}
           />


          <Route
               path="/:category/:id/chooseseason"
               exact
               component = {Chooseseason}
           />

            <Route
               path="/"
               exact 
               component = {Home}
           />


         </Switch>
  )
}

export default Routes