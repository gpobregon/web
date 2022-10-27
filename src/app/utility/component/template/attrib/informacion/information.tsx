import { FC, Fragment, useRef } from 'react'
import { Row, Col, Button, ButtonGroup, Form } from 'react-bootstrap'

type Model = {
    editItem: any
    updateElement: (data: any) => void
}

const AttrText: FC<Model> = ({ editItem, updateElement }) => {

    const valor1 = useRef<HTMLInputElement>(null)
    const valor2 = useRef<HTMLInputElement>(null)

    function ValidarFechas() {

        if (valor1.current && valor2.current) {
            if (Date.parse(valor1.current.value) <= Date.parse(valor2.current.value)) {
                return true
            }
            else {
                return false
            }
        }
    }
    const changeSizeTitle = (data: {}) => {
        if (editItem.type === 'event' && (editItem.finalHour || editItem.finalDate) !== '0000-00-00') {
            if (ValidarFechas()) {
                const item = {
                    ...editItem,
                    ...data
                }
                updateElement(item)
            }
        } else {
            const item = {
                ...editItem,
                ...data
            }
            updateElement(item)
        }

    }

    return (
        <div className="w-100">
            <Row>
                <Col lg={12}>
                    {(editItem.type === 'schedule' || editItem.type === 'event') &&
                        <Fragment>
                            <Row className="py-1 w-80">
                                <Col className="mx-1 px-0">
                                    <Form.Label><small>{editItem.type === 'schedule' ? 'Título' : 'Descripción'}</small></Form.Label>
                                    {editItem.type === 'schedule' ?
                                        <Form.Control
                                            defaultValue={editItem.text}
                                            placeholder="escribe un título"
                                            size="sm"
                                            onChange={(e: any) => changeSizeTitle({ text: e.target.value })}
                                        />
                                        :
                                        <Form.Control
                                            defaultValue={editItem.text}
                                            placeholder="escribe un título"
                                            size="sm"
                                            rows={3}
                                            as="textarea"
                                            onChange={(e: any) => changeSizeTitle({ text: e.target.value })}
                                        />
                                    }
                                </Col>
                            </Row>
                            <Row className="py-1 pb-3">
                                <Col className="mx-1 px-0">
                                    <Form.Label><small>{editItem.type === 'schedule' ? 'Hora' : 'Fecha'} inicial</small></Form.Label>
                                    <Form.Control
                                        size="sm"
                                        ref={valor1}
                                        defaultValue={editItem.startHour || editItem.startDate}
                                        type={editItem.type === 'schedule' ? 'time' : 'date'}
                                        onChange={(e: any) => changeSizeTitle(editItem.type === 'schedule' ? { startHour: e.target.value } : { startDate: e.target.value })}
                                    />
                                </Col>
                                <Col className="mx-1 px-0">
                                    <Form.Label><small>{editItem.type === 'schedule' ? 'Hora' : 'Fecha'} Final</small></Form.Label>
                                    <Form.Control
                                        size="sm"
                                        ref={valor2}
                                        defaultValue={editItem.finalHour || editItem.finalDate}
                                        type={editItem.type === 'schedule' ? 'time' : 'date'}
                                        onChange={(e: any) => changeSizeTitle(editItem.type === 'schedule' ? { finalHour: e.target.value } : { finalDate: e.target.value })}
                                    />
                                </Col>
                            </Row>
                        </Fragment>
                    }
                    {
                        (editItem.type === 'schedule' || editItem.type === 'paragraph') &&
                        <Row>
                            <ButtonGroup aria-label="Basic example" size="sm">
                                <Button variant="secondary" onClick={() => changeSizeTitle({ textAling: 'text-start' })} ><i className="bi bi-justify-left" /></Button>
                                <Button variant="secondary" onClick={() => changeSizeTitle({ textAling: 'text-center' })} ><i className="bi bi-text-center" /></Button>
                                <Button variant="secondary" onClick={() => changeSizeTitle({ textAling: 'text-end' })} ><i className="bi bi-justify-right" /></Button>
                                <Button variant="secondary" onClick={() => changeSizeTitle({ fontWeight: editItem.fontWeight === 'fw-normal' ? 'fw-bolder' : 'fw-normal' })} ><i className="bi bi-type-bold" /></Button>
                                <Button variant="secondary" onClick={() => changeSizeTitle({ fontFamily: editItem.fontFamily === 'fw-normal' ? 'fst-italic' : 'fw-normal' })} ><i className="bi bi-type-italic" /></Button>
                                <Button variant="secondary" onClick={() => changeSizeTitle({ textDecoration: editItem.textDecoration ? '' : 'text-decoration-underline' })} ><i className="bi bi-type-underline" /></Button>
                            </ButtonGroup>
                        </Row>
                    }

                </Col>
            </Row>
        </div>
    )
}

export default AttrText