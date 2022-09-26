import { createContext, useState, FC } from 'react'
import { WithChildren } from '../../../utility/models/childrenContext'

export const LoadingContext = createContext<any | null>(null)

export const LoadingProvider: FC<WithChildren> = ({ children }) => {
    const [showLoad, setShowLoad] = useState(false)
    return(
        <LoadingContext.Provider value={{showLoad, setShowLoad}}>
            { children }
        </LoadingContext.Provider>
    )
}