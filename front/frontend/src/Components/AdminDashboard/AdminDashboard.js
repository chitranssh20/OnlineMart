import React, { useEffect } from 'react'
import axiosInstance from '../Axios'
import { useNavigate } from 'react-router-dom'
import './AdminDashboard.css'
import '../Global.css'
export const AdminDashboard = () => {

  let navigate = useNavigate()
useEffect(() => {
  axiosInstance.get('customer/checkAdmin/').then(function(res){
    if (res.data.rescode !== 202){
      navigate('/admin')
      console.log(res.data.rescode, 'djdj')
    }
  }).catch(err=>navigate('/admin'))
}, [])


  return (
    <>

    <button  className='AdminButtons' onClick={()=>window.open('/managestaff','_blank')} >Manage Staff</button>
    <br></br>
    <button  className='AdminButtons' onClick={()=>window.open('/manageproducts','_blank')} >Manage Products</button>
    <button  className='AdminButtons' >Manage Promo Codes</button>
    <button  className='AdminButtons' >Track Order</button>
    </>
  )
}
