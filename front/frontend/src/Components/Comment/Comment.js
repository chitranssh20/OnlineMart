import React from 'react'
import axiosInstance from '../Axios'
import { useState, useEffect } from 'react'
import {v4 as uuid} from 'uuid'
import './Comment.css'
import user from '../images/User.png'

export const Comment = ({productId}) => {
  
const [comments, setcomments] = useState([])
  useEffect(() => {
    const getComment =()=>{

      try {
        axiosInstance.get(`engagement/getComment/${productId}`).then((res)=>{
          if(res.data.status === 200){
            setcomments(res.data.response)
          }
        }).catch((err)=>{
          console.log(err)
        })
        
      } catch (error) {
        console.log(error)
      }  
    } 
    getComment()
  }, [])

  

  return (
    <>
      {
        comments.map((comment)=>{
          return <div className='singleComment' key={uuid()} >  
            <div className='headerComment'>
              <div className='headerImg'>
              <img src= {user} alt = 'userProfile' />
              </div>
              <h3>{comment.email} 
              </h3>
            </div>
            <p>{comment.comment}</p>
            </div>
        })
      }
    </>
  )
}
