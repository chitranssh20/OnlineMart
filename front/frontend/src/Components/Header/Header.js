import React from 'react'
import {useNavigate} from 'react-router-dom'
import './Header.css'
import '../Global.css'
import search from '../icons/search.png'
import cart from '../icons/cart.png'
import user from '../icons/user-white.png'

export const Header = () => {
  let navigate = useNavigate();
  let sidebar = document.getElementsByClassName('sidebar')
  const sidebarDisappear = () =>{
    sidebar[0].style.width = '0%';
    // sidebar[0].style.display = 'none'
  }
  const sidebarAppear = () =>{
    sidebar[0].style.width = '30%';
    // sidebar[0].style.display = 'block';
  }


  return (
    <>
    
        <header>
            <span className='logo'>
            Logo  
            </span> 
            <div className='search'>
            <input className='search-bar' placeholder='search products' ></input>
              <span className='search-icon'>
                <img src= {search} alt= 'Search' />
              </span>
            </div>     
            <div className='user-login'>
              <span className='userImg'>

                <img src= {user} alt= 'user' onClick={()=>{
                  sidebarAppear()
                }} />
              
              </span>
              <span className='userImg'>
                <img src= {cart} alt= 'cart' target = '_blank'  onClick={()=>{
                  navigate('cart/');
                }} />
              </span>
            </div>
        </header>
        <div className='sidebar' >
          <h1 onClick={()=>{sidebarDisappear()}} >X</h1>
          <h2>Hello, </h2>
          <h3>Username</h3>
          <button>Logout</button>

          </div>    
    </>
  )
}
