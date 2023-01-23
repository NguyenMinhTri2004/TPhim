import Helmet from '../Components/Helmet';
import React from 'react';
import HeroSlide from '../Components/HeroSlide';
import { Link } from 'react-router-dom';
import { OutlineButton } from '../Components/Button';
import MovieList from '../Components/MovieList';
import {category , movieType , tvType} from "../Apitmbd/tmdbApi";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from '../Components/MovieCard';
const Home = () => {

    const listVideo = useSelector(state => state.favoriteSlice.value)
    
    useEffect(() => {
        console.log(listVideo)

    }, [listVideo])

  return (
      <Helmet title='Trang chủ'>
       <HeroSlide/>

        
        {
             listVideo.length > 0 && 
             (

           <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Favorite Movies</h2>
                                <Link to="/favoritevideo">
                                    <OutlineButton className="small">View more</OutlineButton>
                                </Link>
                            </div>
                            <div className="movie-list">
                                <Swiper
                                    grabCursor={true}
                                    spaceBetween={10}
                                    slidesPerView={8}
                                    breakpoints={{

                                        320 : {
                                          slidesPerView: 2,
                                          spaceBetween: 15,
                                        },
                        
                                        640: {
                                          slidesPerView: 4,
                                          spaceBetween: 15,
                                        },
                        
                                        768: {
                                          slidesPerView: 6,
                                          spaceBetween: 15,
                                        },
                        
                                        1024: {
                                          slidesPerView: 8,
                                          spaceBetween: 15,
                                        },
                                      }}
                                >
                                    {  listVideo.length > 0 &&

                                        listVideo.map((item, i) => (
                                            <SwiperSlide key={i}>
                                                <MovieCard item={item} category={item.category}/>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                              </div>
          </div>
             )
        }

     
             <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Trending Movies</h2>
                                <Link to="/movie">
                                    <OutlineButton className="small">View more</OutlineButton>
                                </Link>
                            </div>
                            <MovieList category={category.movie} type={movieType.popular}/>
              </div>

              <div className="section mb-3">
                            <div className="section__header mb-2">
                                <h2>Trending Movies</h2>
                                <Link to="/movie">
                                    <OutlineButton className="small">View more</OutlineButton>
                                </Link>
                            </div>
                            <MovieList category={category.movie} type={movieType.popular}/>
              </div>


               <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated Movies</h2>
                        <Link to="/movie">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.movie} type={movieType.top_rated}/>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Trending TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.popular}/>
                </div>

                <div className="section mb-3">
                    <div className="section__header mb-2">
                        <h2>Top Rated TV</h2>
                        <Link to="/tv">
                            <OutlineButton className="small">View more</OutlineButton>
                        </Link>
                    </div>
                    <MovieList category={category.tv} type={tvType.top_rated}/>
                </div>
      </Helmet>
       
  )
}

export default Home