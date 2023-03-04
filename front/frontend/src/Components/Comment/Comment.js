import React from 'react'
import axiosInstance from '../Axios'
import { useState, useEffect } from 'react'

export const Comment = ({productId}) => {
  
const [comments, setcomments] = useState([])
  useEffect(() => {
      try {
        axiosInstance.get(`engagement/getComment/${productId}`).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })

      } catch (error) {
        console.log(error)
      }  
    
  }, [])
  


  return (
    <>

    </>
  )
}
