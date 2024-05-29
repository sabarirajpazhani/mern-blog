import { Alert, Button, TextInput } from 'flowbite-react'
import { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
//for upload effect
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const {currentUser}=useSelector(state=>state.user)  //for profile pic

  const [imageFile,setImageFile]=useState(null);
  const [imageFileUrl,setImageFileUrl]=useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress]=useState(null);
  const [imageFileUploadError,setImageFileUploadError]=useState(null);
  const filePickerRef=useRef();  //for clicking the profile photo to change the image from the galary
  const handleImageChange=(e)=>{
    const file=e.target.files[0];
    if(file){
      setImageFile(file);  //select image from the file
      setImageFileUrl(URL.createObjectURL(file)); //it generate the url for the selected image in the galary(convert image onto url(tempory localhost url))
    }

  };
  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile]);

  const uploadImage=async()=>{
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;                                     //this code in firebase storage code. this means the user can only upload there photo in 2KB only
    //       allow write :if
    //       request.resource.size<2*1024 *1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploadError(null); //it remove the error while correct the file formate of uploading the profile pic
    const storage =getStorage(app); //"app" means the crt person is requsting . this is in the redux->firebase.jsx-> line 17
    const fileName=new Date().getTime()+imageFile.name;//when we uplaod the file this line can be store   //new Date().getTime() for if the person upload there photo two times means it get error for unique we want to use this date annd time
    const storageRef=ref(storage,fileName); 
    const uploadTask = uploadBytesResumable(storageRef,imageFile); //used to upload the image and also get the innfo about the what is uploading
    uploadTask.on(
        'state_changed',
        (snapshot)=>{   //it get the pices of information while uploading the photo byte by byte  //get the info like no.of bytes error and etc.,
          const progress = (snapshot.bytesTransferred/snapshot.totalBytes) *100;   //how many percentage that can be uploaded
          setImageFileUploadProgress(progress.toFixed(0));  //toFixed(0)==> 11.231kb ->11kb
        },
        (error)=>{
          setImageFileUploadError('Could not upload image (File must be less than 2MB)');
          setImageFileUploadProgress(null); //this line is for...if the user upload another file formate like mp3,mp4 means it does not give the upload effect
          setImageFile(null);
          setImageFileUrl(null);   //line 58 ans 59 . if the user upload another file formate it will give the error and make it profile pic as common profile pic or email profile pic
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setImageFileUrl(downloadURL);
          });
        }
      );
  };
  return (
    // <div className="h-screen bg-cover bg-center"style={{ backgroundImage: "url('')" }}>
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>

        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>

        <div className='relative w-32 h-32 self-center cursor-pointer shadow-xl overflow-hidden rounded-full'onClick={()=>filePickerRef.current.click()}>

          {imageFileUploadProgress && (
            <CircularProgressbar value={imageFileUploadProgress || 0} text={`${imageFileUploadProgress}%`}
            strokeWidth={5}
            styles={{
              root:{
                width:'100%',
                height:'100%',
                position:'absolute',
                top:0,
                left:0,
              },
              path:{
                stoke:`rgba(62,152,199,${imageFileUploadProgress/100})`,
              },
            }}
            />
          )}
          <img 
            src={imageFileUrl||currentUser.profilePicture}  //if the image can be exisit means it display the selected image other wise it display the common image or profile image of the email
            alt="user" 
            className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'} `}/>   {/* ${imageFileUploadProgress && imageFileUploadProgress<100 && 'opacity-60'} --> for if the profile can uploaded if can blur during the upload */}
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}            {/* if the user uploaded another file means it give the error alert */}
       

        <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username}/>
        <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToBlue' outline>
          Update
        </Button>
        <div className='text-red-500 flex justify-between mt-5'>
          <span className='cursor-pointer'>Delete Account</span>
          <span className='cursor-pointer'>Sign Out</span>
        </div>

      </form>
    </div>
    // </div>
  )
}
