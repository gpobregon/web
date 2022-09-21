
import swal from "sweetalert";
// VALIDAR CADENA CON CARACTERES SIN ESPECIALES ------------------------------------------------
export const validateStringSinCaracteresEspeciales = (cadena: string) => {
    var patron = /^$|^[a-zA-Z\u00C0-\u017F| '` 0-9.,\- *]+$/;
    if (cadena.search(patron)) {
        swal("Error", "No se permiten caracteres especiales", "error");
      return false;
    } 
    return true;
  }

  // VALIDAR CADENA SOLO NUMEROS------------------------------------------------
export const validateStringSoloNumeros = (cadena: string) => {
    var patron = /^$|^[0-9.*]+$/;
    if (cadena.search(patron)) {
        swal("Error", "solo se permiten Numeros", "error");
      return false;
    } 
    return true;
  }