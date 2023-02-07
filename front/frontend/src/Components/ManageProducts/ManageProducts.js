import React from 'react'

export const ManageProducts = () => {
  return (
    <>
    <button  className='AdminButtons' onClick={()=>window.open('/productdash','_blank')} >Manage Products</button>
    <br></br>

    <br></br>
    <button  className='AdminButtons' onClick={()=>window.open('/addProduct','_blank')} >+ Add Product</button>
    <br></br>
    </>
  )
}
