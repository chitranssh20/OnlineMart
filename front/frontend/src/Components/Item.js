import React from 'react'
import { v4 as uuid } from 'uuid'
import './Product.css'
import './Global.css'

export const Item = ({ products }) => {
    const imgURl = 'http://127.0.0.1:8000/product';

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
                            //   height: "10%",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        }} >
                           
                        </div>
                        <div className='itemDetails'>
                            <h3 className='itemName'>{product.product_name} </h3>
                            <h4 className='itemDesc'>Rating: {product.rating}</h4>
                            <h4 className='itemDesc'><span className='discountPrice'>₹{product.discounted_price}</span> <span className='retailPrice'>₹ {product.retail_price}</span></h4>
                            <h4 className='itemDesc'><span className='Discount'>{discount}% Off</span> </h4>
                        </div>
                        <button className='ProductButton' >Buy NOW</button>
                    </div>
                })
            }
        </>
    )
}
