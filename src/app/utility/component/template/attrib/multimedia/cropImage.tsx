/* eslint-disable jsx-a11y/alt-text */
import { useState } from 'react'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const CropDemo = () => {
    const [crop, setCrop] = useState<Crop>()
    console.log(crop)
    return (
      <ReactCrop crop={crop} onChange={c => setCrop(c)}>
        <img className="w-80" src='https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' />
      </ReactCrop>
    )
  }

export default CropDemo