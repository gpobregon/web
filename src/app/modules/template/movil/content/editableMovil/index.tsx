import { Fragment, useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AttrItems from '../../../../../utility/component/template/attrib/index'
import ItemEditable from '../../../../../utility/component/template/itemEditable/index'
import { ContentContext } from '../../context'

const EditableMovil = () => {
    const { drop, board, editItem, updateElement, moveCard, setEditItem } = useContext(ContentContext)
    return (
        <Fragment>
            <Col lg={6}>
                <div className="bkg-dark rounded p-4" ref={drop}>
                    <PerfectScrollbar className="height-section-editable" component="div">
                        {
                            board.map((item : any, index : number) => {

                                return (
                                    <div key={index}>
                                        <ItemEditable 
                                            key={index} 
                                            data={item} 
                                            index={index}
                                            id={item.id} 
                                            moveCard={moveCard}
                                            setEditItem={setEditItem}
                                            updateElement={updateElement}
                                        />
                                    </div>
                                )
                            })
                        }
                    </PerfectScrollbar>
                </div>
            </Col>
            <Col lg={6}>
                <Card.Body className="rounded height-section-editable d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                    { editItem.length !== 0 && <AttrItems editItem={editItem} updateElement={updateElement}/>}
                    </div>
                </Card.Body>
            </Col>
        </Fragment>
    )
}

export default EditableMovil