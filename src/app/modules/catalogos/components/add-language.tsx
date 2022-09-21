import {FC, useState} from 'react'
import {Button, Modal, Form, Card} from 'react-bootstrap'
import {KTSVG} from '../../../../_metronic/helpers'
import UpJson from './UpJson'

const AddLanguaje: FC<any> = ({show, setShow, onClose, language, setLanguage, addLanguage}) => {
    const [showJson, setShowJson] = useState(false)

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Configuración de idioma</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Nombre del idioma</Form.Label>
                        <Form.Control
                            value={language.nombre}
                            type='text'
                            maxLength={20}
                            className='mb-4'
                            onChange={(e) => {
                                setLanguage({
                                    id_lenguaje: language.id_lenguaje,
                                    nombre: e.target.value,
                                    descripcion: language.descripcion,
                                    estado: language.estado,
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            value={language.descripcion}
                            className='mb-4'
                            type='text'
                            maxLength={20}
                            name='descripcion'
                            onChange={(e) => {
                                setLanguage({
                                    id_lenguaje: language.id_lenguaje,
                                    nombre: language.nombre,
                                    descripcion: e.target.value,
                                    estado: language.estado,
                                })
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Adjuntar Plantilla - Movil</Form.Label>
                        <Card
                            className='mb-4'
                            style={{
                                backgroundColor: '#151521',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <i className='bi bi-file-earmark-arrow-up-fill svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 m-3' />
                                    <div>Subir un archivo</div>
                                </div>
                                <div
                                    onClick={() => {
                                        setShow(false)
                                        setShowJson(true)
                                    }}
                                >
                                    <KTSVG
                                        path='/media/icons/duotune/general/gen035.svg'
                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 m-3'
                                    />
                                </div>
                            </div>
                        </Card>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Adjuntar Plantilla - Website</Form.Label>
                        <Card
                            className='mb-4'
                            style={{
                                backgroundColor: '#151521',
                                height: '50px',
                                display: 'flex',
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                            }}
                        >
                            <div
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}
                                >
                                    <i className='bi bi-file-earmark-arrow-up-fill svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 m-3' />

                                    <div>Subir un archivo</div>
                                </div>

                                <div
                                    onClick={() => {
                                        setShow(false)
                                        setShowJson(true)
                                    }}
                                >
                                    <KTSVG
                                        path='/media/icons/duotune/general/gen035.svg'
                                        className='svg-icon-2 svg-icon-lg-1 svg-icon-gray-500 m-3'
                                    />
                                </div>
                            </div>
                        </Card>
                        <div style={{textAlign: 'center', color: 'gray'}}>
                            Formato permitido: .json
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setLanguage({
                                id_lenguaje: 0,
                                nombre: '',
                                descripcion: '',
                                estado: 1,
                            })
                            onClose()
                        }}
                    >
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            addLanguage(language)
                        }}
                    >
                        {'Aplicar '}
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
            <UpJson

                show={showJson}
                onClose={() => {
                    setShowJson(false)
                    setShow(true)
                }}
            />
        </>
    )
}

export default AddLanguaje
