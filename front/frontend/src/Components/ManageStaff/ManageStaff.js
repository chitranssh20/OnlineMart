import axios from 'axios'
import React, { useEffect } from 'react'
import axiosInstance from '../Axios'

export const ManageStaff = () => {
  
  
  const tryproduct = () =>{
      const response = axiosInstance.get('product/getBrands/').then(res => console.log(res.data))
      console.log(response)
      console.log('hehe')
  }
  tryproduct();
    return (
      <div>ManageStaff</div>
  )
}
