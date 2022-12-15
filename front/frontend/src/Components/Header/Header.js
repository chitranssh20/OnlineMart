import React from 'react'
import './Header.css'
import '../Global.css'
import '../icons/search.png'
import search from '../icons/search.png'

export const Header = () => {




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
            <span className='user-login'>
              <p>Log In</p>
            </span>

        </header>
    
    </>
  )
}
