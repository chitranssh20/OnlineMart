import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axiosInstance from '../Axios'
import { Comment } from '../Comment/Comment'
import { useSelector, useDispatch } from 'react-redux'

import './ProductDetail.css'
export const ProductDetail = () => {

    const dispatch = useDispatch();
    const {id} = useParams()
    const [productData, setproductData] = useState([])
    const [PrimeImage, setPrimeImage] = useState('')

    const [newComment, setnewComment] = useState('')

    useEffect(() => {
        if(id){

            axiosInstance.get(`product/getSingleProduct/${id}`).then((res)=>{
                setproductData(res.data.data)
            }).catch((err)=>{
                console.log(err)
            })
        }
        
    }, [])
    useEffect(()=>{
        setPrimeImage(`${imgURl + productData.firstImage}`)
        
}, [productData])
const imgURl = 'http://127.0.0.1:8000/product';
// setPrimeImage(`${imgURl+productData.firstImage}`)
let discount = ((productData.retail_price - productData.discounted_price) / productData.retail_price) * 100
                    discount = Math.floor(discount)

    const container = document.getElementById('primeImageDiv');
    const mainImg = document.getElementById('PrimeImageMainDiv');

    const imageZoom = (e)=>{
        if(container){

            container.addEventListener('mousemove', (e)=>{
                const x = e.clientX - (e.target.offsetLeft)/4;
                const y = e.clientY - (e.target.offsetTop)/4;
                mainImg.style.transformOrigin = `${x}px ${y}px`;
                mainImg.style.transform = 'scale(1.5)'
                mainImg.style.cursor = 'zoom-in'
            })
            // container.addEventListener('mouseleave', (e)=>{
            //     mainImg.style.transformOrigin = 'center';
            //     mainImg.style.transform = 'scale(1)';       
            // })
        }
    }
    const imageOut = (e) =>{
        if(container){

            container.addEventListener('mouseleave', (e)=>{
                mainImg.style.transformOrigin = '100% 1%';
                mainImg.style.transform = 'scale(1)'; 
                mainImg.style.transform = 'translate(-50%, -50%)'     
            })
            // window.alert('alkdjhalkdj')
        }
    }


const commentSavedSucceffully = () =>{
    dispatch({
        type: "open",
        message: "Your comment has been saved successfully"
    })
    console.log('tried to change modal')
}

const removeModal = () =>{
    dispatch({
        type: "close"
    })
}

const addComment = ()=>{
    setnewComment('')
    let commentCredentials = new FormData();
    commentCredentials.append('comment', newComment);
    commentCredentials.append('uniqId', id)
    if(newComment != ''){
        axiosInstance.post('engagement/saveComment/', commentCredentials).then((res)=>{
            commentSavedSucceffully();
            setTimeout(() => {
                removeModal()
            }, 5000);
        }).catch((err)=>{
            console.log(err)
        })
    }
}



  return (
    <>
    <div className='productData flexing'>
        <div className='productIntro flexing'>
                <div className='productDetailImages flexing'>
                        <div className='productDetailImagesSecondary flexing' >
                                <div className='productDetailSideImage flexing' style={{
                                    backgroundImage: `url(${imgURl + productData.firstImage
                                })`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                        }}  onMouseEnter = {(e)=>{setPrimeImage(`${imgURl + productData.firstImage}`)}}  >
                        </div>
                                <div className='productDetailSideImage flexing' style={{
                                    backgroundImage: `url(${imgURl + productData.secondImage
                                })`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }} onMouseEnter = {(e)=>{setPrimeImage(`${imgURl + productData.secondImage}`)}}  ></div>
                                <div className='productDetailSideImage flexing' style={{
                                    backgroundImage: `url(${imgURl + productData.thirdImage
                                })`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover"
                        }} onMouseEnter = {(e)=>{setPrimeImage(`${imgURl + productData.thirdImage}`)}}  ></div>
                                    </div>
                                <div className='productDetailImagesPrimary flexing' id='primeImageDiv' style={{
                                    // backgroundImage: `url(${PrimeImage
                                    //     })`,
                                    // backgroundRepeat: "no-repeat",
                                    // backgroundSize: "cover"
                                }} >
                                    <img src= {PrimeImage}  id= 'PrimeImageMainDiv' onMouseEnter={imageZoom()}  onMouseLeave = {(e)=> imageOut(e)} />
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
    </div>
        <div className='productDetailDescription flexing'>
                        {productData.description}
        </div>
        <div className='commentBox'>
        <div className='textarea'>
            <textarea placeholder="Write your Review here" value={newComment} onChange={(e)=>{
                setnewComment(e.target.value);
            }}  ></textarea>
            <button onClick={(e)=> addComment()} >Submit</button>
        </div>
        <Comment productId={id} />
        </div>
    </>
  )
}
