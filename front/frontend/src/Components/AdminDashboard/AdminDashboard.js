import React, { useEffect } from 'react'
import axiosInstance from '../Axios'
import './AdminDashboard.css'
import '../Global.css'
export const AdminDashboard = () => {
useEffect(() => {
  console.log('hehelehele')
  console.log('dndnd',  localStorage.getItem('access_token'))
  axiosInstance.get('customer/checkAdmin/').then(res=>console.log(res)).catch(err=> console.log(err))
}, [])


  return (
    <>

    <button  className='AdminDashboardButton' onClick={()=>window.open('/managestaff','_blank')} >Manage Staff</button>
    <br></br>
    <button  className='AdminDashboardButton' >Manage Products</button>
    <button  className='AdminDashboardButton' >Manage Promo Codes</button>
    <button  className='AdminDashboardButton' >Track Order</button>
    </>
  )
}
