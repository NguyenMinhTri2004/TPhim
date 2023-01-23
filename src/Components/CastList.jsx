import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import tmdbApi from '../Apitmbd/tmdbApi';
import apiConfig from '../Apitmbd/apiConfig';
import {BigLoading} from "./Loading";

const CastList = props => {

    const {category} = useParams()

    const [casts, setCasts] = useState([])

    const [loading , setLoading] = useState(false)

    useEffect(() => {
        const getCredits = async () => {
            setLoading(true)
            const res = await tmdbApi.credits(category, props.id)
            setCasts(res.cast.slice(0, 5))
            setLoading(false)
        }
        getCredits()
    }, [category, props.id])
    return (
        <div className="casts">
            {
            
                casts.map((item, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" style={{backgroundImage: `url(${apiConfig.w500Image(item.profile_path)})`}}></div>
                        <p className="casts__item__name">{item.name}</p>
                    </div>
                ))

            }
            {loading && <BigLoading/>}
        </div>
    );
}

export default CastList;