import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useState, useEffect } from 'react'
import './Header.css'
import '../Global.css'
import search from '../icons/search.png'
import cart from '../icons/cart.png'
import user from '../icons/user-white.png'
import {v4 as uuid} from 'uuid'

export const Header = ({localCart}) => {

 


  let navigate = useNavigate();
  let sidebar = document.getElementsByClassName('sidebar')
  let cartSidebar = document.querySelector('#cartSidebar');

  useEffect(() => {
    let OnlineMartCart = localStorage.getItem('OnlineMartCart')
    if(OnlineMartCart!== undefined || OnlineMartCart!== null){
      //do nothing
    }
    else{
      let justCart = []
      localStorage.setItem('OnlineMartCart', JSON.stringify(justCart))
    }
  
  }, [])
  

  document.onclick = (e) =>{
    if (cartSidebar !== null || cartSidebar!== undefined){
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
  const removeCookieConsentBox = () =>{
    let consentBox =  document.getElementsByClassName('consentBox')[0];
    consentBox.style.display = 'none'

    
  }
  const cookieConsentRejected = () =>{
    removeCookieConsentBox();
  }
  const cookieConsentAccepted = () =>{
    removeCookieConsentBox();
    localStorage.setItem('Consent', true);
  }

  //Consent Code
  let consent = localStorage.getItem('Consent')

  useEffect(() => {
    if(!consent){
      let consentBox = document.getElementsByClassName('consentBox')[0]
      consentBox.style.display = 'block'
    }
  },[])
  
    
  return (
    <>
    
        <header>
            <span className='logo' onClick={()=>{
              navigate('/')
            }} >
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
                  navigate('/cart');
                }} />
              </span>
            </div>
        </header>
        <div className='sidebar sidebarClick' id='cartSidebar' >
          <h1 onClick={()=>{sidebarDisappear()}} >X</h1>
          <h2 className='sidebarClick' >Hello, </h2>
          <h3 className='sidebarClick'>Username</h3>
          <button className='sidebarClick'>Logout</button>
          <div className='sideCartPreview  sidebarClick'>
                <ul className='sidebarClick sideCartPreviewUL' >
                  {
                    localCart.map((product)=>{
                      return<li className='sidebarClick sidebarPreviewLi' key={uuid()} >{product.name}</li>
                    })
                  }
                </ul>
          </div>
          </div>    
      
            <div className='consentBox'>
              <h3>COOKIES CONSENT</h3>
              <br></br>
              <p>We want to inform you that we collect cookies for proper function of the site and better user experience.
               </p>
               <br>
               </br>
               <p>You can click here to see what cookies we collect and for which purposes.</p>
               <p>By clicking on Agree button you will be providing consent for us to collect cookies.</p>
                <button onClick={()=> cookieConsentRejected()}  >Reject</button>
                <button onClick={()=> cookieConsentAccepted()} >Agree</button>

            </div>
       

    </>
  )
}
