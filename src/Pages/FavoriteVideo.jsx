import React from 'react';
import { useSelector} from 'react-redux';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from '../Components/MovieCard';
import Helmet from '../Components/Helmet';

const FavoriteVideo = () => {

  const listVideo = useSelector(state => state.favoriteSlice.value)


  return (
      <Helmet title='Phim yêu thích'>
             <div className="section mb-3 mt-3">
                            <div>
                                <h1 className="mb-3">Favorite Videos</h1>
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
                                             
                                                <MovieCard item={item} category={item.category} canDelete = {true} className = "mb-3"/>
                                               
                                            </SwiperSlide>
                                         
                                        ))
                                    }
                                </Swiper>
                              </div>
              </div>

      </Helmet>
  )
}

export default FavoriteVideo