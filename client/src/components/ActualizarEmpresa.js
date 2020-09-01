import React, { useContext, useEffect } from 'react';
import empresaContext from '../context/empresa/empresaContext';
import alertaContext from '../context/alerta/alertaContext';
import TablaEmpresa from './TablaEmpresa';
import Swal from 'sweetalert2';

const ActualizarEmpresa = () => {

    const EmpresaContext = useContext(empresaContext);
    const { mostrarEmpresas, empresas, updateEmpresa, updateImage, deleteCompania } = EmpresaContext;

    const AlertaContext = useContext(alertaContext);
    const {alerta, mostrarAlerta} = AlertaContext;

    useEffect(() => {
        mostrarEmpresas();
    }, []);

    const ActualizarEmpresa = async(id, objEmpresa) => {
        
        const actualizar = await updateEmpresa(id, objEmpresa);

        mostrarEmpresas();

        if(!actualizar){
            mostrarAlerta('Error al actualizar la empresa', 'alert-danger');
            return;
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha actualizado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            mostrarAlerta('La empresa se actualizo correctamenta', 'alert-success');
            return;
        }
    }

    const ActualizaIMG = async(id, selectImg) => {

        const actualizar = await updateImage(id, selectImg);

        mostrarEmpresas();

        if(!actualizar){
            mostrarAlerta('Error al actualizar la empresa', 'alert-danger');
            return;
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se ha actualizado exitosamente',
                showConfirmButton: false,
                timer: 1500
            });
            mostrarAlerta('La empresa se actualizo correctamenta', 'alert-success');
            return;
        }
    }

    const deleteEmpresa = async(id) =>{

        const eliminar = await deleteCompania(id);

        mostrarEmpresas();

        if(!eliminar){
            mostrarAlerta('Error al eliminar la empresa', 'alert-danger');
            return;
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'La empresa se eliminó correctamenta',
                showConfirmButton: false,
                timer: 1500
            });
            mostrarAlerta('La empresa se eliminó correctamenta', 'alert-success');
            return;
        }
    }

    return (  
        <>
        { alerta ? ( <div className={`alert ${alerta.categoria}`} role="alert"> {alerta.msg} </div> )  : null }
        <h1 className="mt-3 mb-4 text-center">Empresas</h1>
        <div className="card justify-content-center">
            <div className="card-body">
                <div className="row justify-content-center">
                    <table class="table">
                        <thead class="thead-dark">
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">URL</th>
                            <th scope="col">Fecha</th>
                            <th scope="col">Acciones</th>
                        </thead>
                        <tbody>
                        {empresas  && empresas.map((empresa,index) =>(

                            <TablaEmpresa 
                                key={empresa._id} 
                                empresa={empresa}
                                index={index}
                                ActualizarEmpresa={ActualizarEmpresa}
                                ActualizaIMG={ActualizaIMG}
                                deleteEmpresa={deleteEmpresa}
                            />
                        ))}  

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default ActualizarEmpresa;