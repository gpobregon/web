import {FC, useState} from 'react'
import {Button, Modal, Form, Card} from 'react-bootstrap'
import {validateStringSinCaracteresEspeciales} from '../../validarCadena/validadorCadena'
import {KTSVG} from '../../../../_metronic/helpers'
import UpJson from './UpJson'
import swal from 'sweetalert'
import {URLAWS} from '../../../services/api'

const UpdateLanguage: FC<any> = ({
    show,
    onClose,
    idioma,
    setIdioma,
    updateIdioma,
    deleteIdioma,
    setShow,
    validateRole,
    permissionDeleteLanguage,
}) => {
    const [showJson, setShowJson] = useState(false)
    const [url, setUrl] = useState('')
    const [nameMovil, setNameMovil] = useState('')
    const [nameWeb, setNameWeb] = useState('')
    const uploadJson = (json: string) => {
        if (url === 'idiomasWeb') {
            setNameWeb(json)

            setIdioma({
                id_lenguaje: idioma?.id_lenguaje,
                nombre: idioma?.nombre,
                descripcion: idioma?.descripcion,
                estado: idioma?.estado,
                json_web: `${URLAWS}idiomasWeb/${json}`,
                json_movil: idioma?.json_movil,
            })
            setShowJson(false)
        } else {
            setNameMovil(json)

            setIdioma({
                id_lenguaje: idioma?.id_lenguaje,
                nombre: idioma?.nombre,
                descripcion: idioma?.descripcion,
                estado: idioma?.estado,
                json_web: idioma?.json_web,
                json_movil: `${URLAWS}idiomasMovil/${json}`,
            })
            setShowJson(false)
        }
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Actualización de idioma'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{'Nombre del idioma'}</Form.Label>
                        <Form.Control
                            defaultValue={idioma?.nombre}
                            type='text'
                            maxLength={20}
                            className={'mb-4'}
                            onChange={(e) => {
                                if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                    setIdioma({
                                        id_lenguaje: idioma?.id_lenguaje,
                                        nombre: e.target.value,
                                        descripcion: idioma?.descripcion,
                                        estado: idioma?.estado,
                                        json_web: idioma?.json_web,
                                        json_movil: idioma?.json_movil,
                                    })
                                }
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{'Descripción'}</Form.Label>
                        <Form.Control
                            defaultValue={idioma?.descripcion}
                            maxLength={20}
                            type='text'
                            name='descripcion'
                            className='mb-4'
                            onChange={(e) => {
                                if (validateStringSinCaracteresEspeciales(e.target.value)) {
                                    setIdioma({
                                        id_lenguaje: idioma?.id_lenguaje,
                                        nombre: idioma?.nombre,
                                        descripcion: e.target.value,
                                        estado: idioma?.estado,
                                        json_web: idioma?.json_web,
                                        json_movil: idioma?.json_movil,
                                    })
                                }
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
                                    <div>
                                        {nameMovil !== '' ? (
                                            nameMovil
                                        ) : (
                                            <a
                                                href={idioma?.json_movil}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                {idioma?.json_movil?.split('/').pop()}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setShow(false)
                                        setShowJson(true)
                                        setUrl('plantillasIdiomas')
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

                                    <div>
                                        {nameWeb !== '' ? (
                                            nameWeb
                                        ) : (
                                            <a
                                                href={idioma?.json_web}
                                                target='_blank'
                                                rel='noopener noreferrer'
                                            >
                                                {idioma?.json_web?.split('/').pop()}
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div
                                    onClick={() => {
                                        setShow(false)
                                        setShowJson(true)
                                        setUrl('idiomasWeb')
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
                        onClick={async () => {
                            await validateRole()

                            if (permissionDeleteLanguage) {
                                setIdioma({
                                    id_lenguaje: 1,
                                    nombre: '',
                                    descripcion: '',
                                    estado: 1,
                                    json_web: '',
                                    json_movil: '',
                                })
                                deleteIdioma({
                                    id_lenguaje: idioma?.id_lenguaje,
                                    estado: 0,
                                })
                            } else {
                                swal({
                                    title: 'No tienes permiso para eliminar un lenguaje',
                                    icon: 'warning',
                                })
                            }
                        }}
                    >
                        <i className={`bi-trash text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            setIdioma({
                                id_lenguaje: 1,
                                nombre: '',
                                descripcion: '',
                                estado: 1,
                                json_web: '',
                                json_movil: '',
                            })
                            setNameMovil('')
                            setNameWeb('')
                            setUrl('')
                            onClose()
                        }}
                    >
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            updateIdioma(idioma)
                            setNameMovil('')
                            setNameWeb('')
                            setUrl('')
                        }}
                    >
                        {'Aplicar '}
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
            <UpJson
                url={url}
                uploadJson={uploadJson}
                show={showJson}
                setShow={setShow}
                onClose={() => {
                    setShowJson(false)
                    setShow(true)
                }}
            />
        </>
    )
}

export default UpdateLanguage
