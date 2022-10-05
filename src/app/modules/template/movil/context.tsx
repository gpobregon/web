/* eslint-disable no-empty-pattern */
// context/todoContext.tsx
import { updateData, appendData, validElement, generateRandomString } from '../../../utility/global/index'
import { createContext, FC, useState, useCallback, useEffect, useContext } from 'react'
import { WithChildren } from '../../../utility/models/childrenContext'
import { LoadingContext } from '../../../utility/component/loading/context'
import { getData, postData } from '../../../services/api'
import { useParams, useNavigate } from 'react-router-dom'
import update from 'immutability-helper'
import { useDrop } from "react-dnd"
import swal from 'sweetalert'
import * as AWS from 'aws-sdk'
import _ from 'lodash'

export const ContentContext = createContext<any | null>(null)

AWS.config.update({
    accessKeyId: process.env.REACT_APP_ACCESSKEYID,
    secretAccessKey: process.env.REACT_APP_SECRETACCESSKEY
})

const myBucket = new AWS.S3({
    params: { Bucket: process.env.REACT_APP_S3_BUCKET },
    region: process.env.REACT_APP_REGION,
})

export const ContentProvider: FC<WithChildren> = ({ children }) => {
    const [board, setBoard] = useState<any>([])
    const [show, handleClose] = useState<boolean>(false)
    const [oldBoard, setOldBoard] = useState<any>([])
    const [language, setLanguage] = useState<any>([])
    const [changeModeEditor, setChangeModeEditor] = useState<Number>(1)
    const { setShowLoad } = useContext(LoadingContext)
    const [allResources, setAllResource] = useState<any>([])
    const [allResourcesElement, setAllResourceElement] = useState<any>([])
    const [oneDataSite, setOneDataSite] = useState<any>([])
    const [changeLaguage, setChangeLaguage] = useState<any>([])
    const [changeTypeEdit, setChangeTypeEdit] = useState<Number>(1)
    let [count, setCount] = useState(0)
    const [editItem, setEditItem] = useState<any>([])
    const [editItemResource, setEditItemResource] = useState<any>([])
    const { id, tipo, idSitio } = useParams()
    const navigate = useNavigate()
    // Agregar elemento
    const addElement = (data: any) => {
        // // const response = validElement(data.type)
        // // const result = response.filter((item: any) => data.type === item.type);
        if (data.typeElement === 'multimedia') {
            setChangeModeEditor(2)
        }
        setCount((count: number) => 1)
        const item = data
        setBoard((board: []) =>
            [
                ...board,
                {
                    ...item,
                    id: generateRandomString(7),
                    // text: `${item.text} ${(board.length + 1)}`,
                    text: `${item.text}`,
                    index: (board.length + 1)
                }
            ]
        );
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [{ isOver, isOverCurrent }, drop] = useDrop(
        () => ({
            accept: 'image',
            drop(item: any, monitor: any) {
                const didDrop = monitor.didDrop()
                if (didDrop) {
                    return
                }
                addElement(item.data)
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                isOverCurrent: monitor.isOver({ shallow: true }),
            }),
        })
    )

    // Dragable fotos

    const [{ }, drop2] = useDrop(() => ({
        accept: "image",
        drop: (item: any) => updateElementResource(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    // Arrastrar elemento 
    const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
        setBoard((prevCards: any[]) =>
            update(prevCards, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevCards[dragIndex] as any],
                ],
            }),
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Actualizar el recurso a editar 
    const updateElementResource = (item: any) => {
        setEditItemResource(item.item)
    }
    // Actualizar data de un item
    const updateElement = (data: []) => {
        setEditItem(data)
        setBoard(updateData(board, data))
    }
    // Cambiar Lenguaje
    const changeLangegeSelect = (data: any) => {
        setChangeLaguage(data)
        oneData(data, changeTypeEdit === 1 ? true : false)
    }

    const ChangeMode = (type: number) => {
        setBoard([])
        setChangeTypeEdit(type)
        oneData(changeLaguage, type === 1 ? true : false)
    }

    // get all data
    const getLenguate = async () => {
        const response: any = await getData('language/select')
        setLanguage(response.data.length > 0 ? response.data : [])
        setChangeLaguage(response.data.length > 0 ? response.data[0] : [])
        oneData(response.data.length > 0 ? response.data[0] : [], changeTypeEdit === 1 ? true : false)
    }

    // obtenemos el template 
    const oneData = async (item: any, type: boolean) => {
        const data = {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "id_lenguaje": item.value,
            "es_movil": type
        }
        const response: any = await postData('site/mobile/getone', data)
        if (response.data.length > 0) {
            setBoard(JSON.parse(response.data[0].contenido))
            setOldBoard(JSON.parse(response.data[0].contenido))
        } else {
            setBoard([])
            setOldBoard([])
        }
    }

    // guardamos el template
    const storeTemplate = async () => {
        setShowLoad(true)
        const dataTemplate = {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "id_lenguaje": changeLaguage.value,
            "nombre": "Nombre editado3 sitio movil 1",
            "descripcion": "descripcion2 editado sitio movil 1",
            "contenido": JSON.stringify(board),
            "version": "version sitio movil 1",
            "es_movil": changeTypeEdit === 1 ? true : false,
            "estado": 1
        }
        const response: any = await postData('site/mobile/set', dataTemplate)
        response &&
            swal(
                {
                    text: '¡Configuración almacenada exitosamente!',
                    icon: 'success',
                }
            )
        setShowLoad(false)
    }

    // elimina items dragados en el editor
    const removeItem = (data: any) => {
        const newBoard = board.filter((item: any) => String(item.id) !== String(data))
        setBoard(newBoard)
        setEditItem([])
        setEditItemResource([])
    }

    // descarta los cambios realizados dentro del editor
    const discardChange = () => {
        setBoard(oldBoard)
    }

    const oneSite = async () => {
        const response: any = await getData(`site/${id}`)
        setOneDataSite(response.site ? response.site : [])
    }

    // Recursos

    const uploadResource = async (file: any, option: number) => {
        setShowLoad(true)
        const url = `${process.env.REACT_APP_URLAWS}resource-${changeTypeEdit === 1 ? 'mobile' : 'web'}-${id}-${file.name}`;
        const fileResource =
        {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "nombre": file.name,
            "url": url,
            "tipo": file.type,
            "contenido": '',
            "tipo_elemento": 'multimedia',
            "es_movil": changeTypeEdit === 1 ? true : false,
            "estado": 1
        }

        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: `${process.env.REACT_APP_S3_BUCKET}`,
            Key: `resource-${changeTypeEdit === 1 ? 'mobile' : 'web'}-${id}-${file.name}`
        };
        // URLAWS
        myBucket.putObject(params)
            .on('httpUploadProgress', async (evt) => {
                if(evt.loaded/evt.total === 1){ 
                    const response: any = await postData('site/mobile/resource/add', fileResource)
                    setAllResource(appendData(allResources, response.data))
                    if (option === 1) {
                        response &&
                            swal(
                                {
                                    text: 'Recurso almacenado con exito',
                                    icon: 'success',
                                }
                            )
                    } else {
                        setShowLoad(false)
                        return url
                    }
                    setShowLoad(false)
                }
            })
            .send((err) => {
                if (err) console.log(err)
            })
    }

    const uploadElement = async (data: any) => {
        setShowLoad(true)
        const item =
        {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "nombre": data.nombre,
            "url": '',
            "tipo": data.typeElement,
            "contenido": JSON.stringify(data),
            "tipo_elemento": 'element',
            "es_movil": changeTypeEdit === 1 ? true : false,
            "estado": 1
        }

        const response: any = await postData('site/mobile/resource/add', item)
        response &&
        swal(
            {
                text: 'Recurso almacenado con exito',
                icon: 'success',
            }
        )
        setAllResourceElement(appendData(allResourcesElement, { ...item, id_recurso: response.data.id_recurso }))
        handleClose(false)
        setShowLoad(false)
    }

    // Se obienen todos los recursos
    const getAllResources = async () => {
        const jsonData = {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "es_movil": changeTypeEdit === 1 ? true : false
        }
        const response: any = await postData('site/mobile/resource', { ...jsonData, "tipo_elemento": 'multimedia', })
        const response2: any = await postData('site/mobile/resource', { ...jsonData, "tipo_elemento": 'element', })
        if (response.data) {
            setAllResource(response.data)
        }
        if (response2.data) {
            setAllResourceElement(response2.data)
        }
    }
    // Eliminacion de un recurso
    const destroyOneResource = async (id: number, tipo: number) => {
        setShowLoad(true)
        const response: any = await postData('site/mobile/resource/delete', { "id_recurso": id })
        
        const items = (tipo === 1? allResources : allResourcesElement).filter((item: any) => String(item.id_recurso) !== String(id))
        response &&
            swal(
                {
                    text: 'Recurso eliminado con exito',
                    icon: 'success',
                }
            )
        tipo === 1 ? setAllResource(items) : setAllResourceElement(items)
        setShowLoad(false)
    }

    // ------------------------------------------------------
    useEffect(
        () => {
            if (board.length > 0 && count === 1) {
                setEditItem(_.last(board))
                setCount((count: number) => count = 0)
            }

        }, [board, count]
    )
    // ------------------------------------------------------------
    useEffect(() => {

        if (tipo === 'sitio' || tipo === 'punto') {
            getAllResources()
            getLenguate()
            oneSite()
        } else {
            navigate(`/error/404`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const value = {
        drop,
        show,
        tipo,
        drop2,
        board,
        oneData,
        language,
        editItem,
        moveCard,
        ChangeMode,
        removeItem,
        setEditItem,
        handleClose,
        oneDataSite,
        allResources,
        uploadElement,
        discardChange,
        updateElement,
        storeTemplate,
        changeLaguage,
        changeTypeEdit,
        uploadResource,
        setChangeLaguage,
        editItemResource,
        changeModeEditor,
        destroyOneResource,
        changeLangegeSelect,
        setEditItemResource,
        setChangeModeEditor,
        allResourcesElement
    }

    return (
        <ContentContext.Provider value={value} >
            {children}
        </ContentContext.Provider>
    )
}