import swal from 'sweetalert'
// VALIDAR CADENA CON CARACTERES SIN ESPECIALES ------------------------------------------------
export const validateStringSinCaracteresEspeciales = (cadena: string) => {
    var patron = /^$|^[a-zA-Z\u00C0-\u017F| \" \° \r \n '`´¨ 0-9.,\- *]+$/
    if (cadena.search(patron)) {
        swal('Error', 'No se permiten caracteres especiales', 'error')
        return false
    }
    return true
}

export const validateStringNombre = (cadena: string) => {
    var patron = /^$|^[a-zA-Z\u00C0-\u017F|  '`´¨]+$/
    if (cadena.search(patron)) {
        swal('Error', 'No se permiten caracteres especiales', 'error')
        return false
    }
    return true
}

// VALIDAR CADENA CORREO ------------------------------------------------
export const validateStringEmail = (cadena: string) => {
    var patron =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (cadena.search(patron)) {
        // swal('Error', 'No se permiten caracteres especiales', 'error')
        return false
    }
    return true
}

export const validateStringEmailAlert = (cadena: string) => {
    var patron =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (cadena.search(patron)) {
        swal('Error', 'No es un correo válido', 'error')
        return false
    }
    return true
}

// VALIDAR CADENA CONTRASEÑA ------------------------------------------------
export const validateStringPassword = (cadena: string) => {
    var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡!¿?@#$%^&*=+/\\|()\-\_`´~<>,.:;'"\[\]\{\} ])[A-Za-z\d¡!¿?@#$%^&*=+/\\|()\-\_`´~<>,.:;'"\[\]\{\} ]{8,}$/g
    if (cadena.search(patron)) {
        // swal('Error', 'No se permiten caracteres especiales', 'error')
        return false
    }
    return true
}

export const validateStringPasswordAlert = (cadena: string) => {
    var patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡!¿?@#$%^&*=+/\\|()\-\_`´~<>,.:;'"\[\]\{\} ])[A-Za-z\d¡!¿?@#$%^&*=+/\\|()\-\_`´~<>,.:;'"\[\]\{\} ]{8,}$/g
    if (cadena.search(patron)) {
        swal(
            'Error',
            'No es una contraseña válida, recuerda escribir una contraseña que incluya un signo especial, una letra minúscula, una letra mayúscula y un mínimo de 8 caracteres en total',
            'error'
        )
        return false
    }
    return true
}

// VALIDAR CADENA SOLO NUMEROS------------------------------------------------
export const validateStringSoloNumeros = (cadena: string) => {
    var patron = /^$|^\-?[0-9.*]+$/
    if (cadena.search(patron)) {
        swal('Error', 'Solo se permiten Numeros', 'error')
        return false
    }
    return true
}

export const validateStringCode = (cadena: string) => {
    var patron = /^(\d{6})$/
    if (cadena.search(patron)) {
        return false
    }
    return true
}

export const validateStringPhoneNumber = (cadena: string) => {
    var patron = /^(\d{8})$/
    if (cadena.search(patron)) {
        return false
    }
    return true
}

export const validateStringPhoneNumberAlert = (cadena: string) => {
    var patron = /^(\d{8})$/
    if (cadena.search(patron)) {
        swal('Error', 'No es un número de teléfono válido', 'error')
        return false
    }
    return true
}
