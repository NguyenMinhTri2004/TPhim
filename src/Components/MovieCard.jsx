import React from 'react';
import '../Scss/Component/_moviecart.scss';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import { category } from '../Apitmbd/tmdbApi';
import apiConfig from '../Apitmbd/apiConfig';
import {deleteVideo} from "../Redux/Favorite/favoriteSlice";
import { useDispatch } from 'react-redux';

const MovieCard = props => {


    const item  = props.item

    const dispatch = useDispatch()

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(deleteVideo(item))
    }

    const link = '/' + category[props.category] + '/' + item.id;

    const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path)

    return (
        <Link to={link}>
            <div className="movie-card" style={{backgroundImage: `url(${bg})`}}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
                <span onClick={(e) => handleDelete(e)} className = "movie-card-delete" >{props.canDelete && <i className='bx bx-x'></i>}</span>
            </div>
            <h3>{item.title || item.name}</h3>
        </Link>
    );
}

export default MovieCard;