import React from 'react'
import './AdminDashboard.css'
import '../Global.css'
export const AdminDashboard = () => {
  return (
    <>

    <button  className='AdminDashboardButton' onClick={()=>window.open('/managestaff','_blank')} >Manage Staff</button>
    <br></br>
    <button  className='AdminDashboardButton' >Track Order</button>
    </>
  )
}
