import React from 'react'
import '../header/Header.css'

export default function Header(props) {
  return (
    <div className='headerDiv'>
      <h1>Simple Book Catalogue</h1>
      {props.children}
      <img id="bookImg" src="../assets/images/book.gif" alt="bookImage" />

    </div>
  )
}
