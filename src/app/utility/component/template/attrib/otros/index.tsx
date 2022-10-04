import { FC, Fragment, useRef } from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'

type Model = {
    editItem: any
    updateElement: (data : any) => void
}

const AttrText: FC<Model> = ({ editItem, updateElement }) => {

    const titulo = useRef<HTMLInputElement>(null)

    const changeSizeTitle = () => {
       if(titulo.current) {
        const item = {
            ...editItem,
            text: titulo.current.value
        }
        updateElement(item)
       }
        
    }

    return (
        <div className="w-100">
            <Row>
                <Col lg={12}>
                    { editItem.type === 'map' &&
                        <Fragment>
                            <Row className="py-1">
                                <Col  className="mx-1 px-0">
                                    <Form.Control defaultValue={editItem.text} placeholder="inserte contenido de google maps" size="sm" type="text" ref={titulo} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center mt-3">
                                    <Button variant="primary" size="sm" onClick={() => changeSizeTitle()}>Guardar</Button>
                                </Col>
                            </Row>
                        </Fragment>
                    }
                    
                </Col>
            </Row>
        </div>
    )
}

export default AttrText