import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../Axios'
import './ProductDetail.css'
export const ProductDetail = () => {
    const {id} = useParams()
    const [productData, setproductData] = useState([])

    useEffect(() => {
      axiosInstance.get(`product/getSingleProduct/${id}`).then((res)=>{
        setproductData(res.data.data)
    }).catch((err)=>{
        console.log(err)
    })
    
}, [])
console.log(productData)
const imgURl = 'http://127.0.0.1:8000/product';
let discount = ((productData.retail_price - productData.discounted_price) / productData.retail_price) * 100
                    discount = Math.floor(discount)
  return (
    <>
    <div className='productData flexing'>
        <div className='productIntro flexing'>
                <div className='productDetailImages flexing'>
                        <div className='productDetailImagesSecondary flexing'>
                                <div className='productDetailSideImage flexing' style={{
                                    backgroundImage: `url(${imgURl + productData.firstImage
                                })`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"
                        }} ></div>
                                <div className='productDetailSideImage flexing' style={{
                                    backgroundImage: `url(${imgURl + productData.secondImage
                                })`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }} ></div>
                                <div className='productDetailSideImage flexing' style={{
                                    backgroundImage: `url(${imgURl + productData.thirdImage
                                })`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"
                        }} ></div>
                                    </div>
                                <div className='productDetailImagesPrimary flexing' style={{
                                    backgroundImage: `url(${imgURl + productData.firstImage
                                        })`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover"
                                }} >
                                    
                                </div>
                </div>
                <div className='productDetailText flexing'>
                        <h3 className='productDataName flexing'>{productData.product_name}</h3>
                        <h2 className='productDataBrand' >by {productData.brand}</h2>
                        <h3 className='productDataPrice flexing'> <span className='productDataPriceDiscounted'>Price:  ₹{productData.discounted_price}</span><span className='productDataPriceRetail'>₹{productData.retail_price}</span>
                        <br></br>
                        </h3>
                        <h3 className='productDataDiscount' >
                            <span className='ProductDataDiscountSpan'>                                {discount}% Off
                                </span>
                            </h3>
                </div>
        </div>
        <div className='productDetailDescription flexing'>
                        {productData.description}
        </div>
    </div>
    {id}
    </>
  )
}
