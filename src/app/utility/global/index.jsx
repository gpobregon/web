/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import {Element} from './data'

export function updateData(allData, oneData) {
    let all = allData.map((u) => u && (u.id !== oneData.id ? u : oneData))
    const results = all.filter((element) => {
        return element !== undefined
    })
    return results
}

export function appendData(all, data) {
    return [data, ...all]
}

export const setDataList = (el) => {
    const L = el.firstChild.getElementsByTagName('li')
    let Array = []
    for (let i = 0; i < L.length; i++) {
        if (L[i].textContent !== 'Elemento 1' || L[i].textContent !== '') {
            Array.push({index: i, value: L[i].textContent})
        }
    }
    return Array
}

export const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }

    return new File([u8arr], filename, {type: mime})
}

export function interpretHTML(data) {
    return {
        __html: data && data,
    }
}

const BaseInut = {
    boxShadow: 'none',
    color: '#212121',
    padding: '2px 4px',
    backgroundColor: '#2b2b40',
}

const styleClassOption = (base) => ({
    ...base,

    '&:hover': {
        backgroundColor: '#12121B',
    },
    '&:visited': {
        backgroundColor: '#12121B',
    },
})

const styleClassInputDanger = (base) => ({
    ...base,
    ...BaseInut,
    color: '#F00 !important',
    border: '1px solid #F00',
})

const styleClassInput = (base) => ({
    ...base,
    ...BaseInut,
})

const styleClassMenu = (base) => ({
    ...base,
    background: '#2b2b40',
    zIndex: 100000000,
    display: 'block',
})

export const customStyles = {
    control: styleClassInput,
    menu: styleClassMenu,
    option: styleClassOption,
    singleValue: (base) => ({
        ...base,
        color: '#FFF',
    }),
}

export const customStylesDanger = {
    control: styleClassInputDanger,
    menu: styleClassMenu,
}

const textElement = ['title', 'paragraph', 'list']
const informationElement = ['curious-fact', 'regulation', 'schedule', 'calendar', 'event']
const MultimediaElement = ['image', 'video', 'audio', 'carousel', 'image-360']
const OthersElement = ['url', 'map']
const Hero = ['1-hero', '2-hero']
const Contenido = ['contenido1', 'contenido2']
const Galeria = ['galeria1', 'galeria2']
const Footer = ['footer1', 'footer2']
export const elementData = [
    ...textElement,
    ...informationElement,
    ...MultimediaElement,
    ...OthersElement,
]

export const validElement = (type) => {
    let Array = []
    if (textElement.includes(type)) {
        Array = Element[0].ElementosMovil[0].items
    } else if (informationElement.includes(type)) {
        Array = Element[0].ElementosMovil[1].items
    } else if (MultimediaElement.includes(type)) {
        Array = Element[0].ElementosMovil[2].items
    } else if (OthersElement.includes(type)) {
        Array = Element[0].ElementosMovil[3].items
    } else if (Hero.includes(type)) {
        Array = Element[0].ElementosWeb[0].items
    } else if (Contenido.includes(type)) {
        Array = Element[0].ElementosWeb[1].items
    } else if (Galeria.includes(type)) {
        Array = Element[0].ElementosWeb[2].items
    } else if (Footer.includes(type)) {
        Array = Element[0].ElementosWeb[3].items
    }
    return Array
}

export const generateRandomString = (num) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result1 = ''
    const charactersLength = characters.length
    for (let i = 0; i < num; i++) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result1
}

export function stripHtml(dirtyString) {
    const doc = new DOMParser().parseFromString(dirtyString, 'text/html')
    return doc.body.textContent || ''
}

export default {
    stripHtml,
    appendData,
    updateData,
    elementData,
    setDataList,
    validElement,
    customStyles,
    dataURLtoFile,
    interpretHTML,
    customStylesDanger,
    generateRandomString,
}
