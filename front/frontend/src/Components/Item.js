import React from 'react'
import { v4 as uuid } from 'uuid'
import './Product.css'
import './Global.css'
import { useEffect } from 'react'

export const Item = ({products, changeLocalCart }) => {

    useEffect(() => {
      changeLocalCart();
      
    }, [])
    

    // useEffect(() => {
    //     let cart = JSON.parse(localStorage.getItem('OnlineMartCart'));
    //     cart.forEach((product)=>{
    //         let buyNowButton = document.getElementById('item'+product.id);
    //         let cartQuantityButton = document.getElementById('cartQuantifer' + product.id);
    //         if(buyNowButton!=null || buyNowButton!= undefined){

    //             buyNowButton.style.display = 'none'
    //         }
    //         if(cartQuantityButton!=null || cartQuantityButton!= undefined){

    //             cartQuantityButton.style.display = 'flex'
    //         }
    //         // buyNowButton.style.display = 'none'
    //         // cartQuantityButton.style.display = 'flex'
    //     })
    
    // }, [])
    
    const imgURl = 'http://127.0.0.1:8000/product';

    // let sideCartUl = document.getElementsByClassName('sideCartPreviewUL')

    const buyNow = (e, product) =>{
        console.log('item'+product.uniqId)
        var buyNowButton = document.getElementById('item'+product.uniqId)
        var cartQuantityButton = document.getElementById('cartQuantifer' + product.uniqId)
        var cartQuantity = cartQuantityButton.querySelector('.itemQuantity') 
        console.log(cartQuantityButton)
        console.log(buyNowButton)
        if(buyNowButton!=null || buyNowButton!= undefined){
            console.log('5555');
            buyNowButton.style.display = "none";
            console.log('7777');
        }
        if(cartQuantityButton!=null || cartQuantityButton!= undefined){
            console.log('4444');
            cartQuantityButton.style.display = "flex";
            console.log('8888');
        }

        cartQuantity.innerHTML  = 1
       
        let cart = localStorage.getItem('OnlineMartCart')



        if (!cart){
            cart =[]

            let prod = {}
            prod['id'] = product.uniqId
            prod['name'] = product.product_name
            prod['quantity'] = 1
            prod['image'] = product.firstImage
            prod['subtotal'] = product.discounted_price
            cart['total'] = product.discounted_price
            cart.push(prod)
            localStorage.setItem('OnlineMartCart', JSON.stringify(cart) )
            
        }
        else{

            cart = JSON.parse(localStorage.getItem('OnlineMartCart'))
            
            let productPresentInCart = false 
            cart.forEach((element)=>{
                if (element.id === product.uniqId){
                    productPresentInCart = true 
                }
            })
            if(productPresentInCart){
                    cart.forEach(element => {
                 if(element.id === product.uniqId){
                element.quantity += 1
                element.subtotal += product.discounted_price 
            }

        });
            }
            else{

            
            let prod = {}
            prod['id'] = product.uniqId
            prod['name'] = product.product_name
            prod['quantity'] = 1
            prod['image'] = product.firstImage
            prod['subtotal'] = product.discounted_price
            cart['total'] = product.discounted_price
            cart.push(prod)
        }
        localStorage.setItem('OnlineMartCart', JSON.stringify(cart) )
        }
     
        changeLocalCart();
    }

    const addItemToCart = (e, product) =>{
        let cartQuantityButton = document.getElementById('cartQuantifer' + product.uniqId)
        let cartQuantity = cartQuantityButton.querySelector('.itemQuantity') 
        console.log(cartQuantityButton)
        console.log(cartQuantity)
        cartQuantity.innerHTML  = Number.parseInt(cartQuantity.innerHTML)+ 1
        let cart = JSON.parse(localStorage.getItem('OnlineMartCart'))

        cart.forEach(element => {
            if(element.id === product.uniqId){
                element.quantity += 1
                element.subtotal += product.discounted_price 
            }
        });
        localStorage.setItem('OnlineMartCart', JSON.stringify(cart) )


        changeLocalCart();

    }


    const subtractItemToCart = (e, product) =>{
        let cartQuantityButton = document.getElementById('cartQuantifer' + product.uniqId)
        let cartQuantity = cartQuantityButton.querySelector('.itemQuantity') 
        cartQuantity.innerHTML  = Number.parseInt(cartQuantity.innerHTML)- 1
        let cart = JSON.parse(localStorage.getItem('OnlineMartCart'))

        // console.log(cart)
        cart.forEach(element => {
            if(element.id === product.uniqId){
                element.quantity -= 1
                element.subtotal -= product.discounted_price 
                if(element.quantity===0){
                    console.log('quantity', element.quantity)
                    cart = cart.filter(element => element.id !== product.uniqId)
                    let buyNowButton = document.getElementById('item'+product.uniqId)
        let cartQuantityButton = document.getElementById('cartQuantifer' + product.uniqId)
        let cartQuantity = cartQuantityButton.querySelector('.itemQuantity') 
        cartQuantity.innerHTML  = 1
        cartQuantityButton.style.display = 'none'
        buyNowButton.style.display = 'block'

                }
            }
        });
        localStorage.setItem('OnlineMartCart', JSON.stringify(cart) )
        changeLocalCart();
    }

    return (
        <>
            {
                products.map((product) => {
                    let discount = ((product.retail_price - product.discounted_price) / product.retail_price) * 100
                    discount = Math.floor(discount)

                    return <div className='itemCard' key={uuid()} >
                        <div className='itemCardImg' style={{
                            backgroundImage: `url(${imgURl + product.firstImage
                                })`,
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }} >
                           
                        </div>
                        <div className='itemDetails'>
                            <h3 className='itemName' onClick={()=>window.open(`/productDetail/${product.uniqId}`,'_blank')} >{product.product_name} </h3>
                            <h4 className='itemDesc'>Rating: {product.rating}</h4>
                            <h4 className='itemDesc'><span className='discountPrice'>₹{product.discounted_price}</span> <span className='retailPrice'>₹ {product.retail_price}</span></h4>
                            <h4 className='itemDesc'><span className='Discount'>{discount}% Off</span> </h4>
                        </div>
                        <button className='ProductButton' id = {'item'+product.uniqId}  onClick={(e)=>{buyNow(e, product)}}   >Buy NOW</button>
                        <div className='cartQuantifier' id={'cartQuantifer' + product.uniqId
                    } >
                            <div className='cartQuantifierButton' id={`subtract${product.uniqId
                            }`} onClick = {(e)=>{
                                subtractItemToCart(e,product)
                            }} >-</div>
                            <div className='itemQuantity'>1</div>
                            <div className='cartQuantifierButton' id={`add${product.uniq
                            }`} onClick = {(e)=>{addItemToCart(e, product)}} >+</div>

                        </div>
                    </div>
                })
            }
        </>
    )
}
