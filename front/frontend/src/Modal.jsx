import React from 'react'
import './Modal.css' 
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Modal = () => {
    // const dispatch = useDispatch();

   const IsOpen =  useSelector(state=>state.modalReducer.isOpen)
   const Note = useSelector(state=>state.modalReducer.message)
    

  return (
    <>
    {
        IsOpen?<>
    <div className="modal">
        {Note}
    </div>
        </>:<></>

    }
    </>
  )
}

export default Modal