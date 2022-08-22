import { Fragment, FC } from 'react'
import Textos from './textos/textos'
import Informacion from './informacion/information'
import MultimediaAttr from './multimedia/index'

type Model = {
    editItem: any
    updateElement: (data : any) => void
}

const Index: FC<Model> = ({ editItem, updateElement }) => {
    const Texts = ["title", "paragraph", "list"]
    const Information = ["curious-fact", "regulation", "schedule", "calendar", "event"]
    const Multimedia = ["image", "video", "audio", "carousel", "image-360"]
    const Others = ["url", "document", "transportation", "map", "climate", "ticket"]

    return (
        <Fragment>
            { 
                Texts.includes(editItem.type) && <Textos editItem={editItem} updateElement={updateElement} />
            }
            { 
                Information.includes(editItem.type) && <Informacion editItem={editItem} updateElement={updateElement} />
            }
            { 
                Multimedia.includes(editItem.type) && <MultimediaAttr editItem={editItem} updateElement={updateElement} />
            }
            { 
                Others.includes(editItem.type) && <Textos editItem={editItem} updateElement={updateElement} />
            }
        </Fragment>   
    )
}

export default Index