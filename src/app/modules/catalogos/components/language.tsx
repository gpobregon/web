import React, {FC} from 'react'
import {Col, Card, Button, Figure} from 'react-bootstrap'
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

const Language: FC<any> = ({data, showModal}) => {
    return (
        <Col sm='4' md='12' className='mb-9'>
            <Card className='d-flex align-items-center flex-row py-3 px-8' style={{}}>
                <i className='bi bi-list fs-2'></i>

                <div className='d-flex flex-column my-4 px-5 justify-content-between'>
                    <Card.Subtitle className='text-white mb-4'>{data.nombre}</Card.Subtitle>
                    <Card.Subtitle className='text-muted'>{data.descripcion}</Card.Subtitle>
                </div>

                <div className='flex-fill'>
                    <div className='d-flex justify-content-end'>
                        <CustomTooltip title='Editar'>
                            <i
                                className='bi-three-dots fs-2 '
                                onClick={showModal}
                                style={{cursor: 'pointer'}}
                            ></i>
                        </CustomTooltip>
                    </div>
                </div>
            </Card>
        </Col>
    )
}

export default Language
