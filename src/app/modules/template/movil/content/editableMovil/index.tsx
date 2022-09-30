import { Fragment, useContext } from 'react'
import { Card, Col } from 'react-bootstrap'
import PerfectScrollbar from 'react-perfect-scrollbar'
import AttrItems from '../../../../../utility/component/template/attrib/index'
import ItemEditable from '../../../../../utility/component/template/itemEditable/index'
import { ContentContext } from '../../context'

const EditableMovil = () => {
    const { drop, drop2, saveResourceElement, setEditItemResource, uploadResource, editItemResource, board, editItem, updateElement, moveCard, setEditItem, removeItem } = useContext(ContentContext)

    return (
        <Fragment>
            <Col lg={6}>
                <div className="bkg-dark rounded p-4" ref={drop}>
                    <PerfectScrollbar className="height-section-editable" component="div" style={{ paddingBottom: '100px' }}>
                        {
                            board.map((item : any, index : number) => {

                                return (
                                    <div key={index}>
                                        <ItemEditable 
                                            key={index} 
                                            data={item}
                                            id={item.id}
                                            index={index}
                                            moveCard={moveCard}
                                            removeItem={removeItem}
                                            setEditItem={setEditItem}
                                            updateElement={updateElement}
                                            saveResourceElement={saveResourceElement}
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
                    <div className="d-flex align-items-center w-100">
                        { 
                            editItem.length !== 0 && 
                            <AttrItems
                                drop2={drop2}
                                editItem={editItem} 
                                updateElement={updateElement}
                                uploadResource={uploadResource}
                                editItemResource={editItemResource}
                                setEditItemResource={setEditItemResource}
                                
                            />
                        }
                    </div>
                </Card.Body>
            </Col>
        </Fragment>
    )
}

export default EditableMovil