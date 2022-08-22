import { FC, Fragment } from 'react'
import { Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap'

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
    // id: 11,
    // type: "video",
    // text: 'Video',
    // borderRadius: 'rounded',
    // BorderWidth: 'border border-1',
    // BorderColor: 'border border-white'
    return (
        <div className="w-100">
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