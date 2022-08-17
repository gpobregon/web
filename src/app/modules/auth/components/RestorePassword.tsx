import React, {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {requestPassword} from '../core/_requests' 
import { Form, Button } from 'react-bootstrap'; 

export  function RestorePassword (){ 
    return( 
        <h1>Estamos en restore</h1>
    )
}