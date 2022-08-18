import { Fragment, useState, ReactNode, FC } from 'react'
export type WithChildren = {
    children?: ReactNode
    title?: string
}

const CustomCollapse: FC<WithChildren> = ({ children, title }) => {
    const [activeItem, setActiveItem] = useState(false)

    return (
        <Fragment>
            <button type="button" className={`collapsible ${activeItem && 'active'}`} onClick={ () => setActiveItem(!activeItem)}>{title}</button>
            <div className={`content-collapse ${activeItem && 'active-collapse'}`} >
                <span>{ children }</span>
            </div>
        </Fragment>
    )
}

export default CustomCollapse