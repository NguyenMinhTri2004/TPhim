import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../Scss/Component/_moviecart.scss';
import { SwiperSlide, Swiper } from 'swiper/react';
import tmdbApi, { category } from '../Apitmbd/tmdbApi';
import MovieCard from '../Components/MovieCard';

const MovieList = props => {

    const [items, setItems] = useState([])

    useEffect(() => {
        const getList = async () => {
            let response = null
            const params = {}

            if (props.type !== 'similar') {
                switch(props.category) {
                    case category.movie:
                        response = await tmdbApi.getMoviesList(props.type, {params})
                        break;
                    default:
                        response = await tmdbApi.getTvList(props.type, {params})
                }
            } else {
                response = await tmdbApi.similar(props.category, props.id)
            }
            setItems(response.results)
            console.log(response.results)
        }
        getList()
    }, [])

    return (
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
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    );
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default MovieList;