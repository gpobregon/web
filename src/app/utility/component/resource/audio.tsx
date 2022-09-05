import { FC } from 'react'
type Props = {
    item: any
}
const AudioResource: FC<Props> = ({ item }) => {
    const Icon = ['music-note', ]

    // const getIcon = (item : any) => {
    //     let Icono 
    //     switch(item.type) {
    //         case 'audio':
    //           // code block
    //           break;
    //         case 'video':
              
    //           break;
    //         default:
    //           // code block
    //       }
    // }
    return (
        <div className="bkg-dark content-icon rounded my-2 text-center">
            <div className="icon-wrapper">
                <i className={`bi bi-${item.type === 'audio' ? Icon[0] : '' } fs-1 text-white`}></i>
            </div>
            <p className="icon-name text-truncate mb-0 mt-1">{ item.name }</p>
        </div>
    )
}

export default AudioResource