import { useState, useContext } from 'react'
import { Card, Row, Col, ButtonGroup, Button } from 'react-bootstrap'
import { ContentContext } from '../context'
import Elementos from './elementos'
import Picture from "./Picture";
import Text from "./Text";
import Attrib from './attrib/index';

const Index = () => {
    const [btnActive, setBtnActive] = useState(1)
    const { drop, board } = useContext(ContentContext)
    return (
        <Card className="content-section text-white">
            <Card.Body>
                <Row>
                    <Col lg={4}>
                        <Card.Body className="seccion-dark rounded height-section">
                            <h1 className="text-white">{btnActive === 1 ? 'Agregar Elemento' : 'Recursos Disponibles' }</h1>
                            <span>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </span>
                            <ButtonGroup className="w-100 py-5">
                                <Button size="sm" className="text-white" variant={btnActive === 1 ? 'primary' : 'dark bkg-dark'} onClick={() => setBtnActive(1)}>Elementos</Button>
                                <Button size="sm" className="text-white" variant={btnActive === 2 ? 'primary' : 'dark bkg-dark'} onClick={() => setBtnActive(2)}>Recursos</Button>
                            </ButtonGroup>
                            {
                                btnActive === 1 ? <Elementos/> : ''
                            }
                            
                        </Card.Body>
                    </Col>
                    <Col lg={4}>
                        <div className="bkg-dark rounded height-section p-4" ref={drop}>
                            {
                                board.map((item : any, index : any) => {
                                return (
                                    <div key={index}>
                                        { item.type === 'image' && <Picture data={item} /> }
                                        { item.type === 'text' && <Text data={item} option={1}/>}
                                    </div>
                                )
                                })}
                        </div>
                    </Col>
                    <Col lg={4}>
                        <Card.Body className="rounded height-section d-flex justify-content-center">
                            <div className="d-flex align-items-center">
                                <Attrib/>
                            </div>
                        </Card.Body>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Index