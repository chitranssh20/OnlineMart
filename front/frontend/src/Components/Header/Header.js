import React from 'react'
import './Header.css'
import '../Global.css'
import search from '../icons/search.png'
import cart from '../icons/cart.png'
import user from '../icons/user-white.png'

export const Header = () => {
  const searchGlass = document.getElementsByClassName('cart');
  const searchQuery = () =>{
  cart.window.addEventListener('onclick', ()=>{
  console.log('hellow');
})
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

                <img src= {user} alt= 'user' />
              </span>
              <span className='userImg'>
                <img src= {cart} alt= 'cart' />
              </span>
            </div>
        </header>

    
    </>
  )
}
