import React, {useReducer} from 'react';
import empresaContext from './empresaContext';
import empresaReducer from './empresaReducer';
import clienteAxios from '../../config/axios';
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

const EmpresaState = ({children}) => {

    // Definir un state inicial
    const initialState = {
        empresas: null,
        crear_empresa: null,
        mensaje_empresa: null,
        cargando: null,
        crear_archivo: null,
        eliminar_empresa: null
    }

    // Definir el reducer
    const [ state, dispatch ] = useReducer(empresaReducer, initialState);

    const mostrarEmpresas = async () =>{
        try {
            const respuesta = await clienteAxios.get('/api/empresas');
            dispatch({
                type: MOSTRAR_EMPRESAS,
                payload: respuesta.data.empresa
            });
        } catch (error) {
            console.log(error);
        }
    }

    const subirEmpresa = async (selectedFile,objetoEmpresa) =>{
        
        var success = true;
        var formData = new FormData();
        formData.append('archivo', selectedFile);

        dispatch({
            type: CREANDO_EMPRESA
        });

        try {
            const imagen = await clienteAxios.post('/api/archivos', formData);

            if(imagen.data.archivo){
                
                objetoEmpresa.nombre_imagen = imagen.data.archivo;

               await clienteAxios.post('api/empresas', objetoEmpresa);  
            }

            dispatch({
                type: CREAR_EMPRESA_EXITO
            });

            success = true;

        } catch (error) {
           
            success = false;

            const alerta = {
                msg: 'error al crear la empresa',
                categoria: 'alerta-error'
            }

            dispatch({
                type: CREAR_EMPRESA_ERROR,
                payload: alerta
            });
        }

        return success;
    }

    const updateEmpresa = async (id, objEmpresa) =>{

        var success = true;
        dispatch({
            type: ACTUALIZANDO_EMPRESA
        });

        try {
            
            await clienteAxios.put(`api/empresas/${id}`, objEmpresa);

            dispatch({
                type: ACTUALIZAR_EMPRESA_EXITO
            });

            success = true;

        } catch (error) {
            success = false;
            const alerta = {
                msg: 'error al actualizar la empresa',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ACTUALIZAR_EMPRESA_ERROR,
                payload: alerta
            });
        }

        return success;
    }

    const updateImage = async (id, selectedFile) => {
        var success = true;

        var formData = new FormData();
        formData.append('archivo', selectedFile);

        dispatch({
            type: SUBIR_ARCHIVO
        });

        try {
            await clienteAxios.put(`/api/archivos/${id}`, formData);

            dispatch({
                type: SUBIR_ARCHIVO_EXITO
            });
             
        } catch (error) {
            success = false;
            const alerta = {
                msg: 'error al actualizar la imagen',
                categoria: 'alerta-error'
            }

            dispatch({
                type: SUBIR_ARCHIVO_ERROR,
                payload: alerta
            });
        }

        return success;
    }

    const deleteCompania = async(id) =>{

        var success = true;
        dispatch({
            type: ELIMINANDO_EMPRESA
        });

        try {
            await clienteAxios.delete(`/api/empresas/${id}`);

            dispatch({
                type: ELIMINAR_EMPRESA_EXITO
            });

        } catch (error) {
            success = false;
            const alerta = {
                msg: 'error al eliminar la empresa',
                categoria: 'alerta-error'
            }

            dispatch({
                type: ELIMINAR_EMPRESA_ERROR,
                payload: alerta
            });
        }

        return success;
    }

    return(
        <empresaContext.Provider
            value={{
                empresas: state.empresas,
                mostrarEmpresas,
                subirEmpresa,
                updateEmpresa,
                updateImage,
                deleteCompania  
            }}
        >
             {children}
        </empresaContext.Provider>
    )
}

export default EmpresaState;