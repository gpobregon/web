/* eslint-disable no-empty-pattern */
// context/todoContext.tsx
import { updateData, appendData, generateRandomString } from '../../../utility/global/index'
import { createContext, FC, useState, useCallback, useEffect, useContext } from 'react'
import { WithChildren } from '../../../utility/models/childrenContext'
import { LoadingContext } from '../../../utility/component/loading/context'
import { getData, postData } from '../../../services/api'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
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
    const [sizeWeb, setSizeWeb] = useState<string>('100%')
    const [oneDataTemplate, setOneDataTemplate] = useState<any>([])
    const [templateToClone, setTemplateToClone] = useState<any>('')
    const [show, handleClose] = useState<boolean>(false)
    const [showSave, handleCloseSave] = useState<boolean>(false)
    const [pointInteres, setPointInteres] = useState<any>([])
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
    const [DestroyItem, setDestroyItem] = useState(false)

    const [searchValue, setSearchValue] = useState<any>([])
    const [filteredData, setFilteredData] = useState<any>([])

    const [searchValueElement, setSearchValueElement] = useState<any>([])
    const [filteredDataElement, setFilteredDataElement] = useState<any>([])

    const [editItem, setEditItem] = useState<any>([])
    const [editItemResource, setEditItemResource] = useState<any>([])
    const { id, tipo, idSitio, modo } = useParams()
    const { state } = useLocation()
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
                console.log('item', item)
                
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
    
    // ----------------------------------------------------------------

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
        swal({
            title: '¿Quiere guardar los cambios?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then((res) => {
            if (res) {
                onlySave(changeTypeEdit === 1 ? true : false)
                if (data.value === changeLaguage.value) {
                    oneData(changeLaguage, modo === 'movil' ? true : false )
                } else {
                    oneData(data, modo === 'movil' ? true : false )
                }
            } else {
                oneData(data, changeTypeEdit === 1 ? true : false)
            }
        })
    }
    // cambiar modalidad de edición
    const ChangeMode = async (type: number) => {
        swal({
            title: '¿Quiere guardar los cambios?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then((res) => {
            if (res) {
                onlySave(type)
            }
            setChangeMode(type)
        })

    }

    const onlySave = async (type: any) => {
        setShowLoad(true)
        const dataTemplate = {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "id_lenguaje": changeLaguage.value,
            "nombre": oneDataTemplate.nombre,
            "descripcion": oneDataTemplate.descripcion,
            "contenido": JSON.stringify(board),
            "version": "version sitio movil 1",
            "es_movil": changeTypeEdit === 1 ? true : false,
            "estado": 1
        }
        const response: any = await postData('site/mobile/set', dataTemplate)
        response &&
            swal(
                {
                    text: '¡Maquetación almacenada exitosamente!',
                    icon: 'success',
                }
            )
        setShowLoad(false)
    }

    const setChangeMode = (type: number) => {
        if (type === 1) {
            if (tipo === 'sitio') {
                navigate(`/template/sitio/movil/${id}`)
            } else {
                navigate(`/template/punto/${idSitio}/movil/${id}`)
            }
        } else {
            if (tipo === 'sitio') {
                navigate(`/template/sitio/web/${id}`)
            } else {
                navigate(`/template/punto/${idSitio}/web/${id}`)
            }
        }
        setBoard([])
        setChangeTypeEdit(type)
        setEditItem([])
        oneData(changeLaguage, type === 1 ? true : false)
        getAllResources(type)
    }

    // get all data
    const getLenguaje = async () => {
        const response: any = await getData('language/select')
        setLanguage(response.data.length > 0 ? response.data : [])
        setChangeLaguage(response.data.length > 0 ? response.data[0] : [])
        oneData(response.data.length > 0 ? response.data[0] : [], modo === 'movil' ? true : false)
    }
    //all lenguajes
    const getAllLenguajes = async () => {
        const response: any = await getData('language/select')
        setLanguage(response.data.length > 0 ? response.data : [])
    }

    // obtenemos el template para modificar
    const oneData = async (item: any, type: boolean) => {
        const response = await getTemplate(item, type)
        if (response.data.length > 0) {
            setOneDataTemplate(response.data[0])
            if (response.data[0].contenido !== "[]") {
                setBoard(JSON.parse(response.data[0].contenido))
                setOldBoard(JSON.parse(response.data[0].contenido))
            } else {
                setBoard([])
                setOldBoard([])
            }
        } else {
            setBoard([])
            setOldBoard([])
            setOneDataTemplate([])
        }
    }
    // funcion que setea template para clonar
    const getTemplateClone = async (item: any, type: boolean) => {
        const response = await getTemplate(item, type)
        if (response.data.length > 0) {
            if (response.data[0].contenido !== "" && response.data[0].contenido !== "[]") {
                setTemplateToClone(response.data[0])
            } else {
                setTemplateToClone('')
            }
        } else {
            setTemplateToClone('')
        }
    }
    //  funcion que obtiene un template
    const getTemplate = async (item: any, type: boolean) => {
        const data = {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "id_lenguaje": item.value,
            "es_movil": type
        }
        const response: any = await postData('site/mobile/getone', data)

        return response
    }

    // guardamos el template
    const storeTemplate = async (data: any) => {
        setShowLoad(true)
        const dataTemplate = {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "id_lenguaje": changeLaguage.value,
            "nombre": data.nombre,
            "descripcion": data.descripcion,
            "contenido": data.clonar ? templateToClone.contenido : JSON.stringify(board),
            "version": "version sitio movil 1",
            "es_movil": changeTypeEdit === 1 ? true : false,
            "estado": 1
        }
        const response: any = await postData('site/mobile/set', dataTemplate)
        response &&
            swal(
                {
                    text: data.clonar ? '¡Maquetación clonada exitosamente!' : '¡Maquetación almacenada exitosamente!',
                    icon: 'success',
                }
            )
        if (data.clonar) {
            setOneDataTemplate(dataTemplate)
            setBoard(JSON.parse(templateToClone.contenido))
            setOldBoard(JSON.parse(templateToClone.contenido))
        }
        setShowLoad(false)
    }

    // abrir modal guardar maqueta
    const toogleSave = () => {
        swal({
            title: '¿Quiere guardar los cambios?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then((res) => {
            if (res) {
                handleCloseSave(true)
            }
        })

    }

    // guardar maqueta
    const saveTemplate = (data: any) => {
        storeTemplate(data)
        handleCloseSave(false);
    }

    // elimina items dragados en el editor
    const removeItem = (data: any) => {
        const newBoard = board.filter((item: any) => String(item.id) !== String(data))
        setBoard(newBoard)
        setEditItem([]) 
        setEditItemResource([]) 
        setDestroyItem(true)
    } 
    console.log('editItem:', editItem) 

    // descarta los cambios realizados dentro del editor
    const discardChange = () => {
        swal({
            title: '¿Estas seguro de Descartar Los Cambios?',
            icon: 'warning',
            buttons: ['No', 'Sí'],
        }).then((res) => {
            if (res) {
                swal({
                    text: 'Descartado Correctamente',
                    icon: 'success',
                    timer: 2000,
                })
                setBoard(oldBoard)
            }
        })
    }
    // obtenemos el nombre del sitio que estamos editando
    const oneSite = async () => {
        let response: any
        if (tipo === 'punto') {
            response = await postData(`site/rooms`, { "id_sitio": idSitio })
            // response =  response.salas.filter((item: any) => String(item.id) !== String(id))
        } else {
            response = await getData(`site/${id}`)
        }

        setOneDataSite(response.site ? response.site : [])
    }

    // Recursos
    // guardar elementos multimedia
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
                console.log(Math.round((evt.loaded / evt.total) * 100))
                if (evt.loaded / evt.total === 1) {
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
                        setShowLoad(false)
                    } else {
                        setShowLoad(false)
                        return url
                    }
                    setShowLoad(false)
                }
            })
            .send((err) => {
                if (err) {
                    swal(
                        {
                            text: 'El recurso no fue almacenado',
                            icon: 'danger',
                        }
                    )
                    console.log(err)
                    setShowLoad(false)
                }
            })
    }
    // guardar elemento editable
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
    const getAllResources = async (type: number) => {
        const jsonData = {
            "id_punto": tipo === 'punto' ? id : -1,
            "id_sitio": tipo === 'sitio' ? id : idSitio,
            "es_movil": type === 1 ? true : false
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

        const items = (tipo === 1 ? allResources : allResourcesElement).filter((item: any) => String(item.id_recurso) !== String(id))
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

    const handleFilter = (e: any, allElement: any, tipo: number) => {
        const value = String(e.target.value)
        let updatedData = []
        tipo === 1 ? setSearchValue(value) : setSearchValueElement(value)

        if (value.length) {
            updatedData = allElement.filter((item: any) => {
                const startsWith =
                    item.nombre.toLowerCase().startsWith(value.toLowerCase())

                const includes =
                    item.nombre.toLowerCase().includes(value.toLowerCase())

                if (startsWith) {
                    return startsWith
                } else if (!startsWith && includes) {
                    return includes
                } else return null
            })
            if (tipo === 1) {
                setFilteredData(updatedData)
                setSearchValue(value)
            } else {
                setFilteredDataElement(updatedData)
                setSearchValueElement(value)

            }
        }
    }

    const ReturnView = () => {
        if (tipo === 'sitio') {
            navigate(`/sitios/editSite/${id}`)
        } else {
            navigate(`/sitios/edit-point-interes/${idSitio}/${id}`)
        }
    }
    // -------------------------------------------

    useEffect(() => {
        if (state && tipo === 'punto') {
            setPointInteres(state)
        }
    }, [state, tipo])

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

        if ((tipo === 'sitio' || tipo === 'punto') && (modo === 'movil' || modo === 'web')) {
            if (modo === 'movil') {
                setChangeMode(1)
            }
            if (modo === 'web') {
                setChangeMode(2)
            }
            getAllLenguajes()
        } else {
            navigate(`/error/404`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 


    // ------------------------------------------------------------
    useEffect(() => {

        if (DestroyItem) { 
            setEditItem([])
            setDestroyItem(false)
        } 
       
    }, [DestroyItem])

    const value = {
        drop,
        show,
        tipo,
        drop2,
        board,
        sizeWeb,
        oneData,
        language,
        editItem,
        moveCard,
        showSave,
        setSizeWeb,
        toogleSave,
        ReturnView,
        ChangeMode,
        removeItem,
        setEditItem,
        handleClose,
        searchValue,
        oneDataSite,
        allResources,
        filteredData,
        pointInteres,
        handleFilter,
        saveTemplate,
        uploadElement,
        discardChange,
        updateElement,
        storeTemplate,
        changeLaguage,
        changeTypeEdit,
        uploadResource,
        oneDataTemplate,
        handleCloseSave,
        templateToClone,
        setChangeLaguage,
        editItemResource,
        changeModeEditor,
        getTemplateClone,
        setTemplateToClone,
        searchValueElement,
        destroyOneResource,
        filteredDataElement,
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