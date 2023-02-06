import React, {FC} from 'react'
import {Col, Card, Button} from 'react-bootstrap'
import {Tooltip, tooltipClasses, TooltipProps} from '@mui/material'
import {styled} from '@mui/system'

const CustomTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}} />
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 500,
    },
}))

const Catalogo: FC<any> = ({data, showModal}) => {
    return (
        <Col sm='4' md='2' className='mb-6'>
            <Card
                style={{
                    display: 'flex',
                    padding: 20,
                    alignItems: 'center',
                    textAlign: 'center',
                    height: 175,
                    justifyContent: 'space-between',
                }}
            >
                <Card.Title
                    className='mb-4'
                    style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                >
                    <span className='menu-ico'>
                        <i className={`fa-solid fa-${data.icono} text-white fa-2x`}></i>
                        {/* <i className={`bi-${data.icono} text-white`} style={{fontSize: 30}}></i> */}
                    </span>
                </Card.Title>
                <Card.Subtitle className='text-muted mb-4'>{data.nombre}</Card.Subtitle>
                <Card.Subtitle className='text-muted'>{data.idioma.nombre}</Card.Subtitle>
                <CustomTooltip title='Editar'>
                    <span
                        className='menu-ico mt-auto'
                        style={{cursor: 'pointer'}}
                        onClick={showModal}
                    >
                        <i className={`bi-three-dots text-muted`} style={{fontSize: 20}}></i>
                    </span>
                </CustomTooltip>
            </Card>
        </Col>
    )
}

export default Catalogo
