import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import { signInStart,signInSuccess,signInFailure } from "../redux/user/userSlice";

//The formData state variable holds the current values of the form inputs. The handleChange function updates formData when an input changes, using the input's id as the key and the input's value. 
export default function SignIn() {
  const [formData,setFormData] = useState({});          //event handling
  const {loading, error:errorMessage}=useSelector(state=>state.user);   //redux
  const dispatch =useDispatch()  //redux
  const navigat=useNavigate();   //for navigation of one page to another
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()}); //trim - for removing the sapce that can be write in the form.
  }

  
  //SEVER FOR THE SIGNUP PAGE
  const handleSubmit =async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){ //for display error with entring the details
      return dispatch(signInFailure('Please fill all the fields'));  //redux
    }

    try{
      // setLoading(true);
      // setErrorMessage(null);  //clear the previous error
                      //  |                    //redux
                      //  |
                      // \/
      dispatch(signInStart());
      const res=await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });
      const data=await res.json();  

      if(data.success === false){          //it dispaly the error if already having the accounts
        // return setErrorMessage(data.message);
                      //  |
                      //  |         //redux
                      // \/ 
        dispatch(signInFailure(data.message));
      }
  
      if(res.ok){           //navigate to signin page
        dispatch(signInSuccess(data));
        navigat('/');
      }
    }
    catch (error){
      // setErrorMessage(error.message);
      // setLoading(false);
                      //  |
                      //  |            //redux
                      // \/
      dispatch(signInFailure(error.message));
    }


  }
  return (<div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
      {/* left side */}
      <div className='flex-1'>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>தமிழ்
          </span>
          ChroniclesTemple
          </Link>
          <p className=' text-justify text-sm mt-4'>
            <div className="font-serif  text-4xl">
              <p>Vanakkam</p>
            </div>
          Explore Tamil Nadu's rich temple heritage with detailed histories, architectural insights, and cultural significance. Whether you're a local or a foreign Visitor, Signin with your email and password to begin your journey. Start exploring today!
          {/* Signup with your email and password to begin your journey.Start exploring today!  */}
          </p>
      </div>
      {/* right side */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='Your Email'/>
            <TextInput type='email' placeholder='email@gmail.com' id='email' onChange={handleChange}/>
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput type='password' placeholder='**********' id='password' onChange={handleChange}/>
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {
              loading ?(
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </>
              ):'Sign In'
            }
          </Button>
        </form>
        <div className='flex grap-1 text-sm mt-5'>
          <span>Don't Have an Account?</span>
          <Link to='/sign-up' className='text-blue-500'>
            Sign Up
          </Link>
        </div>
        {
          errorMessage &&(  //&& checks if errorMessage has a value. If errorMessage has a value, the expression after the && operator is evaluated
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
          )
          }
      </div>
    </div>  
  </div>
  )
}


