/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from "react";
import { Row, Col, Image } from 'react-bootstrap'
import { toAbsoluteUrl } from '../../../../../../_metronic/helpers'

const style = {
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  cursor: 'grabbing',
}

type Model = {
    data: any
    referencia: any
    handlerId: any
    setEditItem: (data : any) => void
    updateElement: (data : any) => void
}

const Text: FC<Model> = ({ referencia, handlerId, data, setEditItem, updateElement }) => { 

    const changeText = (e : any) => {
        const edit = {
          ...data,
          text: e.target.value
        }
        updateElement(edit)
    }
    return (
        <Row
            ref={referencia}
            data-handler-id={handlerId}
            onClick={() => setEditItem(data)}
            style={style}
            className="d-flex justify-content-center my-0"
        >
            <Col 
                className={`my-0 editable ${data.size} ${data.textAling} ${data.fontWeight} ${data.fontFamily} ${data.textDecoration}`}
                lg={8}
            >
                <div className="border rounded-pill py-1">
                    <Row className="d-flex justify-content-center">
                        <Col lg={2} className="d-flex justify-content-center align-items-center">
                            <Image
                                alt="Logo"
                                className={`max-h-50px cursor-pointer my-3`}
                                height="20px"
                                src={toAbsoluteUrl(`/media/svg/iconsFigma/Time.svg`)}
                            />
                        </Col>
                        <Col lg={6} className="d-flex flex-column">
                            <small>{ data.text }</small>
                            <span>{ data.startHour } -  {data.finalHour} </span>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Text