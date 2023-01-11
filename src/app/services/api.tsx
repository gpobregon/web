import swal from 'sweetalert'
export const URLAWS = 'https://mcd-archivos.s3.amazonaws.com/'
const URL = 'https://aweehvu3y3.execute-api.us-east-1.amazonaws.com/dev2'
// const URL='https://ezah7sxfbh.execute-api.us-east-1.amazonaws.com/qa'
// const URL = 'https://57de-190-148-50-142.ngrok.io/dev2'

export const sitesMethod = 'site'
export const statesMethod = 'site/state'
export const updateSiteMethod = 'site/update'

export const categorysMethod = 'site/categories'
export const lengthTagsMethod = 'site/categories/count'
export const addCategoryMethod = 'site/categories/add'
export const updateCategoryMethod = 'site/categories/update'

export const languagesMethod = 'language'
export const addLanguageMethod = 'language/add'
export const updateLanguageMethod = 'language/update'

export const notificationMethod = 'notifications'
export const addNotificationMethod = 'notification/add'
export const updateNotificationMethod = 'notification/update'
export const deleteNotificationMethod = 'notification'
export const getTotalNotifications = 'notifications/getcount'
export const getSitesActivesAndPublicatedMethod = 'site/sites/activesandpublicated'

export const RoomsMethod = sitesMethod + '/rooms'
export const addRoom = RoomsMethod + '/add'
export const editRoom = RoomsMethod + '/update'
export const addNewPointInteres = RoomsMethod + '/points/add'
export const updatePointInteres = RoomsMethod + '/points/update'
export const delPointInteres = RoomsMethod + '/points'
export const statePointInteres = RoomsMethod + '/points/visibility'
export const changePointOfInterestFront = RoomsMethod + '/points/changePointOfInterestFront'
export const OrderPointOfInterest = RoomsMethod + '/points/changeorder'
export const statePointInteresPublished = RoomsMethod + '/points/changepublishedpointofinterest'
export const getPuntoInteres = '/site/rooms/points/get'

export const getRoutefInterest = RoomsMethod + '/points/getpointswithroute'
export const addRoute = RoomsMethod + '/points/route/add'
export const ObtenerRuta = RoomsMethod + '/points/route'
export const addPasos = ObtenerRuta + '/steps'
export const addImagePrincipal = ObtenerRuta + '/principalimage'
export const addImages = ObtenerRuta + '/images'
export const deleteRuta = ObtenerRuta + '/delete'

export const getRolesMethod = 'user/rol'
export const addRolesMethod = 'user/rol/add'
export const editRoleMethod = 'user/rol/edit'
export const deleteRoleMethod = 'user/rol'

export const getUsersMethod = 'user'
export const addUserMethod = 'user/add'
export const updateUserMethod = 'user/edit'
export const deleteUserMethod = 'user'

export const publishPI = 'site/publish/solo/point'
export const publishSite = 'site/publish/solo/site'

export const getDataReport = 'site/sites/reporte'
export const getSitiosPublicados = '/sitios/dynamo/publicado'

export const getData = async (route: string) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${route}/`, {method: 'GET', mode: 'cors'})
            .then((response) => response.json())
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                resolve(null)
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
            })
    })
}

export const postData = async (route: string, object: any) => {
    return new Promise((resolve, reject) => {
        fetch(`${URL}/${route}`, {method: 'POST', mode: 'cors', body: JSON.stringify(object)})
            .then((response) => {
                //Si la respuesta es diferente de 200, entonces lanza un error
                if (!response.ok) throw Error('Ocurrió un error')
                return response.json()
            })
            .then((data) => {
                resolve(data)
            })
            .catch((err) => {
                resolve(null)
                swal({
                    title: 'Error',
                    text: err.message,
                    icon: 'error',
                    timer: 2000,
                })
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
            })
    })
}
