import { Row, Col } from 'react-bootstrap'
import { Fragment, useContext } from 'react'
import CustomCollapse from './collapse'
import { ContentContext } from '../context'
import { Texts, Information, Multimedia, Others } from "../../../../utility/global/data";
// textos
import Text from "../../../../utility/component/template/item/textos/text";
import Paragraph from "../../../../utility/component/template/item/textos/paragraph";
import List from "../../../../utility/component/template/item/textos/list";
// informacion
import Event from "../../../../utility/component/template/item/informacion/event";
import Schedule from "../../../../utility/component/template/item/informacion/schedule";
// Multimedia
import Imagen from "../../../../utility/component/template/item/multimedia/image";
import Video from "../../../../utility/component/template/item/multimedia/video";
import Audio from "../../../../utility/component/template/item/multimedia/audio";
import Carousel from "../../../../utility/component/template/item/multimedia/carousel";
import Image360 from "../../../../utility/component/template/item/multimedia/image360";
// otros
import Url from "../../../../utility/component/template/item/otros/url";
import Map from "../../../../utility/component/template/item/otros/map";

const Elementos = () => {
    const { setEditItem, updateElement } = useContext(ContentContext)
    return (
        <Fragment>
            <CustomCollapse title="Textos">
                <Row className="text-center text-white">
                    {Texts.map((item : any, index : number) => {
                        return (
                            <Col lg={4} key={index}>
                                { item.type === 'title' &&
                                    <Text
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                                { item.type === 'paragraph' &&
                                    <Paragraph
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                                { item.type === 'list' &&
                                    <List
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                            </Col>
                        )
                    })}
                </Row>
            </CustomCollapse>
            <CustomCollapse title="Información">
                <Row className="text-center text-white">
                    {Information.map((item : any, index : number) => {
                        return (
                            <Col lg={4} key={index}>
                                { item.type === 'schedule' &&
                                    <Schedule
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                                { item.type === 'event' &&
                                    <Event
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                            </Col>
                        )
                    })}
                </Row>
            </CustomCollapse>
            <CustomCollapse title="Multimedia">
                <Row className="text-center text-white">
                    {Multimedia.map((item : any, index : number) => {
                        return (
                            <Col lg={4} key={index}>
                                { item.type === 'image' &&
                                    <Imagen
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                                { item.type === 'video' &&
                                    <Video
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                                { item.type === 'audio' &&
                                    <Audio
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                                { item.type === 'carousel' &&
                                    <Carousel
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                                { item.type === 'image-360' &&
                                    <Image360
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                            </Col>
                        )
                    })}
                </Row>
            </CustomCollapse>
            <CustomCollapse title="Otros">
                <Row className="text-center text-white">
                    { Others.map((item : any, index : number) => {
                        return (
                            <Col lg={4} key={index}>
                                { item.type === 'url' &&
                                    <Url
                                        key={index}
                                        data={item}
                                    />
                                }
                                { item.type === 'map' &&
                                    <Map
                                        key={index}
                                        data={item}
                                        setEditItem={setEditItem}
                                        updateElement={updateElement}
                                    />
                                }
                            </Col>
                        )
                    })}
                </Row>
            </CustomCollapse>
        </Fragment>
    )
}

export default Elementos


