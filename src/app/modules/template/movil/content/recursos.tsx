import {Fragment, useEffect, useContext} from 'react'
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
import ElementDrag from '../../../../utility/component/Element/elementDragResource'
import AudioResource from '../../../../utility/component/resource/audio'
import Image from '../../../../utility/component/resource/image'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {useDropzone} from 'react-dropzone'
import {ContentContext} from '../context'
import Masonry from 'react-masonry-css'
import CustomCollapse from './collapse' 


const Recursos = () => {
    const {
        uploadResource,
        allResources,
        allResourcesElement,
        destroyOneResource,
        filteredData,
        filteredDataElement,
        searchValue,
        searchValueElement,
        handleFilter, 
        changeTypeEdit,
    } = useContext(ContentContext)
    const breakpointColumnsObj = {default: 2, 1100: 1, 700: 2, 500: 1}
    const {getRootProps, getInputProps} = useDropzone({
        accept: {'image/*': [], 'video/*': [], 'audio/*': []},
        onDrop: (acceptedFiles: any) => {
            acceptedFiles.map((file: any) => {
                const fileUploaded = Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })

                uploadResource(fileUploaded, 1)
            })
        },
        multiple: true,
    })

    const thumbs = (searchValue.length ? filteredData : allResources).map(
        (file: any, index: number) => {
            return file.tipo.includes('image/') ? (
                <Image key={index} item={file} destroyOneResource={destroyOneResource} />
            ) : (
                <AudioResource key={index} item={file} destroyOneResource={destroyOneResource} />
            )
        }
    )

    const ResourceElement = (
        searchValueElement.length ? filteredDataElement : allResourcesElement
    ).map((file: any, index: number) => {
        return (
            <Col xl={6} lg={12} md={12} sm={6} key={`element-${index}`}>
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
        return () => allResources.forEach((file: any) => URL.revokeObjectURL(file.preview))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Fragment>
            <PerfectScrollbar
                style={{height: '310px', maxWidth: '485.px', width: '100%'}}
                className='min-tumnail px-4'
            >
                <CustomCollapse title='Multimedia'>
                    <Row>
                        <Col>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text id='search-resource'>
                                    <i className='fa fa-search' />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder='Buscar'
                                    aria-label='Username'
                                    aria-describedby='basic-addon1'
                                    value={searchValue}
                                    onChange={(e: any) => handleFilter(e, allResources, 1)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className='my-masonry-grid'
                        columnClassName='my-masonry-grid_column'
                    >
                        {thumbs}
                    </Masonry>
                </CustomCollapse>
                <CustomCollapse title='Elementos'>
                    <Row>
                        <Col>
                            <InputGroup className='mb-3'>
                                <InputGroup.Text id='search-element'>
                                    <i className='fa fa-search' />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder='Buscar'
                                    aria-label='Username'
                                    aria-describedby='basic-addon1'
                                    value={searchValueElement}
                                    onChange={(e: any) => handleFilter(e, allResourcesElement, 2)}
                                />
                            </InputGroup>
                        </Col>
                    </Row>

                    <Row>{ResourceElement}</Row>
                </CustomCollapse>
            </PerfectScrollbar>

            <Row className='pt-5'>
                <Col>
                    <section className='w-100'>
                        <div {...getRootProps({className: 'dropzone'})}>
                            <input {...getInputProps()} />
                            <p>
                                <i className='bi bi-arrow-90deg-down text-white' />
                            </p>
                            <p>Suelta aqui tus archivos</p>
                        </div> 
                        <div> 
                        <p className="small text-muted">{changeTypeEdit === 1 ? 'Se recomienda no cargar imagenes mayores a 5 MB' : ''}</p>
                        </div>
                    </section>
                </Col>
            </Row>
        </Fragment>
    )
}

export default Recursos
