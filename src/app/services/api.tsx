import axios from "axios"
import { Route } from "react-router-dom"


const URL = 'https://72ad-190-104-119-60.ngrok.io/dev2'

export const sitesMethod = 'site'
export const categorysMethod = 'site/categories'
export const statesMethod = 'site/state'
export const updateSiteMethod = 'site/update'
export const RoomsMethod = 'site/rooms'
export const addRoom = 'site/rooms/add'

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

export const deleteData = async (route: string, object:any) => {
  
  return new Promise((resolve, reject) => {
    fetch(`${URL}/${route}/delete`, {method: 'POST', mode: 'cors', body: JSON.stringify(object)})
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
