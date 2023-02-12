import React from 'react'
import './Product.css'

export const Paginate = ({productPerPage, totalProducts, paginate}) => {

    const pageNumber = []
    for(let i = 1; i<=Math.ceil(totalProducts / productPerPage); i++){
        pageNumber.push(i)
    }

  return (
    <nav className='paginateNav'>
        <ul className='paginateUL'>
            {pageNumber.map(number=>{
                return <li key={number} className = 'paginateLi'
                onClick={(e)=>{
                    e.preventDefault()
                    paginate(number)          
                }}
                >
                    {number}
                </li>
            })}
        </ul>
    </nav>
  )
}
