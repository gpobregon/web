import axios from "axios"
import { Route } from "react-router-dom"


const URL = 'https://6335-45-229-130-255.ngrok.io/dev2'

export const sitesMethod = 'site'
export const categorysMethod = 'site/category'
export const statesMethod = 'site/state'

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

export const deleteData = async (route: string, id: number) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/${route}/delete`, {method: 'POST', mode: 'cors', body: JSON.stringify(id)})
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
        console.log(data)
      })
      .catch((err) => {
        resolve(null)
        console.log(err.message)
      })
  })
}
