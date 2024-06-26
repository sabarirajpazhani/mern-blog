import React from 'react'
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link ,useLocation} from 'react-router-dom';
import {AiOutlineSearch} from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector,useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';


export default function Header() {
  const path=useLocation().pathname;
  const dispatch =useDispatch();
  
  const {currentUser} =useSelector((state) => state.user)   //used for if user can be authenticated or not
  const {theme} = useSelector((state)=>state.theme);
  return (
    <Navbar className='border-b-2'>
      
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>தமிழ்</span>
        ChroniclesTemple.com
      </Link>
      <form>
        <TextInput
            type='text'
            placeholder='Search....'
            rightIcon={AiOutlineSearch}
            className='hidden lg:inline'  
        />
      </form>
      <Button className='w-12 h-10 lg:hidden'color='gray'pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex grap-2 md:order-2'>
                     {/* for dark and light mode */}
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill onClick={()=>dispatch(toggleTheme())}>
          {theme === 'light'?<FaSun/> :<FaMoon/>} 
        </Button>
         {/* -----------for profile dropdown and pi----------- */}
        {currentUser?(
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                 alt='user'
                 img={currentUser.profilePicture}
                 rounded
              />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
            </Dropdown.Header>
            <Link to={'dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Divider/>
              <Dropdown.Item>Sign Out</Dropdown.Item>
            </Link>
          </Dropdown>
        ):
          (
            <Link to='/sign-in'>
              <Button gradientDuoTone='purpleToBlue'outline>
                Sign In
              </Button>
            </Link>
          )}
        <Navbar.Toggle/>
      </div>
      <Navbar.Collapse>
          <Navbar.Link active={path==="/"} as={'div'}>
            <Link to='/'>
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/about"} as={'div'}>
            <Link to='/about'>
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/projects"} as={'div'}>
            <Link to='/projects'>
              Projects 
            </Link>
          </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>

  );
}

