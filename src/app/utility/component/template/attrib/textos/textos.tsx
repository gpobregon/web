import { FC } from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'

type Model = {
    editItem: any
    updateElement: (data : any) => void
}

const AttrText: FC<Model> = ({ editItem, updateElement }) => {

    const changeSizeTitle = (data : any) => {
        let edit = {}
        if (data.typeList === 'list-group-points') {
         edit = { 
             content: editItem.content.replace('list-group-numbered', 'list-group-points')
          }
        } else if (data.typeList === 'list-group-numbered' ) {
         edit = { 
             content: editItem.content.replace('list-group-points', 'list-group-numbered')
          } 
         } else {
             edit = { ...data }
         }
         const item = {
             ...editItem,
             ...edit,
             typeList: data.typeList
         }
         updateElement(item)
    }

    return (
        <div className="w-100">
            <Row>
                <Col lg={12}>
                    { editItem.type === 'title' &&
                        <Row className="pb-5">
                            <Col  className="mx-1 px-0">
                                <Button size="sm" onClick={(e : any) => changeSizeTitle({ size: 'h1' })}>
                                    H1
                                </Button>
                            </Col>
                            <Col  className="mx-1 px-0">
                                <Button size="sm" onClick={(e : any) => changeSizeTitle({ size: 'h2' })}>
                                    H2
                                </Button>
                            </Col>
                            <Col  className="mx-1 px-0">
                                <Button size="sm" onClick={(e : any) => changeSizeTitle({ size: 'h3' })}>
                                    H3
                                </Button>
                            </Col>
                            <Col  className="mx-1 px-0">
                                <Button size="sm" onClick={(e : any) => changeSizeTitle({ size: 'h4' })}>
                                    H4
                                </Button>
                            </Col>
                            <Col  className="mx-1 px-0">
                                <Button size="sm" onClick={(e : any) => changeSizeTitle({ size: 'h5' })}>
                                    H5
                                </Button>
                            </Col>
                            <Col  className="mx-1 px-0">
                                <Button size="sm" onClick={(e : any) => changeSizeTitle({ size: 'h6' })}>
                                    H6
                                </Button>
                            </Col>
                        </Row>
                    }
                    <Row>
                        <ButtonGroup aria-label="Basic example" size="sm">
                            <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ textAling: 'text-start' })} ><i className="bi bi-justify-left"/></Button>
                            <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ textAling: 'text-center' })} ><i className="bi bi-text-center"/></Button>
                            <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ textAling: 'text-end' })} ><i className="bi bi-justify-right"/></Button>
                            <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ textAling: 'text-justify' })} ><i className="bi bi-justify"/></Button>
                            <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ fontWeight: editItem.fontWeight === 'fw-normal' ? 'fw-bolder' : 'fw-normal' })} ><i className="bi bi-type-bold"/></Button>
                            <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ fontFamily: editItem.fontFamily === 'fw-normal' ? 'fst-italic' : 'fw-normal' })} ><i className="bi bi-type-italic"/></Button>
                            <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ textDecoration: editItem.textDecoration ? '' : 'text-decoration-underline' })} ><i className="bi bi-type-underline"/></Button>
                        </ButtonGroup>
                    </Row>
                    { 
                        editItem.type === 'list' && 
                        <Row>
                            <Col className="text-center pt-5">
                                <ButtonGroup aria-label="Basic example" size="sm">
                                    <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ typeList: 'list-group-numbered' })} ><i className="bi bi-list-ol"/></Button>
                                    <Button variant="secondary" onClick={(e : {}) => changeSizeTitle({ typeList: 'list-group-points' })} ><i className="bi bi-list-ul"/></Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default AttrText