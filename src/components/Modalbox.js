import React from 'react'

export default function Modalbox({open, children, onClose}) {
  if (!open) return null
  
  return (
    <div>
      <button onClick={onClose} className="bttn"><i class="fa fa-close"></i></button>
      {children}
    </div>
  )
}
