import {browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword , sendPasswordResetEmail, setPersistence, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from "firebase/auth";
import { auth } from "../../Firebase/Firebase";
import {provierGoogle , provierFacebook} from "../../Firebase/Firebase";
export const registerApi = async (user) => {

    try{
         const res = await createUserWithEmailAndPassword(auth, user.email,  user.password)
       

         await updateProfile(res.user , {
             displayName : user.name
         })

         console.log(res)

    }catch(err){
          console.error(err);
    }
}




export const loginApi = async (user) => {

    try{
        const {email , password , remember } = user

        await setPersistence(auth , 
            remember
            ? browserLocalPersistence
            : browserSessionPersistence
        )

        const res = await signInWithEmailAndPassword(auth, email , password)
        console.log(res)
    }catch(err){
          console.error(err);
    }
}



export const googleApi = async () => {

    try{
       
          const res = await signInWithPopup(auth , provierGoogle)
          return res.user

    }catch(err){
          console.error(err);
    }
}



export const facebookApi = async () => {

    try{
       
          const res = await signInWithPopup(auth , provierFacebook)
          return res.user
          
    }catch(err){
          console.error(err);
    }
}



export const forgotPassApi = async (email) => {

    try{
       
    await sendPasswordResetEmail(auth , email)

    }catch(err){
          console.error(err);
    }
}


export const signOutApi = async () => {

    try{
       
    await signOut(auth)
    

    }catch(err){
          console.error(err);
    }
}