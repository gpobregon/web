import { Row, Col } from 'react-bootstrap'
import { Fragment, useContext } from 'react'
import CustomCollapse from './collapse'
import { ContentContext } from '../context'
import { Element } from "../../../../utility/global/data";
import ElementDrag from "../../../../utility/component/Element/index";

const ElementosMovil = () => {
    const { setEditItem, updateElement } = useContext(ContentContext)
    return (
        <Fragment>
            {
                Element[0].ElementosMovil.map((item : any, index : number) => {
                       return (
                            <CustomCollapse title={item.title} key={index}>
                                <Row className="text-center text-white">
                                    {item.items.map((item : any, index : number) => {
                                        return (
                                            <Col lg={4} key={index}>
                                                <ElementDrag
                                                    key={index}
                                                    data={item}
                                                    setEditItem={setEditItem}
                                                    updateElement={updateElement}
                                                />
                                            </Col>
                                        )
                                    })}
                                </Row>
                            </CustomCollapse>
                            )
                        }
                    )

            }
        </Fragment>
    )
}

export default ElementosMovil
