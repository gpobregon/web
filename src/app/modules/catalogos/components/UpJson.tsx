import {useState, FC} from 'react'
import {Button, Modal, Form} from 'react-bootstrap'

const UpJson: FC<any> = ({show, onClose, cargarIMG}) => {
    const [img, setImg] = useState('')
    const [progress, setProgress] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)
    const [porcentajeCargado, setPorcetajeCargado] = useState(0)

    return (
        <>
            <Modal show={show} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Selecciona el archivo de configuración</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control type='file' /*  onChange={handleFileInput} */ accept='.json' />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={onClose}>
                        {'Cancelar '}
                        <i className={`bi-x text-white fs-3`}></i>
                    </Button>
                    {selectedFile != null ? (
                        <Button
                            variant='primary'
                            /*         onClick={() => {
                                handleSubmit()
                            }} */
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
