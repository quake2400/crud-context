import {
MOSTRAR_EMPRESAS,
CREANDO_EMPRESA,
CREAR_EMPRESA_EXITO,
CREAR_EMPRESA_ERROR,
ACTUALIZANDO_EMPRESA,
ACTUALIZAR_EMPRESA_EXITO,
ACTUALIZAR_EMPRESA_ERROR,
SUBIR_ARCHIVO,
SUBIR_ARCHIVO_EXITO,
SUBIR_ARCHIVO_ERROR,
ELIMINANDO_EMPRESA,
ELIMINAR_EMPRESA_EXITO,
ELIMINAR_EMPRESA_ERROR
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        case MOSTRAR_EMPRESAS:
            return {
                ...state,
                empresas: action.payload
            }
        case CREANDO_EMPRESA:
        case ACTUALIZANDO_EMPRESA:
        case SUBIR_ARCHIVO:
        case ELIMINANDO_EMPRESA:
            return {
                ...state,
                cargando: true
            }
        case CREAR_EMPRESA_EXITO:
            return{
                ...state,
                crear_empresa:true,
                cargando: false
            }
        case CREAR_EMPRESA_ERROR:
            return{
                ...state,
                crear_empresa:false,
                cargando: false
            }
        case ACTUALIZAR_EMPRESA_EXITO:
            return{
                ...state,
                actualizar_empresa: true,
                cargando: false
            }
        case ACTUALIZAR_EMPRESA_ERROR: 
            return{
                ...state,
                actualizar_empresa: false,
                cargando: false
            }
        case SUBIR_ARCHIVO_EXITO:
            return{
                ...state,
                crear_archivo:false,
                cargando: false
            }
        case SUBIR_ARCHIVO_ERROR: 
            return{
                ...state,
                crear_archivo: false,
                cargando: false
            }
        case ELIMINAR_EMPRESA_EXITO:
            return{
                ...state,
                eliminar_empresa:false,
                cargando: false
            }
        case ELIMINAR_EMPRESA_ERROR: 
            return{
                ...state,
                eliminar_empresa: false,
                eliminar_empresa: false
            }
        default:
            return state
    }
}