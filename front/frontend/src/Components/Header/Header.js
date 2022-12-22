import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import './Header.css'
import '../Global.css'
import search from '../icons/search.png'
import cart from '../icons/cart.png'
import user from '../icons/user-white.png'

export const Header = () => {
  let navigate = useNavigate();
  let sidebar = document.getElementsByClassName('sidebar')
  let cartSidebar = document.querySelector('#cartSidebar');
  
  document.onclick = (e) =>{
    if (cartSidebar != null || cartSidebar!= undefined){
      let sidebarStyle = window.getComputedStyle(cartSidebar, null);
      if(e.target.className != 'sidebarClick'){
        if(sidebarStyle.width != '0px'){
          sidebarDisappear();
        }
      }
    }
    }
  
  const sidebarDisappear = () =>{
    sidebar[0].style.width = '0%';
  }
  const sidebarAppear = () =>{
    if(window.innerWidth<=600){
      sidebar[0].style.width = '80%';
    }
    else{
      sidebar[0].style.width = '30%';
    }
    cartSidebar = document.querySelector('#cartSidebar');
  }
  const searchOnEnter = (event) =>{
    if (event.key === 'Enter' || event.keyCode === 13){
      console.log('Enter key pressed header.js');
    }
  }

  return (
    <>
    
        <header>
            <span className='logo'>
            Logo  
            </span> 
            <div className='search'>
            <input className='search-bar' placeholder='search products'  onKeyDown={searchOnEnter} ></input>
              <span className='search-icon'>
                <img src= {search} alt= 'Search'   />
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
        <div className='sidebar sidebarClick' id='cartSidebar' >
          <h1 onClick={()=>{sidebarDisappear()}} >X</h1>
          <h2 className='sidebarClick' >Hello, </h2>
          <h3 className='sidebarClick'>Username</h3>
          <button className='sidebarClick'>Logout</button>

          </div>    
    </>
  )
}
