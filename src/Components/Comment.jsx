import React  from 'react';
import { database , ref , push , onValue} from "../Firebase/Firebase";
import { useState , useEffect  } from 'react';
import "../Scss/Component/_comment.scss";
import {useSelector} from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Comment = (props) => {

  const currentUser = useSelector(state => state.auth.currentUser)

  const [input , SetInput] = useState("")
  
  const [comments , SetComments] = useState([])

  const id = props.id
  const episode = props.episode

 
  useEffect(() => {

    onValue(ref(database , "comment") , (data) => {
         let getComments = []
         data.forEach((d) => {
            getComments.push(d.val())
         })

         let result = getComments.filter(item => item.id === id && item.episode === episode)
         
         SetComments(result)
    })

  }, [episode , id])

  const handleComments = () => {
      if(!currentUser){
          toast.error("Please login to comment !", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
      }else {
        push(ref(database , "comment") ,  {
            name : currentUser.displayName,
            comment : input,
            id : id,
            episode : episode,
            avatar : currentUser.photoURL,
  
        })  
      }
      SetInput('')
  }

  return (          
      <div className="comment" >
          <div className="comment__wrapper">
            <div className="comment__length">
                {comments.length} comments
            </div>
            <div className="comment__auth">
                  <img src= {currentUser ?  currentUser.photoURL : ""} alt="" />
                  <div>
                      <input  className="comment__input" value={input} type="text" placeholder={currentUser ? "Please enter your comment....." : "Please login to comment....."} onChange={(e) => SetInput(e.target.value)}/>
                     
                  </div>
            </div>
                  <button className="comment__btn"   onClick={() => handleComments()}>Send</button>

              <div className = "comment__list"  >
                  {
                    comments.map((item , index) => {
                        return (
                          <div key = {index} className="comment__list__item">
                                <div className="comment__list__item__avt">
                                    <img src= {item?.avatar} alt="" />
                                </div>

                                <div className="comment__list__item__content">
                                    <div className="comment__list__item__content__name">
                                            {item.name}
                                    </div>

                                    <div className="comment__list__item__content__text">
                                            {item.comment}
                                    </div>
                                </div>
                          </div>
                          
                        )
                    })
                  }
              </div>
          </div>
          <ToastContainer/>
      </div>
          
)}
    
 
export default Comment