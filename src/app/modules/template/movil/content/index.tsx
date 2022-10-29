import { useContext } from 'react'
import { Card, Row, Col, ButtonGroup, Button, Image, Form } from 'react-bootstrap'
import { toAbsoluteUrl } from '../../../../../_metronic/helpers'
import PerfectScrollbar from 'react-perfect-scrollbar'
import EditableDesktop from './editableDesktop/index'
import EditableMovil from './editableMovil/index'
import { ContentContext } from '../context'
import ElementosMovil from './elementosMovil'
import ElementosWeb from './elementosWeb'
import Recursos from './recursos'

const Index = () => {
    const { ChangeMode, changeTypeEdit, setChangeModeEditor, changeModeEditor, setSizeWeb } = useContext(ContentContext)
    return (
        <Card className="content-section text-white">
            <Card.Body>
                <Row>
                    <Col lg={4}>
                        <Card.Body className="seccion-dark rounded height-section">
                            <h1 className="text-white">{changeModeEditor === 1 ? 'Agregar Elemento' : 'Recursos Disponibles'}</h1>
                            <span>
                                Elementos disponibles para uso de maquetación
                            </span>
                            <ButtonGroup className="w-100 py-5">
                                <Button size="sm" className="text-white" variant={changeModeEditor === 1 ? 'primary' : 'dark bkg-dark'} onClick={() => setChangeModeEditor(1)}>{changeTypeEdit === 1 ? 'Elementos' : 'Diseño'}</Button>
                                <Button size="sm" className="text-white" variant={changeModeEditor === 2 ? 'primary' : 'dark bkg-dark'} onClick={() => setChangeModeEditor(2)}>Recursos</Button>
                            </ButtonGroup>

                            {
                                changeModeEditor === 1 ? <PerfectScrollbar className="h-75"> {changeTypeEdit === 1 ? <ElementosMovil /> : <ElementosWeb />} </PerfectScrollbar> : <Recursos />
                            }
                        </Card.Body>
                    </Col>
                    <Col lg={8}>
                        <Row>
                            <Col lg={changeTypeEdit === 1 ? 6 : 12} className="d-flex justify-content-center py-10 text-primary">
                                <div className="tooltip-container me-5">
                                    <Image
                                        alt="Logo"
                                        style={{ fill: 'red' }}
                                        className={`max-h-70px cursor-pointer tooltip-trigger`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/${changeTypeEdit === 1 ? 'Movil-active.svg' : 'Movil.svg'}`)}
                                        onClick={() => ChangeMode(1)}
                                    />
                                    <div className="tooltip-one">
                                        Maquetación Móvil
                                    </div>
                                </div>
                                <div className="tooltip-container">
                                    <Image
                                        alt="Logo"
                                        className={`max-h-70px cursor-pointer tooltip-trigger`}
                                        src={toAbsoluteUrl(`/media/svg/iconsFigma/${changeTypeEdit === 2 ? 'Desktop-active.svg' : 'Desktop.svg'}`)}
                                        onClick={() => ChangeMode(2)}
                                    />
                                    <div className="tooltip-one">
                                        Maquetación Web
                                    </div>
                                </div>
                                {changeTypeEdit === 2 &&
                                    <div className="ms-3">
                                        <Form.Check
                                            inline
                                            label="100%"
                                            name="tamanio"
                                            type={'radio'}
                                            value="100"
                                            defaultChecked={true}
                                            onChange={() => setSizeWeb('100')}
                                        />
                                        <Form.Check
                                            inline
                                            label="75%"
                                            name="tamanio"
                                            type={'radio'}
                                            value="75"
                                            onChange={() => setSizeWeb('75')}
                                        />
                                    </div>
                                }
                            </Col>
                        </Row>
                        <Row>
                            {changeTypeEdit === 1 ? <EditableMovil /> : <EditableDesktop />}
                        </Row>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default Index