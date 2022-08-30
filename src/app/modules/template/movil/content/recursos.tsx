import { Fragment, useEffect, useState } from 'react'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {useDropzone} from 'react-dropzone';
import AudioResource from '../../../../utility/component/resource/audio';
import Image from '../../../../utility/component/template/item/recursos/image'
import { testRecursos } from '../../../../utility/global/data'
const Recursos = () => {

    const [files, setFiles] = useState<any>([])
    const {getRootProps, getInputProps} = useDropzone({
      accept: {
        'image/*': []
      },
      onDrop: (acceptedFiles : any) => {
        const item: any = acceptedFiles.map((file : any ) => Object.assign(file, {
            preview: URL.createObjectURL(file)
          }))
        setFiles([...files, item ]);
      }
    });
    const thumbs = files.map((file : any, index : number) => (
        <Col key={index} lg={6}>
            {
                file[0] ? <Image data={file[0]} /> : <AudioResource item={file} />
            }
            
        </Col>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach((file : any)=> URL.revokeObjectURL(file.preview));
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    useEffect(() => {
        setFiles(testRecursos)
    },[])
    console.log(testRecursos)
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
            
            <PerfectScrollbar style={{ height: '200px' }} className="min-tumnail">
                <Row>
                    {thumbs}
                </Row>
            </PerfectScrollbar>
            
            <Row className="pt-5">
                <Col 
                    // style={{ border: '1px dashed #009EF7', padding: '50px' }} 
                    // className="text-center"
                >
                    <section className="w-100">
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p><i className="bi bi-arrow-90deg-down text-white"/></p>
                            <p>
                                Suelta aqui tus archivos
                            </p>
                        </div>
                    </section>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Recursos