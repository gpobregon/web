import { Row, Col } from 'react-bootstrap'
import { Fragment, useContext } from 'react'
import CustomCollapse from './collapse'
import { ContentContext } from '../context'
import Picture from "./Picture";
import Text from "./Text";

const Elementos = () => {
    const { Element } = useContext(ContentContext)
    return (
        <Fragment>
            <CustomCollapse title="Textos">
                <Row className="text-center text-white">
                    {Element.map((item : any, index : number) => {
                        return (
                            <Col lg={4} key={index}>
                                { item.type === 'image' && <Picture key={index} data={item} /> }
                                { item.type === 'text' && <Text key={index} data={item} option={2}/>}
                            </Col>
                        )
                    })}
                    {/* <Col lg={4}>
                        <div className="bkg-dark content-icon rounded my-2">
                            <div className="icon-wrapper">
                                <i className="bi bi-fonts fs-1"></i>
                            </div>
                            <p className="icon-name text-truncate mb-0 mt-1">Título</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="bkg-dark content-icon rounded my-2">
                            <div className="icon-wrapper">
                                <i className="bi bi-justify-left fs-1"></i>
                            </div>
                            <p className="icon-name text-truncate mb-0 mt-1">Párrafo</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="bkg-dark content-icon rounded my-2">
                            <div className="icon-wrapper">
                                <i className="bi bi-list-ul fs-1"></i>
                            </div>
                            <p className="icon-name text-truncate mb-0 mt-1">Lista</p>
                        </div>
                </Row> */}
                </Row>
            </CustomCollapse>
            <CustomCollapse title="Información">
                <Row className="text-center">
                    <Col lg={4}>
                        <div className="bkg-dark content-icon rounded my-2">
                            <div className="icon-wrapper">
                                <i className="bi bi-fonts fs-1"></i>
                            </div>
                            <p className="small icon-name text-truncate mb-0 mt-1">Dato Curioso</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="bkg-dark content-icon rounded my-2">
                            <div className="icon-wrapper">
                                <i className="bi bi-file-earmark-check fs-1"></i>
                            </div>
                            <p className="small icon-name text-truncate mb-0 mt-1">Reglamento</p>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div className="bkg-dark content-icon rounded my-2">
                            <div className="icon-wrapper">
                                <i className="bi bi-clock fs-1"></i>
                            </div>
                            <p className="icon-name text-truncate mb-0 mt-1">Horario</p>
                        </div>
                    </Col>
                </Row>
            </CustomCollapse>
            <CustomCollapse title="Multimedia">
                Otro
            </CustomCollapse>
            <CustomCollapse title="Otros">
                Otro
            </CustomCollapse>
        </Fragment>
    )
}

export default Elementos