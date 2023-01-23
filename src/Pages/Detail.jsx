import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../Apitmbd/tmdbApi';
import apiConfig from '../Apitmbd/apiConfig';
import '../Scss/Component/_detail.scss';
import CastList from '../Components/CastList';
import "../Components/Button";
import MovieList from '../Components/MovieList';
import Button from '../Components/Button';
import {useHistory} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {addVideo} from "../Redux/Favorite/favoriteSlice";
import {TrailerModal} from "../Components/HeroSlide";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Helmet from '../Components/Helmet';

const Detail = () => {

    const { category, id } = useParams()

    const [item, setItem] = useState(null)

    const [season , SetSeason] =  useState("");

    const [numberepisode , Setnumberepisode] = useState("")

    const hisrory = useHistory()

    const dispatch = useDispatch()

    
    useEffect(() => {
        const getDetail = async () => {
            const response = await tmdbApi.detail(category, id, {params:{}})
            setItem(response)
            response.number_of_episodes ? Setnumberepisode(response.number_of_episodes) : Setnumberepisode(numberepisode)
            response.number_of_seasons ? SetSeason(response.number_of_seasons) : SetSeason(season)
            window.scrollTo(0,0)
        }
        getDetail()
    }, [category, id])

    let link = ''
    
    if(category === "movie"){

       link = '/' + category + '/' + id + '/' + 'video' 

    }else {

       link = '/' + category + '/' + id + '/' + 'chooseseason'
    }
    const gotoVideo = () => {
         
           hisrory.push(link)
    }


    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item._id}`)
        const videos = await tmdbApi.getVideos(category, item.id)


        if (videos.results.length > 0) {
            const videosrc = 'https://www.youtube.com/embed/' + videos.results[0].key
            modal.querySelector('.modal__content > iframe').setAttribute('src', videosrc)
        } else {
            modal.querySelector('.modal__content__text').innerHTML = "Không có trailer"
        }

        modal.classList.toggle('active')
    }

    const handelfavoriteVideo = async () => {
       await dispatch(addVideo({...item , category}))
       toast.success("Success !", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       })
       
    }

    return (
      
        <Helmet title= {item?.title}>
        
            {
                item && (
                    <>
                    
                        <div className="banner" style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}></div>
                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img" style={{backgroundImage: `url(${apiConfig.originalImage(item.poster_path || item.backdrop_path)})`}}></div>
                            </div>
                            <div className="movie-content__info">
                                <h1 className="title">
                                    {item.title || item.name}
                                </h1>
                                <div className="genres">
                                    {
                                        item.genres && item.genres.map((genre, i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <CastList id={item.id}/>
                                </div>
                             
                                      <Button  onClick={() => gotoVideo()} >Watch</Button>
                                      
                                      <Button onClick={() => setModalActive()}>Watch Trailer</Button>
                                      
                                      <Button onClick={() => handelfavoriteVideo()}>Like</Button>
                              
                            </div>

                        </div>
                        <div className="container">
                           
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar</h2>
                                </div>
                                <MovieList category={category} type="similar" id={item.id}/>
                            </div>
                            
                        </div>
                        <TrailerModal  item={item} />
                    </>
                )
            }

            
                <ToastContainer/>
        </Helmet>
    );
}

export default Detail;