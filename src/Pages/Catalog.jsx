import React, { useState, useEffect } from 'react';
import "../Scss/Component/_catalog.scss";
import MovieCard from "../Components/MovieCard";
import tmdbApi, {movieType, tvType } from '../Apitmbd/tmdbApi';
import {useParams } from 'react-router';
import  { OutlineButton} from '../Components/Button';
import {useRef} from 'react';
import Helmet from '../Components/Helmet';

const Catalog = () => {

  const [items, setItems] = useState([])

  const [page, setPage] = useState(1)

  const  category  = useParams()
  
  const inputRef = useRef(null)

  const [keyword, setKeyword] = useState('')

  useEffect(() => {

    const getList = async () => {
      let response = null;
      if (keyword === "") {
          const params = {page};
          switch(category.category) {
  
              case "movie":
                  response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                  break;
              default:
                  response = await tmdbApi.getTvList(tvType.popular, {params});
          }
      } else {
          const params = {
              query: keyword
          }
          response = await tmdbApi.search(category.category, {params});
      }
      setItems(response.results);
    }  

    getList()
  } , [category , keyword])

  const loadMore = async () => {
    let response = null;
    if (keyword === "") {
        const params = {
            page: page + 1
        };
        switch(category.category) {
            case "movie":
                response = await tmdbApi.getMoviesList(movieType.upcoming, {params});
                break;
            default:
                response = await tmdbApi.getTvList(tvType.popular, {params});
        }
    } else {
        const params = {
            page: page + 1,
            query: keyword
        }
        response = await tmdbApi.search(category.category, {params});
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
}

  return (
    <Helmet title={category.category}>
            <div className="container">
        
                <div className="section mb-3 mt-3">
                <input className="catalog__search" placeholder = "Enter keyword..." 
                            ref={inputRef} type=""
                            onChange={(e) => setKeyword(e.target.value)}
                            />
                <div className="movie-grid">

                            {
                            
                                    items.map((item, i) => (
                                    <MovieCard category= {category.category} item={item} key={i}/>)
                                    )
                                
                            }
                
                </div>
                <div style={{display: 'flex' , alignItems: 'center' , justifyContent: 'center'}}  >
                        <OutlineButton style={{textAlign:'center'}} onClick={() => loadMore()}>Load More</OutlineButton>
                </div>
                </div>
            </div>
    </Helmet>
  )
}

export default Catalog