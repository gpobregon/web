import {  CognitoUser } from 'amazon-cognito-identity-js';


const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v'
const getAuth = (): CognitoUser | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: CognitoUser = JSON.parse(lsValue) as CognitoUser
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: CognitoUser|any) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}



export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}
