import { useContext } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { ContentContext } from './context'
import { useForm } from "react-hook-form"

type FormData = {
    nombre: string
}

const Index = () => {
    const { handleClose, show, editItem, uploadElement } = useContext(ContentContext)
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<FormData>()
    const storeElement = (data: any) => {
        const item = {
            ...editItem,
            ...data

        }
        uploadElement(item)
    }
    return (
        <Modal
            show={show}
            onHide={() => handleClose(false)}
            backdrop="static"
            keyboard={false}
            centered
            size="sm"
        >
            <Modal.Header closeButton>
                <Modal.Title>Guardar Elemento</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit(storeElement)}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nombre del elemento</Form.Label>
                        <Form.Control
                            {...register('nombre',
                                {
                                    required: "Este campo es requerido",
                                }
                            )
                            }
                            isInvalid={!!errors.nombre}
                        />
                        <Form.Control.Feedback type="invalid" className="text-white" tooltip>
                            {!!errors.nombre && errors.nombre.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="sm" onClick={() => handleClose(false)}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary" size="sm">Guardar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}

export default Index