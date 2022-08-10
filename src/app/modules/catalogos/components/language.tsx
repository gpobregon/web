import React, { FC} from 'react';
import { Col, Card, Button, Figure } from 'react-bootstrap';

const Language: FC<any> = ({ data, onClickLanguage }) => {

        return (
            <Col sm='4' md='12' className='pb-10' > 
                
                <Card style={{ display: 'flex', padding: 30, height: 15, justifyContent: 'center', flexDirection: 'column', }}> 
                    <Card.Title className='text-center' style={{flexDirection: 'row' }}>
                        <span className='menu-ico'>
                            <i className={`bi-${data.icono} text-white`} style={{ fontSize: 30 }}></i>
                        </span>
                    </Card.Title>
                    <Card.Subtitle  className="text-white" style={{alignItems: 'flex-start', paddingLeft: 10}} >{data.nombre}</Card.Subtitle> 
                    <Card.Subtitle className='text-muted' style={{alignItems: 'flex-start', paddingLeft: 10, paddingTop:5}} >{data.descripcion}</Card.Subtitle> 
                    <span className='menu-ico' style={{ cursor: 'pointer', right: 10, position: 'absolute' }} onClick={onClickLanguage}> 
                        <i className={`bi-three-dots`} style={{ fontSize: 20 }}></i>
                    </span> 
                    <span className='menu-ico' style={{ left: 10 , position: 'absolute' }}> 
                        <i className={`bi bi-list`} style={{ fontSize: 20 }}></i>
                    </span>
                </Card>
            </Col> 
            
        );

    
}

export default Language;