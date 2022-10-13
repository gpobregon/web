/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useState, FC, useEffect, useRef, Fragment } from 'react'
import { canvasPreview } from './canvasPreview'
import ReactCrop, { Crop, PixelCrop  } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

type Model = {
  editItemResource: any
  setDataResource: any
}

const CropDemo: FC<Model> = ({ editItemResource, setDataResource }) => {

    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
  
   useEffect(() => {
    if (editItemResource.url &&  
        imgRef.current && 
        previewCanvasRef.current && 
        completedCrop?.width &&
      completedCrop?.height) {
      canvasPreview(
        imgRef.current,
        previewCanvasRef.current,
        completedCrop,
        1,
        0,
      )
       setDataResource(previewCanvasRef.current.toDataURL("image/png"))
    }
   }, [editItemResource, completedCrop])

    return (
      <Fragment>
        <ReactCrop crop={crop} onChange={c => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
          <img
            ref={imgRef}
            alt=""
            className="w-80" 
            src={editItemResource.url ? editItemResource.url : ''}
            crossOrigin="anonymous"
          />
        </ReactCrop>
        {Boolean(completedCrop) && (
            <canvas
              ref={previewCanvasRef}
              id="canvas"
              width="100%" 
              height="250"
              style={{
                display: "none",
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop && completedCrop.width,
                height: completedCrop && completedCrop.height,
              }}
            />
          )}
      </Fragment>
    )
  }

export default CropDemo