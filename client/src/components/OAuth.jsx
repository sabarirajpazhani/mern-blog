import { GoogleAuthProvider, signInWithPopup,getAuth} from 'firebase/auth';
import { Button } from 'flowbite-react';
import { app } from '../firebase';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import {iyala useNavigate } from 'react-router-dom';

export default function OAuth() {
  const auth =getAuth(app)  //give the parameter as "app" because the firebase cannot know who is requesting "app" that can be comming from the firebae.js 
  const dispatch =useDispatch()
  const navigate=useNavigate()
    const handleGoogleClick=async()=>{
        const provider =new GoogleAuthProvider()
        provider.setCustomParameters({prompt :'select_account'}) //this line means that  if the person can login with google account firstly it open the pop up window, but next time it can be open it dorectly signin with already exisiting account
        try{
          const resultsFromGoogle=await signInWithPopup(auth,provider)

          //sent and save the info that can be get from the email using firebase in the backend 
          const res=await fetch('/api/auth/google',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              name:resultsFromGoogle.user.displayName,
              email:resultsFromGoogle.user.email,
              googlePhotoUrl:resultsFromGoogle.user.photoURL,
            }),
          })
          const data=await res.json();
          if(res.ok){
            dispatch(signInSuccess(data))
            navigate('/')
          }
        } catch (error) {
          console.log(error);
        }
    }




  return (
    <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continur with Google

    </Button>
  )
}
