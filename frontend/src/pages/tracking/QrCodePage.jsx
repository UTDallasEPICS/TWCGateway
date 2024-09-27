import QRCode from "qrcode"
import {useState} from 'react'
import Navbar from "../../components/Navbar"

function QrCodePage() {
  const [username, setUsername] = useState('')
  const [src, setSrc] = useState('')
  const generate = () =>{
    QRCode.toDataURL(`https://example.com/${username}`).then(setSrc).catch((err) => {
      console.error(err); 
    });
  }
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center w-screen bg-gray-300 h-screen">
        <h2>Generate QR Code</h2>
        <input
        type = 'text'
        className="bg-blue-400"
        value = {username}
        onChange = {(e) => setUsername(e.target.value)}/>
        <img src={src}/>
        <button type='button' onClick={generate}>Create QR Code</button>
      </div> 
    </div>
  )
}

export default QrCodePage



  
