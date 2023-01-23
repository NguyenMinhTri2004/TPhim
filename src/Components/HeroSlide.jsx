import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button, { OutlineButton } from '../Components/Button';
import Modal, { ModalContent } from '../Components/Modal';
import  tmdbApi, { category, movieType } from '../Apitmbd/tmdbApi';
import apiConfig from '../Apitmbd/apiConfig';
import "../Scss/Component/_button.scss"
import '../Scss/Component/_hero-slide.scss';
import { useHistory } from 'react-router';

const HeroSlide = () => {

   

    const [movieItems, setMovieItems] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const params = {page : 1}
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular , {params})
                setMovieItems(response.results.slice(0,6))
               
            } catch {
                console.log('errors')
            }
        }
        getMovies()
    }, [])

  
    return (
        <div className="hero-slide">
            <Swiper
               
               
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {
                movieItems.map((item, i) => <TrailerModal key={i} item={item}/>)
            }
        </div>
    );
}

const HeroSlideItem = props => {

    let hisrory = useHistory();

    const item = props.item;

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path);

    
    
    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item._id}`);
        const videos = await tmdbApi.getVideos(category.movie , item.id)


        if (videos.results.length > 0) {
            const videosrc = 'https://www.youtube.com/embed/' + videos.results[0].key;
            modal.querySelector('.modal__content > iframe').setAttribute('src', videosrc)
        } else {
            modal.querySelector('.modal__content__text').innerHTML = "Không có trailer"
        }

        modal.classList.toggle('active');
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{backgroundImage: `url(${background})`}}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h3 className="title">{item.original_title}</h3>
                    <p>{item.overview}</p>
                    <h3>{item.vote_average} /10  <i  style={{color: "yellow"}}  class='bx bxs-star'></i></h3>
                    <div className="btns">
                        <Button onClick={() => hisrory.push('/movie/' + item.id)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={setModalActive}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path ? item.poster_path  : item.backdrop_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

export  const TrailerModal = props => {
    const item = props.item;

    const iframeRef = useRef(null);

    const onClose = () => iframeRef.current.setAttribute('src', '');

    return (
        <Modal active={false} id={`modal_${item._id}`}>
            <ModalContent onClose={onClose}>
                <iframe ref={iframeRef} width="100%" height="500px" title="trailer"></iframe>
            </ModalContent>
        </Modal>
    )
}

export default HeroSlide;