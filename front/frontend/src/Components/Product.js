import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from './Axios'
import { Item } from './Item'
import { Paginate } from './Paginate'
import './Product.css'
export const Product = ({changeLocalCart}) => {


const [products, setproducts] = useState([])
const [currentPage, setcurrentPage] = useState(1)
const [productPerPage, setproductPerPage] = useState(9)
const [loading, setloading] = useState(true)


useEffect(() => {
  axiosInstance.get('product/getAllProducts/').then((res)=>{
    setproducts(res.data.data)
    setloading(false)
  }).catch((err)=>{
    console.log(err);
  })
}, [])

    const indexOfLastPost = currentPage * productPerPage
    const indexofFirstPost = indexOfLastPost - productPerPage
    const currentPosts = products.slice(indexofFirstPost, indexOfLastPost);


    const paginate = (pageNumber) => {
        setcurrentPage(pageNumber)
    }

  return (
    <>
    {
        loading?<h2>Loading</h2>:
        <>
        <div className='ListedProducts'>

            <Item products = {currentPosts} changeLocalCart = {changeLocalCart} />
        </div>
        <Paginate productPerPage={productPerPage} totalProducts= {products.length} paginate = {paginate} />
        </>
    }
    </>
  )
}
