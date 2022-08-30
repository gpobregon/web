/* eslint-disable array-callback-return */
/* eslint-disable import/no-anonymous-default-export */
import { Texts, Information, Multimedia, Others } from './data'

export function updateData (allData, oneData) {
    let all = allData.map(u => u.index !== oneData.index ? u : oneData);
    return all
}

export const setDataList = (el) => {
    const L = el.firstChild.getElementsByTagName('li')
    console.log('entra')
    let Array = []
    for (let i = 0; i < L.length; i++) {
        if (L[i].textContent !== 'Elemento 1' || L[i].textContent) {
            Array.push( { index: i, value : L[i].textContent } );
        }
        
    }
    return Array
}

const textElement = ["title", "paragraph", "list"]
const informationElement = ["curious-fact", "regulation", "schedule", "calendar", "event"]
const MultimediaElement = ["image", "video", "audio", "carousel", "image-360"]
const OthersElement = ["url", "document", "transportation", "map", "climate", "ticket"]

export const validElement = (type) => {
    let Array = []
    if (textElement.includes(type)) {
        Array = Texts;
    } else if (informationElement.includes(type)) {
        Array = Information;
    }
    else if (MultimediaElement.includes(type)) {
        Array = Multimedia;
    }
    else if (OthersElement.includes(type)) {
        Array = Others;
    }
    return Array
  }


export const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

export function stripHtml(dirtyString) {
    const doc = new DOMParser().parseFromString(dirtyString, 'text/html');
    return doc.body.textContent || '';
  }

export default { 
    stripHtml,
    updateData,
    setDataList,
    validElement,
    generateRandomString
}