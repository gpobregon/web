/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC, Fragment } from 'react'
import { Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap'
import Crop from './cropImage'

type Model = {
    editItem: any
    updateElement: (data : any) => void
}

const AttrText: FC<Model> = ({ editItem, updateElement }) => {

    const changeSizeTitle = (data : {}) => {
        const item = {
            ...editItem,
            ...data
        }
        updateElement(item)
    }

    return (
        <div className="w-100">
             { 
                (editItem.type === 'image') &&
                <Row>
                    <Col className="d-flex justify-content-center ">
                        <div className="py-2 d-flex flex-row">
                            <Button 
                                variant="secondary"
                                className="btn-icon"
                                onClick={() => changeSizeTitle({ borderRadius: 'rounded' })}
                            >
                                <i className="fa fa-trash"/>
                            </Button>
                            <Button 
                                variant="secondary"
                                className="btn-icon mx-2"
                                onClick={() => changeSizeTitle({ borderRadius: 'rounded-top' })}
                            >
                                <div className="btn-style border rounded-top border-white"></div>
                            </Button>
                            <Button 
                                variant="secondary" 
                                className="btn-icon" 
                                onClick={() => changeSizeTitle({ borderRadius: 'rounded-end' })} 
                            >
                                <div className="btn-style border rounded-end border-white"></div>
                            </Button>
                        </div>
                    </Col>
                    <Col lg={12}>
                        <div className="w-100">
                            <Crop />
                        </div>
                    </Col>
                    <Col lg={12}>
                        <small>foto-1.jpg</small>
                    </Col>
                    <Col lg={12} className="mx-1 px-0">
                        <Form.Label><small>{editItem.type === 'schedule' ? 'Hora' : 'Fecha' } inicial</small></Form.Label>
                        <Form.Control 
                            size="sm" 
                            defaultValue={editItem.startHour} 
                            type={editItem.type === 'schedule' ? 'time' : 'date' } 
                            onChange={(e : any) => changeSizeTitle(editItem.type === 'schedule' ? { startHour: e.target.value } : { startDate: e.target.value })}
                        />
                    </Col>
                </Row>
            }
            <Row>
                <Col lg={12}>
                    { 
                        (editItem.type === 'video') &&
                        <Row>
                            Tipo de Borde 
                            <ButtonGroup aria-label="Basic example" size="sm">
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded' })} ><div className="btn-style border rounded border-white"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-top' })} ><div className="btn-style border rounded-top border-white"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-end' })} ><div className="btn-style border rounded-end border-white"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-bottom' })} ><div className="btn-style border rounded-bottom border-white"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-start' })} ><div className="btn-style border rounded-start border-white"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-circle' })} ><div className="btn-style border rounded-circle border-white"></div></Button>
                                <Button variant="secondary" className="d-flex justify-content-center" onClick={() => changeSizeTitle({ borderRadius: 'rounded-pill' })} ><div className="btn-style border rounded-pill border-white"></div></Button>
                            </ButtonGroup>
                        </Row>
                    }
                    
                </Col>
            </Row>
        </div>
    )
}

export default AttrText