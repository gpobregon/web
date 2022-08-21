import { Fragment } from 'react'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import Dropzone from 'react-dropzone'

const Recursos = () => {
    return (
        <Fragment>
            <Row>
                <Col>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1"><i className="fa fa-search"/></InputGroup.Text>
                    <Form.Control
                        placeholder="Buscar"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
                </Col>
            </Row>
            <Row className="pt-5">
                <Col 
                    // style={{ border: '1px dashed #009EF7', padding: '50px' }} 
                    // className="text-center"
                >
                    <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Recursos