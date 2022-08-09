import React, {FC} from 'react'
import {Col, Card, Button, Figure} from 'react-bootstrap'

const Language: FC<any> = ({data, onClickLanguage}) => {
    return (
        <Col sm='4' md='12' className='mb-9'>
            <Card
                className='d-flex align-items-center flex-row py-3 px-8'
                style={{
                }}
            >
                <i className='bi bi-list fs-2'></i>

                <div className='d-flex flex-column my-4 px-5 justify-content-between'>
                    <Card.Subtitle className='text-white mb-4'>{data.nombre}</Card.Subtitle>
                    <Card.Subtitle className='text-muted'>{data.descripcion}</Card.Subtitle>
                </div>

                <div className='flex-fill'>
                    <div className='d-flex justify-content-end'>
                        <i
                            className='bi-three-dots fs-2 '
                            onClick={onClickLanguage}
                            style={{cursor: 'pointer'}}
                        ></i>
                    </div>
                </div>
            </Card>
        </Col>
    )
}

export default Language
