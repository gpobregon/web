/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, useState, useRef } from 'react'
import { Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap'
import { Image } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
  } from 'react-image-crop'
import CropImage from './cropImage'

type Model = {
    editItem: any
    updateElement: (data : any) => void
}

const AttrText: FC<Model> = ({ editItem, updateElement }) => {

    const [imgSrc, setImgSrc] = useState('')
    const previewCanvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState<number | undefined>(16 / 9)

    const changeSizeTitle = (data : {}) => {
        const item = {
            ...editItem,
            ...data
        }
        updateElement(item)
    }

    // useDebounceEffect(
    //     async () => {
    //       if (
    //         completedCrop?.width &&
    //         completedCrop?.height &&
    //         imgRef.current &&
    //         previewCanvasRef.current
    //       ) {
    //         // We use canvasPreview as it's much faster than imgPreview.
    //         canvasPreview(
    //           imgRef.current,
    //           previewCanvasRef.current,
    //           completedCrop,
    //           scale,
    //           rotate,
    //         )
    //       }
    //     },
    //     100,
    //     [completedCrop, scale, rotate],
    //   )

    return (
        <div className="w-100">
             { 
                (editItem.type === 'image') &&
                <Row>
                    <Col className="d-flex justify-content-center ">
                        <div className="py-2 d-flex flex-row">
                            <div className="tooltip-container mx-2">
                                <Button 
                                    variant="secondary"
                                    className="btn-icon tooltip-trigger"
                                    onClick={() => changeSizeTitle({ borderRadius: 'rounded-top' })}
                                >
                                    <Image
                                        alt="Logo"
                                        className={`max-h-100px cursor-pointer`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/Change.svg`)}
                                    />
                                </Button>
                                <div className="tooltip-one">
                                    Cambiar Imagen
                                </div>
                            </div>
                                                        
                            <div className="tooltip-container mx-2">
                                <Button 
                                    variant="secondary"
                                    className="btn-icon tooltip-trigger"
                                    onClick={() => changeSizeTitle({ borderRadius: 'rounded-top' })}
                                >
                                    <Image
                                        alt="Logo"
                                        className={`max-h-100px cursor-pointer`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/Crop.svg`)}
                                    />
                                </Button>
                                <div className="tooltip-one">
                                    Recortar
                                </div>
                            </div>
                            <div className="tooltip-container mx-2">
                                <Button 
                                    variant="secondary"
                                    className="btn-icon tooltip-trigger"
                                    onClick={() => changeSizeTitle({ borderRadius: 'rounded-top' })}
                                >
                                    <Image
                                        alt="Logo"
                                        className={`max-h-100px cursor-pointer`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/Trash.svg`)}
                                    />
                                </Button>
                                <div className="tooltip-one">
                                    Eliminar Image
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="w-100">
                            <CropImage />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <small>foto-1.jpg</small>
                    </Col>
                    {/* <Col lg={12} className="mx-1 px-0">
                        <Form.Label><small>{editItem.type === 'schedule' ? 'Hora' : 'Fecha' } inicial</small></Form.Label>
                        <Form.Control 
                            size="sm" 
                            defaultValue={editItem.startHour} 
                            type={editItem.type === 'schedule' ? 'time' : 'date' } 
                            onChange={(e : any) => changeSizeTitle(editItem.type === 'schedule' ? { startHour: e.target.value } : { startDate: e.target.value })}
                        />
                    </Col> */}
                </Row>
            }
            { (editItem.type === 'video') &&
                <Row>
                    <Col>
                        <div className="resource-element size-resource-video rounded d-flex justify-content-center align-items-center">
                            <span className="text-center">
                                <p><i className="bi bi-arrow-90deg-down text-white"/></p>
                                <p>Arrasta un video de los recursos</p>
                            </span>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <small>video-1.mp4</small>
                    </Col>
                </Row>
            }

            {(editItem.type === 'carousel') &&
                <Row>
                    <Col>
                        <div className="resource-element size-resource-video rounded d-flex justify-content-center align-items-center">
                            <span className="text-center">
                                <p><i className="bi bi-arrow-90deg-down text-white"/></p>
                                <p>Arrasta una imagen</p>
                            </span>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <small>video-1.mp4</small>
                    </Col>
                    <Col lg={12} className="py-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Títitulo" />
                    </Col>
                    <Col lg={12}>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" size="sm" placeholder="Descripción" />
                    </Col>
                    <Col lg={12} className="pt-3 d-flex justify-content-center">
                        <Button size="sm">Agregar</Button>
                    </Col>
                </Row>
            }
            <Row className="pt-5">
                <Col lg={12}>
                    { 
                        (editItem.type === 'video') &&
                        <Row>
                            <Form.Label>Tipo de Borde</Form.Label>
                            <ButtonGroup aria-label="Basic example" size="sm">
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded' })} ><div className="btn-style cornered-edge"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-circle' })} ><div className="btn-style border rounded-circle border-white w-25"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-pill' })} ><div className="btn-style border rounded-pill border-white w-25"></div></Button>
                            </ButtonGroup>
                        </Row>
                    }
                    
                </Col>
            </Row>
        </div>
    )
}

export default AttrText