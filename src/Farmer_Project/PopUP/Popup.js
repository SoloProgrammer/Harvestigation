import React, { useEffect } from 'react'
import './Popup.css'

function Popup({ msg, type, setPopup }) {

  function showpop() {
    let popup = document.querySelector('.popup')
    setTimeout(() => {
      if (type == 'error') {
        popup.classList.add('error')
      }
      else {
        popup.classList.add('success')
      }

    }, 100);

    setTimeout(() => {
      popup.classList.remove('error')
      popup.classList.remove('success')
      setPopup({
        pop: false,
        pop_msg: "",
        pop_type: ""
      })
    }, 2000);
  }

  useEffect(()=>{

    showpop();
  },[msg])

  return (
    <div className={`popup`}>
      <small><b>{msg}</b></small>
    </div>
  )
}

export default Popup
