import Helmet from '../Components/Helmet';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../Apitmbd/tmdbApi';
import apiConfig from '../Apitmbd/apiConfig';
import "../Scss/Component/_chooseseason.scss";
import {Link} from "react-router-dom";

const Chooseseason = () => {

  const { category, id } = useParams()
  const [seasons , SetSeasons] =  useState([])

  useEffect(() => {
    const getSeason = async () => {
      try {
        const response = await tmdbApi.detail(category, id, {params:{}});
        const result = response.seasons.filter(season => season.season_number > 0 && season.poster_path !== null)
        SetSeasons(result)
      } catch (error) {
        console.log(error);
      }
    }
    getSeason();
}, [category, id])

  return (
    <Helmet title = {"Chọn season"}>
        <div  className="season" >
            <ul className="season__list"> <h2 className="mb-3" >SEASONS</h2> 
                    {
                      seasons.map((item , index) => {
                        return (
                        
                          <>
                            <Link to= {`/${category}/${id}/video/${item.season_number}/${item.episode_count}/${item.id}`} >
                                
                                  <div className="season__list__item ">
                                      <div className="season__list__item__left">
                                          <img src= {`${apiConfig.w500Image(item.poster_path || item.backdrop_path)}`} alt="" />
                                      </div>

                                      <div className="season__list__item__right">
                                            <div className="season__list__item__right__name">
                                                  <h1>{item.name}</h1> 
                                            </div>
                                            <div className="season__list__item__right__episode">
                                                {item.episode_count} episode
                                            </div>
                                      </div>
                                  </div>
                                  
                            </Link> 
                          </>
                        
                        )
                      })
                    }
            </ul>
        </div>
    </Helmet>
  )
}

export default Chooseseason