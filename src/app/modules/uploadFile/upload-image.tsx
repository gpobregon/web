import React, { useState, FC } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import * as util from 'util';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { uuid } from 'uuidv4';
import swal from "sweetalert";

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
})

const UpImage: FC<any> = ({ show, onClose, cargarIMG,ubicacionBucket,tipoArchivoPermitido }) => {
    const S3_BUCKET = `mcd-archivos/${ubicacionBucket}`;
    const REGION = process.env.REACT_APP_REGION;
    
    
    
    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    })


    const [img, setImg] = useState('')
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [porcentajeCargado,setPorcetajeCargado] = useState(0);
    const handleFileInput = (e: any) => {
        setSelectedFile(e.target.files[0]);
        setImg(e.target.files[0].name)
    }

    const uploadFile = (file: any) => {
        
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', async (evt) => {
                if(evt.loaded/evt.total === 1){
                await delay(3000);
                setProgress(0)
                 cargarIMG(img)  // return the name of the file to the parent component
               
                }else{
                    setPorcetajeCargado (Math.round( (evt.loaded / evt.total)*100));
                    setProgress(1)
                    // swal("Cargando Imagen..." ,"Espere Un Momento", "info");
                }
            })
            .send((err) => {
            })
    }
    function delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    const handleSubmit =async () => {
    
        if(progress === 0){
        uploadFile(selectedFile) //upload file to s3
        }
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Escoge Tu Archivo'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="file" onChange={handleFileInput} accept={tipoArchivoPermitido}/>
                
                </Modal.Body>
                <Modal.Footer>
               
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    { selectedFile != null ? 
                    <Button
                        variant='primary'
                        onClick={() => {
                            
                            handleSubmit()
                            
                        }}
                    >
                     
                        
                        {progress === 1 ? 'Cargando Imagen... '+porcentajeCargado+'%'  :  'Listo'}
                     
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                   
                    
                    : null }
                   
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpImage
