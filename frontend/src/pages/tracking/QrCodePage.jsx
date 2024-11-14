import QRCode from "qrcode"
import {useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import Navbar from "../../components/Navbar"
import { jsPDF } from "jspdf";
import { Button } from "@mantine/core";


function QrCodePage() {
  const [src, setSrc] = useState('')
  const { id } = useParams()

  useEffect(() => {
    QRCode.toDataURL(`http://localhost:5173/admin/inventory-page`).then(setSrc).catch((err) => {
      console.error(err);  
    });
  })

  const downloadPDF = () => {
    console.log(`id: ${id}`)
    const doc = new jsPDF();
    doc.addImage(src, "PNG", 20, 30, 150, 150);
    doc.save(`${id}.pdf`);
  };


  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center w-screen bg-gray-300 h-screen">
        <img src={src} className="rounded-xl border-blue-700 border-8" />
        <Button className="mt-5" variant="filled" color="green" onClick={downloadPDF}>
          Download
        </Button>
      </div> 
    </div>
  )
}

export default QrCodePage



  
