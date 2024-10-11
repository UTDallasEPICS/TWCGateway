import React from 'react'
import QRCode from 'qrcode'

function QrCode() {
  const generate = () => {
    QRCode.toDataURL('https://google.com')
  }
  return (
    <div>
      
    </div>
  )
}

export default QrCode
