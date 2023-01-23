import React from 'react';
import {useEffect  , useState} from 'react';
import { useParams } from 'react-router';
import "../Scss/Component/_video.scss";
import MovieList from '../Components/MovieList';
import Comment from "../Components/Comment";
import Helmet from '../Components/Helmet';

const Video = () => {

  const {category , id , season , numberepisode , idepisode} = useParams();

  const [episode , setEpisode] = useState(1)
  const [linkvideo , Setlinkvideo] = useState("")
  
  let link = ''
  let pos = []

  useEffect(() => {
      
       const getVideo =() => {
         
             if(season === undefined && numberepisode === undefined){
                 link = `https://2embed.org/embed/movie?tmdb=${id}`
                }else{
                  link = `https://2embed.org/embed/series?tmdb=${id}&s=${season}&e=${episode}`
             }

             Setlinkvideo(link)
             window.scrollTo(0,0);
       }

       getVideo()

  }, [episode])



  return (
   
   <Helmet title='Video'>
        <div className="section">
        <div className="video">
                <div className="video__left ">
                <div className="video__left__item">
                    <iframe allowfullscreen=""   width="100%" height="600"  src= {linkvideo} frameborder="0"></iframe>  
                </div>

                <div className="video__left__item video__left__chap">

                    {(() =>{
                            
                            for(let i = 1; i < numberepisode ; i++){
                                pos.push(i)
                            }
                            })
                        ()}
                        {

                            pos.map((item , index) => {
                                return (
                                    <button key = {index} onClick={() => setEpisode(item)}>{item}</button>
                                )
                            })
                        }
                    
                    
                </div>
                </div>
                <div className="section video__section mb-3">
                    <Comment  id = {idepisode ? idepisode : id}  episode = {episode} />
                </div>      
                <div className="section mb-3 video__section  ">
                                    <div className="section__header mb-2">
                                        <h2>Similar</h2>
                                    </div>
                                    <MovieList category={category} type="similar" id={id}/>
                </div>
            </div>
        </div>
   </Helmet>
  )
}

export default Video