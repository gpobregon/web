import axios from 'axios'
import {Route} from 'react-router-dom'

export const URLAWS='https://mcd-backoffice-upload.s3.us-east-2.amazonaws.com/'
const URL = 'https://aweehvu3y3.execute-api.us-east-1.amazonaws.com/dev2'

// const URL = 'https://d77c-190-104-119-60.ngrok.io/dev2'

export const sitesMethod = 'site'
export const statesMethod = 'site/state'
export const updateSiteMethod = 'site/update'

export const categorysMethod = 'site/categories'
export const addCategoryMethod = 'site/categories/add'
export const updateCategoryMethod = 'site/categories/update'

export const languagesMethod = 'language'
export const addLanguageMethod = 'language/add'
export const updateLanguageMethod = 'language/update'

export const notificationMethod = 'notifications'
export const addNotificationMethod = 'notification/add'
export const updateNotificationMethod = 'notification/update'
export const deleteNotificationMethod = 'notification'

export const RoomsMethod = sitesMethod + '/rooms'
export const addRoom = RoomsMethod + '/add'
export const editRoom = RoomsMethod+'/update'
export const addNewPointInteres = RoomsMethod + '/points/add'
export const updatePointInteres = RoomsMethod + '/points/update'
export const delPointInteres = RoomsMethod + '/points'
export const statePointInteres = RoomsMethod + '/points/visibility'
export const changePointOfInterestFront =RoomsMethod+'/points/changePointOfInterestFront'
export const OrderPointOfInterest =RoomsMethod+'/points/changeorder'
export const statePointInteresPublished = RoomsMethod + '/points/changepublishedpointofinterest'

export const getRoutefInterest = RoomsMethod + '/points/getpointswithroute'
export const addRoute = RoomsMethod +'/points/route/add'
export const ObtenerRuta = RoomsMethod + '/points/route'
export const addPasos = ObtenerRuta+'/steps'
export const addImagePrincipal=ObtenerRuta+'/principalimage'
export const addImages=ObtenerRuta+'/images'
export const deleteRuta=ObtenerRuta+'/delete' 


export const getRolesMethod = 'user/rol' 
export const addRolesMethod = 'user/rol/add' 
export const editRoleMethod = 'user/rol/edit' 
export const deleteRoleMethod = 'user/rol'

export const getUsers = 'user'
export const addUser = 'user/add' 


export const getData = async (route: string) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${route}/`, {method: 'GET', mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                resolve(null)
                console.log(err.message)
            })
    })
}

export const deleteData = async (route: string, object: any) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${route}/delete`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(object),
        })
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                resolve(null)
                console.log(err.message)
            })
    })
}

export const postData = async (route: string, object: any) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${route}`, {method: 'POST', mode: 'cors', body: JSON.stringify(object)})
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                resolve(null)
                console.log(err.message)
            })
    })
}

export const getValue = async (route: string, id: number) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${route}/${id}`, {method: 'GET', mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                resolve(null)
                console.log(err.message)
            })
    })
}