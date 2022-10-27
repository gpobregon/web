/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { ContentContext } from './context'
import { useForm, Controller } from "react-hook-form"
import { customStyles } from '../../../utility/global/index';
import Select from 'react-select'

type FormData = {
    nombre: string
    descripcion: string
    clonar: boolean
    idioma: { label: string, value: number }
}

const Index = () => {
    const { handleCloseSave, showSave, saveTemplate, language, oneDataTemplate, getTemplateClone, changeTypeEdit, templateToClone, setTemplateToClone } = useContext(ContentContext)

    const { register, handleSubmit, formState: { errors }, reset, setValue, control, watch, clearErrors } = useForm<FormData>()
    const validarCheck = watch('clonar')
    const idioma = watch('idioma')
    const storeElement = (data: any) => {
        saveTemplate(data)
    }

    const setData = () => {
        setValue('nombre', oneDataTemplate.nombre)
        setValue('descripcion', oneDataTemplate.descripcion)
    }

    useEffect(() => {
        oneDataTemplate.length !== 0 ? setData() : reset()
    }, [oneDataTemplate])

    useEffect(() => {
        if (idioma) {
            getTemplateClone(idioma, changeTypeEdit === 1 ? true : false)
        } else {
            setTemplateToClone('')
        }
    }, [idioma])

    useEffect(() => {

        clearErrors(["clonar", "idioma"])

    }, [validarCheck])
    return (
        <Modal
            show={showSave}
            onHide={() => handleCloseSave(false)}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>Guardar Maquetación</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(storeElement)}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre de maquetación</Form.Label>
                        <Form.Control
                            {...register('nombre',
                                {
                                    required: "El nombre es requerido",
                                }
                            )
                            }
                            isInvalid={!!errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid">
                            {!!errors.nombre && errors.nombre.message}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            as="textarea"
                            {...register('descripcion',
                                {
                                    required: "La descripción es requerido",
                                }
                            )
                            }
                            isInvalid={!!errors.descripcion}
                        />
                        <Form.Control.Feedback type="invalid">
                            {!!errors.descripcion && errors.descripcion.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col className="my-2 text-center">
                            Clonar contenido de otras maquetas asociados a otros idiomas
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center align-items-center">
                            <div className="form-check form-switch form-check-custom form-check-solid">
                                <Form.Control
                                    type="checkbox"
                                    className="form-check-input"
                                    {...register('clonar',
                                        {
                                            required: {
                                                value: validarCheck,
                                                message: "Este campo es requerido",
                                            }
                                        }
                                    )
                                    }
                                    id="flexSwitchDefault"
                                    isInvalid={!!errors.clonar}
                                />
                                <label className="form-check-label" htmlFor="flexSwitchDefault">
                                    Clonar Contenido
                                </label>
                            </div>
                        </Col>
                        <Col>
                            {
                                validarCheck &&
                                <Form.Group className="mb-3">
                                    <Form.Label>Idioma</Form.Label>
                                    <Controller
                                        name="idioma"
                                        control={control}
                                        render={({ field }) => {
                                            return (
                                                <Select
                                                    {...field}
                                                    isClearable
                                                    isSearchable
                                                    options={language}
                                                    defaultValue={null}
                                                    styles={customStyles}
                                                    placeholder={"Seleccione una opción"}
                                                    noOptionsMessage={() => 'sin resultados'}
                                                />
                                            )
                                        }
                                        }
                                        rules={{
                                            required: {
                                                value: validarCheck,
                                                message: "Este campo es requerido"
                                            }
                                        }}

                                    />
                                    <span className="text-danger" >{!!errors.idioma && errors.idioma.message}</span>
                                </Form.Group>
                            }
                        </Col>
                    </Row>
                    {
                        validarCheck &&
                        <Row>
                            <Col>
                                <Alert variant={templateToClone ? 'dark' : 'danger'} className="text-center">
                                    {templateToClone ? `Contiene maquetación con nombre: ${templateToClone.nombre}` : 'No contiene maquetación'}
                                </Alert>
                            </Col>
                        </Row>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={() => handleCloseSave(false)}>
                        Cancelar
                    </Button>
                    {
                        (validarCheck && templateToClone) && <Button type="submit" variant="primary" size="sm">Guardar</Button>
                    }
                    {
                        (!validarCheck) && <Button type="submit" variant="primary" size="sm">Guardar</Button>
                    }
                </Modal.Footer>
            </Form>
        </Modal >
    )
}

export default Index