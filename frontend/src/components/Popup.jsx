import React from 'react'

function Popup({trigger}) {
  return (
    <div>
      <button>close</button>
      {children}
    </div>
  )
}

export default Popup
