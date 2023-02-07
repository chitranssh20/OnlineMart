import React from 'react'
import { useEffect, useState } from 'react'
import axiosInstance from '../Axios'
import { useNavigate } from 'react-router-dom'
import {v4 as uuid} from 'uuid'

export const ProductDash = () => {
    let navigate = useNavigate('');
    const [products, setproducts] = useState([])
    useEffect(() => {
        const getAllProducts = () =>{
            axiosInstance.get('product/getAllProducts/').then(res=>setproducts(res.data.data)).catch(err=>console.log(err))
        }
        getAllProducts()
        }, [])

        const deleteProduct = (e, id) =>{
            let shouldDelete = window.confirm('Are you sure you want to delete this Product? '+ id)
            if (shouldDelete){
                axiosInstance.delete(`product/deleteProduct/${id}`).then((res)=>{
                    console.log(res)
                    if (res.data.status === 400){
                        window.alert('Product not found');
                    }
                    else if(res.data.status === 301){
                        window.alert('Product has been deleted, please refresh the page.')
                    }
                }).catch(err=>console.log(err))
            }
        }

  return (
    <>
    <table>
        <thead>
            <tr>
                <td>Product Name</td>
                <td>Brand Name</td>
                <td>Rating</td>
                <td>Retail Price</td>
                <td>Discounted Price</td>
                <td>Action</td>
            </tr>
        </thead>
        <tbody>
            {
                products.map((item)=>{
                    return <tr key={uuid()} >
                        <td>{item.product_name}</td>
                        <td>{item.brand}</td>
                        <td>{item.rating}</td>
                        <td>{item.retail_price}</td>
                        <td>{item.discounted_price}</td>
                        <td><button onClick={()=>window.open(`/updateProduct/${item.uniqId}`,'_blank')} >Update</button>
                        <button onClick={(e)=>deleteProduct(e, item.uniqId)} >Delete</button></td>
                    </tr>
                })
            }
        </tbody>
    </table>
    </>
  )
}
