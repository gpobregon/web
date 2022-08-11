import React, { FC, useEffect, useState } from 'react';
import { Col, Card, Button, Row } from 'react-bootstrap';

type rooms = {
    id_sala: number
    id_sitio: number
    descripcion: string
    nombre: string
    estado: string
    points_of_interest: [
    ]

} 


const Rooms: FC<rooms>  = (props) => {

    const sala= () => {
        console.log(props.descripcion)
    }

    return (
        <>
        <Button variant="secondary" size="sm" onClick={() => {
                        sala()
                        }}>
                 Sitio {props.id_sala}
        </Button>{' '}
        </>
    )
}

export default Rooms;