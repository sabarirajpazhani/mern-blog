import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (<div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10'>
      {/* left side */}
      <div className='flex-1'>
        <Link to='/' className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>தமிழ்
          </span>
          ChroniclesTemple
          </Link>
          <p className=' text-justify text-sm mt-5'>
          Explore Tamil Nadu's rich temple heritage with detailed histories, architectural insights, and cultural significance. Whether you're a local or a foreign Visitor, Signup with your email and password to begin your journey. Start exploring today!
          {/* Signup with your email and password to begin your journey.Start exploring today!  */}
          </p>
      </div>
      {/* right side */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4'>
          <div>
            <Label value='Your username'/>
            <TextInput type='text' placeholder='Username' id='username'/>
          </div>
          <div>
            <Label value='Your Email'/>
            <TextInput type='text' placeholder='email@gmail.com' id='email'/>
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput type='text' placeholder='Password' id='password'/>
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit'>
            Sign Up
          </Button>
          <div className='flex grap-1 text-sm mt-5'>
            <span>Have an Account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>  
  </div>
  )
}
