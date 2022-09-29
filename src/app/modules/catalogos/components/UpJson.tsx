import {useState, FC} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'
import * as AWS from 'aws-sdk'

const UpJson: FC<any> = ({show, onClose, uploadJson, url, setShow}) => {
    const [progress, setProgress] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const [porcentajeCargado, setPorcetajeCargado] = useState(0)
    const [json, setJson] = useState('')

    const S3_BUCKET = 'mcd-archivos/' + url
    const REGION = 'us-east-1'

    AWS.config.update({
        accessKeyId: 'AKIAT3ANXPJIKZ7AOACD',
        secretAccessKey: '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',
    })

    const myBucket = new AWS.S3({
        params: {Bucket: S3_BUCKET},
        region: REGION,
    })

    const handleFileInput = (e: any) => {
        setSelectedFile(e.target.files[0])
        setJson(e.target.files[0].name)
    }
    const uploadFile = (file: any) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
        }

        myBucket
            .putObject(params)
            .on('httpUploadProgress', async (evt) => {
                if (evt.loaded / evt.total === 1) {
                    await delay(3000)
                    setProgress(0)
                    uploadJson(json) // return the name of the file to the parent component
                } else {
                    setPorcetajeCargado(Math.round((evt.loaded / evt.total) * 100))
                    setProgress(1)
                    // swal("Cargando Imagen..." ,"Espere Un Momento", "info");
                }
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }
    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    const handleSubmit = async () => {
        if (progress === 0) {
            uploadFile(selectedFile) //upload file to s3
            setShow({show: true, language: {}})
        }
    }

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona el archivo de configuración</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type='file' onChange={handleFileInput} accept='.json' />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='secondary'
                        onClick={() => {
                            onClose()
                            setShow({show: true, language: {}})
                        }}
                    >
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    {selectedFile != null ? (
                        <Button
                            variant='primary'
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                            {progress === 1
                                ? 'Cargando archivo de configuración... ' + porcentajeCargado + '%'
                                : 'Listo'}

                            <i className={`bi-check2 text-white fs-3`}></i>
                        </Button>
                    ) : null}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpJson
