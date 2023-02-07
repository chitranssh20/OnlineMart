import React, {useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid'
import '../Global.css'
import axiosInstance from '../Axios'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ManageStaff = () => {

  let navigate = useNavigate()
  const [staff, setstaff] = useState([])

  useEffect(() => {
    axiosInstance.get('customer/checkAdmin/').then(function(res){
      if (res.data.rescode !== 202){
        navigate('/admin')
        console.log(res.data.rescode, 'djdj')
      }
    }).catch(err=>navigate('/admin'))
  }, [])
  
  useEffect(() => {
    const getStaff = () =>{
      try{

        axiosInstance.get('customer/getStaff/').then(res=>setstaff(res.data.staff)).catch(err=>console.log(err))
      }
      catch{
        window.alert('Some error occured')
      }
    }
      getStaff()
  }, [])
  
  
  const deleteStaff = (e, email) =>{
    e.preventDefault()
    console.log(email)
    axiosInstance.delete('customer/deleteStaff/', {data: {'email': email}}).then((res)=>{
      if (res.data.status === 401){
        window.alert('You are not authorized to take this action')
      }
      else if(res.data.status === 400){
        window.alert('Missing Credentials') 
      }
      else if(res.data.status === 410){
        window.alert('Staff Member has been removed. Please refresh the page to see changes.')
      }
    }).catch(err=>console.log(err))
  }
  
    return (
      <>
      <button className='AdminButtons' onClick={()=>window.open('/addstaff','_blank')} >+ Add Staff</button>
      <button className='AdminButtons' onClick={()=>window.open('/addsuperuser','_blank')}>+ Add SuperUser</button>
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Position</td>
            <td>Phone</td>
            <td>Action</td>
            
          </tr>
        </thead>
        <tbody>
          {staff.map((staffMember)=>{
     
     return staffMember.is_superuser?
             <tr key={uuid()} >
              <td>{staffMember.fname}</td>
              <td>{staffMember.email}</td>
              <td>Superuser</td>
              <td>{staffMember.phone}</td>
              <td><button onClick={()=>{window.alert('Cannot Delete a superuser')}} >Can't Delete</button></td>
            </tr>:<tr key={uuid()}>
            <td>{staffMember.fname}</td>
              <td>{staffMember.email}</td>
              <td>Staff</td>
              <td>{staffMember.phone}</td>
              <td><button onClick={(e)=>{deleteStaff(e, staffMember.email)}} >Delete Staff</button></td>

            </tr>
          })
          }
        </tbody>
      </table>
      </>
  )
}
