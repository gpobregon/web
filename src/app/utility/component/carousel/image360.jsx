import {Fragment, FC} from 'react'
import {Pannellum} from 'pannellum-react'

type Model = {
    data: any,
}

const Image360: FC<Model> = ({data}) => {
    return (
        <Fragment>
            <Pannellum
                width='100%'
                height='300px'
                image={data.url}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
            >
                <Pannellum.Hotspot type='custom' pitch={31} yaw={150} name='hs1' />
            </Pannellum>
        </Fragment>
    )
}

export default Image360
