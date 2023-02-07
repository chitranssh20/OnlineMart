import React from 'react'
import { useEffect, useState } from 'react'
import axiosInstance from '../Axios'
import { useNavigate } from 'react-router-dom'
import '../AddProduct/AddProduct.css'
export const AddProduct = () => {
   let navigate = useNavigate()
        const [name, setname] = useState('')
        const [description, setdescription] = useState('')
        const [retail_price, setretail_price] = useState('')
        const [discounted_price, setdiscounted_price] = useState('')
        const [brand, setbrand] = useState('')
        const [imgF, setimgF] = useState(null)
        const [imgS, setimgS] = useState(null)
        const [imgT, setimgT] = useState(null)

        const addProduct = (e) =>{
            e.preventDefault();
            let productData = new FormData();
            productData.append('name', name)
            productData.append('description', description)
            productData.append('retail_price', retail_price)
            productData.append('discounted_price', discounted_price)
            productData.append('brand', brand)
            productData.append('imgF', imgF)
            productData.append('imgS', imgS)
            productData.append('imgT', imgT) 
            console.log('imkages', imgF, imgS, imgT, 'djdjdjjd')
            console.log('done')
            if(imgF == undefined || imgF == null || imgS == undefined || imgS == null || imgT == undefined || imgT == null || imgF == '' || imgS == '' || imgT == ''){
                window.alert('Please upload all the three images')
            }
            else{

                axiosInstance.post('product/addProduct/', productData).then((res)=>{
                  if (res.data.status === 400){
                    window.alert('Please fill all the details')
                  }
                  else if(res.data.status === 201){
                    window.alert('Product Added Successfully. Please refresh the page.')
                    setbrand('')
                    setdescription('')
                    setimgF(null)
                    setimgS(null)
                    setimgT(null)
                    setname('')
                    setdescription('')
                    setretail_price('')
                    setdiscounted_price('')
                    window.location.reload();
                  }
                }).catch(err=>console.log(err))
            }

        }

        return (
            <>
            <h3 className='homeButton' onClick={() => { navigate('/productdash/') }} >Back</h3>
            <form className='addProductform' >
              <label htmlFor='name' >Product Name:</label>
              <input type='text' value={name} name='name' id='name' onChange={(e) => {
                setname(e.target.value)
              }} ></input>
              <br></br>
              <label htmlFor='description' >Description:</label>
              <input type='text' value={description} name='description' id='description' onChange={(e) => {
                setdescription(e.target.value)
              }} ></input>
              <br></br>
              <label htmlFor='retail_price' >Retail Price:</label>
              <input type='number' value={retail_price} name='retail_price' id='retail_price' onChange={(e) => {
                setretail_price(e.target.value)
              }} ></input>
              <br></br>
              <label htmlFor='discounted_price' >Discounted Price:</label>
              <input type='number' value={discounted_price} name='discounted_price' id='discounted_price' onChange={(e) => {
                setdiscounted_price(e.target.value)
              }} ></input>
              <br></br>
              <label htmlFor='brand' >Brand:</label>
              <input type='text' value={brand} name='brand' id='brand' onChange={(e) => {
                setbrand(e.target.value)
              }} ></input>
              <br></br>
              <label htmlFor='imgF' >First Image:</label>
              <input type='file' name='imgF' id='imgF' onChange={(e) => {
                setimgF(e.target.files[0]) 
                console.log(e.target)
              }} ></input>
              <br></br>
              <label htmlFor='imgS' >Second Image:</label>
              <input type='file' name='imgS' id='imgS' onChange={(e) => {
                setimgS(e.target.files[0])
              }} ></input>
              <br></br>
              <label htmlFor='imgT' >Third Image:</label>
              <input type='file'  name='imgT' id='imgT' onChange={(e) => {
                setimgT(e.target.files[0])
              }} ></input>
              <br></br>
              
              <button type='submit' onClick={(e)=>{addProduct(e)}} >Add Product</button>
    
            </form>
          </>
  )
}
