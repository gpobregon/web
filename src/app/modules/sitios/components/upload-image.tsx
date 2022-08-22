import React, { useState, FC } from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import * as util from 'util';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import { uuid } from 'uuidv4';


const S3_BUCKET = 'mcd-backoffice-upload';
const REGION = 'us-east-2';



AWS.config.update({
    accessKeyId: 'AKIARVZ4XJOZRDSZTPQR',
    secretAccessKey: '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'
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

const UpImage: FC<any> = ({ show, onClose, cargarIMG }) => {




    const [img, setImg] = useState('')
    const [progress, setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e: any) => {
        setSelectedFile(e.target.files[0]);
      
    }

    const uploadFile = (file: any) => {
        setImg(file.name)
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }
    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{'Escoge Tu Imagen'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type="file" onChange={handleFileInput} accept="image/*"/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => {
                            uploadFile(selectedFile)
                            cargarIMG(img)

                        }}
                    >
                        {'Aplicar '}
                        <i className={`bi-check2 text-white fs-3`}></i>
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpImage
