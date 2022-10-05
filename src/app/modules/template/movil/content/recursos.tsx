import { Fragment, useEffect, useContext } from 'react'
import { Row, Col, InputGroup, Form } from 'react-bootstrap'
import ElementDrag from "../../../../utility/component/Element/elementDragResource";
import AudioResource from '../../../../utility/component/resource/audio'
import Image from '../../../../utility/component/resource/image'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useDropzone } from 'react-dropzone'
import { ContentContext } from '../context'
import Masonry from 'react-masonry-css'
import CustomCollapse from './collapse'

const Recursos = () => {
    const { uploadResource, allResources, allResourcesElement, destroyOneResource } = useContext(ContentContext)
    const breakpointColumnsObj = { default: 2, 1100: 2, 700: 2, 500: 2 }
    const { getRootProps, getInputProps } = useDropzone({
        accept: { 'image/*': [], 'video/*': [], 'audio/*': [] },
        onDrop: (acceptedFiles: any) => {
            const item: any = acceptedFiles.map((file: any) => Object.assign(file, {
                preview: URL.createObjectURL(file)
            }))
            uploadResource(item[0], 1)
        }
    });

    const thumbs = allResources.map((file: any, index: number) => {
        return (
            file.tipo.includes('image/') ? <Image key={index} item={file} destroyOneResource={destroyOneResource} /> : <AudioResource item={file} destroyOneResource={destroyOneResource} />
        )
    })

    const ResourceElement = allResourcesElement.map((file: any, index: number) => {
        return (
            <Col lg={6} key={index}>
                <ElementDrag
                    key={index}
                    item={file}
                    data={JSON.parse(file.contenido)}
                    destroyOneResource={destroyOneResource}
                />
            </Col>
        )
    })

    useEffect(() => {
        return () => allResources.forEach((file: any) => URL.revokeObjectURL(file.preview));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <Row>
                <Col>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1"><i className="fa fa-search" /></InputGroup.Text>
                        <Form.Control
                            placeholder="Buscar"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Col>
            </Row>

            <PerfectScrollbar style={{ height: '310px', maxWidth: '485.px', width: '100%' }} className="min-tumnail px-4">
                <CustomCollapse title='Multimedia'>
                    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">
                        {thumbs}
                    </Masonry>
                </CustomCollapse>
                <CustomCollapse title='Elementos'>
                    <Row>
                        {ResourceElement}
                    </Row>
                </CustomCollapse>
            </PerfectScrollbar>

            <Row className="pt-5">
                <Col>
                    <section className="w-100">
                        <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p><i className="bi bi-arrow-90deg-down text-white" /></p>
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